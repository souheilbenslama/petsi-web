<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1>{{ $t("menu.pets") }}</h1>
          <div class="top-right-button-container">
            <b-button
              v-b-modal.modalright
              variant="primary"
              size="lg"
              class="top-right-button"
              >{{ $t("Add new pet") }}</b-button
            >
            <b-modal
              id="modalright"
              ref="modalright"
              :title="$t('Add new Pet')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('image')">
                <b-form-file
                   accept="image/jpeg, image/png, image/gif"
                  v-model="newPet.image"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                </b-form-group>
                <b-form-group :label="$t('name')">
                  <b-form-input v-model="newPet.name" />
                </b-form-group>
                <b-form-group :label="$t('breed')">
                  <b-form-input v-model="newPet.breed" />
                </b-form-group>
                <b-form-group :label="$t('type')" class="has-float-label mb-4">
                  <b-form-select
                    v-model="newPet.type"
                    :options="types"
                  ></b-form-select>
                </b-form-group>
                <b-form-group :label="$t('birthday')">
                  <b-form-datepicker
                    id="minDate"
                    v-model="newPet.birthday"
                    size="lg"
                    today-button
                    close-button
                    start-weekday="1"
                    value-as-date
                    locale="en-GB"
                  />
                </b-form-group>
                <b-form-group :label="$t('Weight')">
                  <b-form-input v-model="newPet.weight" />
                </b-form-group>
                <b-form-group :label="$t('Gender')">
                  <b-form-radio-group
                    stacked
                    class="pt-2"
                    :options="statuses"
                    v-model="newPet.gender"
                  />
                </b-form-group>
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalright')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="addNewPet()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>
          </div>
          <piaf-breadcrumb />
          <div class="mb-2 mt-2">
            <b-button
              variant="empty"
              class="pt-0 pl-0 d-inline-block d-md-none"
              v-b-toggle.displayOptions
            >
              {{ $t("pages.display-options") }}
              <i class="simple-icon-arrow-down align-middle" />
            </b-button>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <b-dropdown
                  id="ddown1"
                  :text="`${$t('pages.orderby')} ${sort.label}`"
                  variant="outline-dark"
                  class="mr-1 float-md-left btn-group "
                  size="xs"
                >
                  <b-dropdown-item
                    v-for="(order, index) in sortOptions"
                    :key="index"
                    @click="changeOrderBy(order)"
                    >{{ order.label }}</b-dropdown-item
                  >
                </b-dropdown>

                <div
                  class="search-sm d-inline-block float-md-left mr-1 align-top"
                >
                  <b-input :placeholder="$t('menu.search')" v-model="search" />
                </div>
              </div>
              <div class="float-md-right pt-1">
                <span class="text-muted text-small mr-1 mb-2"
                  >{{ from }}-{{ to }} of {{ total }}</span
                >
                <b-dropdown
                  id="ddown2"
                  right
                  :text="`${perPage}`"
                  variant="outline-dark"
                  class="d-inline-block"
                  size="xs"
                >
                  <b-dropdown-item
                    v-for="(size, index) in pageSizes"
                    :key="index"
                    @click="changePageSize(size)"
                    >{{ size }}</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </b-collapse>
          </div>
          <div class="separator mb-5" />
        </b-colxx>
      </b-row>
      <template v-if="isLoad">
        <b-row v-if="displayMode === 'image'" key="image">
          <b-colxx
            sm="6"
            lg="4"
            xl="3"
            class="mb-5"
            v-for="(item, index) in filtredItems"
            :key="index"
            :id="item.id"
          >
            <image-list-item
              :key="item.id"
              :data="item"
              v-contextmenu:contextmenu
            />
          </b-colxx>
        </b-row>
        <b-row v-if="lastPage > 1">
          <b-colxx xxs="12">
            <b-pagination-nav
              :number-of-pages="lastPage"
              :link-gen="linkGen"
              v-model="page"
              :per-page="perPage"
              align="center"
            >
              <template v-slot:next-text>
                <i class="simple-icon-arrow-right" />
              </template>
              <template v-slot:prev-text>
                <i class="simple-icon-arrow-left" />
              </template>
              <template v-slot:first-text>
                <i class="simple-icon-control-start" />
              </template>
              <template v-slot:last-text>
                <i class="simple-icon-control-end" />
              </template>
            </b-pagination-nav>
          </b-colxx>
        </b-row>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import {
  ImageListIcon
} from "@/components/Svg";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import axios from "axios";

import ImageListItem from "@/components/Listing/ImageListItem";


import Datepicker from 'vuejs-datepicker';
import { mapGetters } from "vuex";

