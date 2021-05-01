<template>
  <div>
      <b-row class="m-2" align-h="between">
          <b-col cols="1">
                <router-link :to="'/owner/pet/'+$route.params.id+'/all'"
          ><b-button size="sm"
            ><i class="iconsminds-left"/></b-button></router-link
        >
          </b-col>
          <b-col cols="4" >
            <b-button v-if="selected" class="float-right" v-b-modal.modalEditFood variant="secondary" size="sm">Edit Food</b-button>
                        <b-modal
                        v-if="selected"
              id="modalEditFood"
              ref="modalEditFood"
              :title="$t('Edit Food')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('Name')">
                  <b-form-input v-model="selected.name" />
                </b-form-group>
                <b-form-group :label="$t('Quantity')">
                  <b-form-input v-model="selected.quantity" />
                </b-form-group>
                <b-form-group :label="$t('Date')">
                  <datetime format="YYYY-MM-DD H:i:s" width="300px" v-model="selected.date"></datetime>
                </b-form-group>
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalEditFood')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="updateFood()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>

            <b-button class="float-right" v-b-modal.modalFood variant="primary" size="sm">Add Food</b-button>
            <b-modal
              id="modalFood"
              ref="modalFood"
              :title="$t('Add Food')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('Name')">
                  <b-form-input v-model="newFood.name" />
                </b-form-group>
                <b-form-group :label="$t('Quantity')">
                  <b-form-input v-model="newFood.quantity" />
                </b-form-group>
                <b-form-group :label="$t('Date')">
                  <datetime format="YYYY-MM-DD H:i:s" width="300px" v-model="newFood.date"></datetime>
                </b-form-group>
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalFood')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="addNewFood()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>
          </b-col>
      </b-row>
    <b-card>
      <b-card-header class="mb-1 font-weight-bold text-primary">
        <h3>{{ $t("Foods") }}</h3>
      </b-card-header>
      <b-table
        ref="custom-table"
        class="vuetable"
        sort-by="title"
        sort-desc.sync="false"
        @row-selected="onRowSelected"
        selectable
        :select-mode="bootstrapTable.selectMode"
        :current-page="currentPage"
        selectedVariant="primary"
        :fields="bootstrapTable.fields"
        :items="foodsList"
      >
        <template #cell(action)="food">
          <b-button @click="confirmFood(food.item._id)" v-if="!food.item.done" variant="success" size="sm">
            Confirmer
          </b-button>
          <b-button @click="deleteFood(food.item._id)"  variant="danger" size="sm">
            Delete
          </b-button>
        </template>
      </b-table>
      <b-pagination
        size="sm"
        align="center"
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
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
      </b-pagination>
    </b-card>
  </div>
</template>
<script>
import VuetablePaginationBootstrap from "@/components/Common/VuetablePaginationBootstrap";
import datetime from 'vuejs-datetimepicker';

export default {
  components: {
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    datetime,
  },
  data() {
    return {
      newFood: {
        name: null,
        vet: null,
        date: null,
        desc: null,
      },
      foodsList: [],
      petId: this.$route.params.id,
      selected: null,
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      bootstrapTable: {
        selected: [],
        selectMode: "single",
        fields: [
          {
            key: "name",
            label: "Name",
            sortable: true,
            sortDirection: "desc",
            tdClass: "list-item-heading"
          },
          {
            key: "quantity",
            label: "Quantity",
            sortable: true,
            tdClass: "text-muted"
          },
          {
            key: "date",
            label: "Date/Time",
            sortable: true,
            tdClass: "text-muted"
          },
          { key: "action", label: "Action", tdClass: "text-muted" }
        ]
      }
    };
  },
  mounted(){
     this.getFoods()
  },
  methods: {
      hideModal(refname) {
      this.$refs[refname].hide();
    },
    onRowSelected(items) {
        this.selected = items[0]
      },
    addNewFood() {
      this.$Axios.post('/pet/'+this.petId+'/food',this.newFood)
      .then(res => {
        this.newFood = {}
        this.getFoods()
        this.hideModal('modalFood')
        this.$notify("success", "Food", "Food added", {
          duration: 3000,
          permanent: false
        });
      })
      .catch(e => {
        console.log(e)
      })
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    getFoods(){
      this.$Axios.get('/pet/'+this.petId+'/food')
      .then(res => {
        this.foodsList= []
        console.log(res.data)
        res.data.forEach(food => {
          this.foodsList.push(food)
        })
      })
      .catch(e => {
        console.log(e)
      })
    },
    confirmFood(id){
      this.$Axios.put('/pet/'+this.petId+'/food/' + id,{done: true})
        .then(res => {
          this.getFoods()
          this.$notify("success", "Vaccine", "Vaccine confimed", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
    updateFood(){
      this.$Axios.put('/pet/'+this.petId+'/food/' + this.selected._id,this.selected)
        .then(res => {
          this.getFoods()
          
          this.hideModal('modalEditFood')
          this.$notify("success", "Food", "Food updated", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
    deleteFood(id){
       this.$Axios.delete('/pet/'+this.petId+'/food/' + id)
        .then(res => {
          this.getFoods()
          this.$notify("success", "Food", "Food deleted", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
  }
};
</script>
