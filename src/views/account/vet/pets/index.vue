<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1>{{ $t("Pets") }}</h1>
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
          <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
          <!--
            <market-image-list-item
              :key="item.id"
              :data="item"
              v-contextmenu:contextmenu
            />-->

            <dossier-thumb-list-item @refresh="loadItems" :key="item.id" :data="item" v-contextmenu:contextmenu />
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

import MarketImageListItem from "@/components/Listing/MarketImageListItem";
import DossierThumbListItem from "@/components/Listing/DossierThumbListItem";


import Datepicker from 'vuejs-datepicker';
import { mapGetters } from "vuex";

export default {
  components: {
    Datepicker,
    "image-list-icon": ImageListIcon,
    "v-select": vSelect,
    "market-image-list-item": MarketImageListItem,
    "dossier-thumb-list-item": DossierThumbListItem
  },
  data() {
    return {
      file1: null,
      isLoad: false,
      apiUrl: process.env.VUE_APP_API_URL,
      displayMode: "image",
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
      this.$Axios.get('/dossiers')
       .then(res => {
         console.log('requests')
         console.log(res.data)
         res.data.forEach(offer => {
           let newOffer = {
              id: offer._id,
              image: this.apiUrl + '/' + offer.pet.photo,
              ownerName: offer.pet.owner.name + ' ' + offer.pet.owner.surname,
              adress: offer.pet.owner.adress,
              name: offer.pet.name,
              breed: offer.pet.breed,
              petType: offer.pet.type,
              birthday: offer.pet.birthday,
              gender: offer.pet.sex,
              createdAt: offer.createdAt,
              petId: offer.pet._id,
              status: offer.status,
           }
           this.items.push(newOffer)
         })
       })
       .catch(e => {
         console.log(e)
       })
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

      let formData = new FormData()
        formData.append('name', this.newPet.name)
        formData.append('photo', this.newPet.image)
        formData.append('breed', this.newPet.breed)
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