export default {
  components: {
    Datepicker,
    "image-list-icon": ImageListIcon,
    "v-select": vSelect,
    "image-list-item": ImageListItem
  },
  data() {
    return {
      file1: null,
      isLoad: false,
      apiUrl: process.env.VUE_APP_API_URL,
      displayMode: "image",
      types: [
        { value: "dog", text: "Dog" },
        { value: "cat", text: "Cat" },
        { value: "horse", text: "Horse" },
        { value: "rabbit", text: "Rabbit" },
        { value: "sheep", text: "Sheep" },
        { value: "parrot", text: "Parrot" },
        { value: "goat", text: "Goat"},
      ],
      sort: {
        column: "name",
        label: "Name"
      },
      sortOptions: [
        {
          column: "name",
          label: "Name"
        },
        {
          column: "birthday",
          label: "Birthday"
        },
        {
          column: "breed",
          label: "Breed"
        }
      ],
      page: 1,
      perPage: 4,
      search: "",
      from: 1,
      to: 3,
      total: 4,
      lastPage: 0,
      items: [],
      pageSizes: [4, 8, 12],
      selectedItems: [],
      categories: [
        {
          label: "Cakes",
          value: "Cakes"
        },
        {
          label: "Cupcakes",
          value: "Cupcakes"
        },
        {
          label: "Desserts",
          value: "Desserts"
        }
      ],
      statuses: [
        {
          text: "Male",
          value: "Male"
        },
        {
          text: "Female",
          value: "Female"
        }
      ],
      newPet: {
        image: null,
        name: null,
        breed: null,
        type: null,
        birthday: null,
        weight: null,
        gender: null,
      }
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;

      this.total = this.items.length;
      this.isLoad = true;
 
      this.items = []
      this.$Axios.get('/myPets')
       .then(res => {
         res.data.forEach(pet => {
           let newPet = {
              id: pet._id,
              image: this.apiUrl + '/' + pet.photo,
              name: pet.name,
              breed: pet.breed,
              birthday: pet.birthday,
              weight: pet.weight + ' Kg',
              gender: pet.sex,
           }
           console.log(`Pet ${newPet}`)
           this.items.push(newPet)
         })
       })
       .catch(e => {
         console.log(e)
       })


      /*axios
        .get(this.apiUrl)
        .then(response => {
            console.log(response.data)
          return response.data;
        })
        .then(res => {
            console.log(res)
          this.total = res.total;
          this.from = res.from;
          this.to = res.to;
          this.items = res.data;
          this.perPage = res.per_page;
          this.selectedItems = [];
          this.lastPage = res.last_page;
          this.isLoad = true;
        });*/
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    changePageSize(perPage) {
      this.perPage = perPage;
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    addNewPet() {
      if(!this.newPet.name || !this.newPet.breed ||!this.newPet.birthday || !this.newPet.gender || !this.newPet.weight) {
            this.$notify("error", "Add Pet", "Fill all fields", {
                        duration: 3000,
                        permanent: false
                        });
            return
      }

      if(this.newPet.birthday > Date.now()) {
            this.$notify("error", "Add Pet", "Date is invalid", {
                        duration: 3000,
                        permanent: false
                        });
            return
      }

      let formData = new FormData()
        formData.append('name', this.newPet.name)
        formData.append('photo', this.newPet.image)
        formData.append('breed', this.newPet.breed)
        formData.append('type', this.newPet.type)
        formData.append('birthday', this.newPet.birthday)
        formData.append('sex', this.newPet.gender)
        formData.append('weight', this.newPet.weight)
        formData.append('owner', this.currentUser._id)

        console.log("adding item : ", formData);

        this.$Axios({
          method: 'post',
          url: '/addPet',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      .then((res) => {
          console.log(res.data)
          this.newPet= {
        image: null,
        name: null,
        breed: null,
        type: null,
        birthday: null,
        weight: null,
        gender: null,
      }
          this.loadItems();
      })
      .catch(e => {
          console.log(e)
      })
    },
    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) {
          this.selectedItems = [];
        }
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    handleContextmenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextCopy() {
      console.log(
        "context menu item clicked - Copy Items: ",
        this.selectedItems
      );
    },
    onContextArchive() {
      console.log(
        "context menu item clicked - Move to Archive Items: ",
        this.selectedItems
      );
    },
    onContextDelete() {
      console.log(
        "context menu item clicked - Delete Items: ",
        this.selectedItems
      );
    },
    linkGen(pageNum) {
      return "#page-" + pageNum;
    }
  },
  computed: {
    ...mapGetters(["currentUser", "processing", "loginError"]),
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
    filtredItems() {
      let Items = this.items
      
      if(this.search){
          Items = Items.filter(pet => pet.name.includes(this.search))
      }
      
      let col = this.sort.column
      Items = Items.sort(function(a,b) {
        if(a[col] < b[col]) { return -1; }
        if(a[col] > b[col]) { return 1; }
        return 0;
      })
      return Items
    }
  },
  mounted() {
    this.loadItems();
  }
};
</script>
