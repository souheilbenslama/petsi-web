<template>
  <div>
      <b-row class="m-2" align-h="between">
          <b-col cols="1">
                <router-link :to="'/owner/pet/'+$route.params.id+'/all'"
          ><b-button size="sm"
            ><i class="iconsminds-left"/></b-button></router-link
        >
          </b-col>
      </b-row>
    <b-card>
      <b-card-header class="mb-1 font-weight-bold text-primary">
        <h3>{{ $t("Offer") }}</h3>
      </b-card-header>
      <hr>
         <dl class="row" v-if="offer">
            <dt  class="col-md-3 text-primary">Action :</dt>
            <dd  class="col-md-9">
            {{getStatus(offer.type)  }}
            </dd>

            <dt  v-if="offer.type == 's'" class="col-md-3 text-primary">Price :</dt>
            <dd  v-if="offer.type == 's'" class="col-md-9">
            {{ offer.price }}
            </dd>
            
            <dt class="col-md-3 text-primary">Description :</dt>
            <dd class="col-md-9">
            {{ offer.description }}
            </dd>
        </dl>
        <b-row>
            <b-col class="col-2">
                <b-button @click="deleteOffer" size="sm" variant="danger">Delete</b-button>
            </b-col>
        </b-row>
      <hr>
      <b-card-header class="mb-1 font-weight-bold text-primary">
        <h3>{{ $t("Buyers") }}</h3>
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
        :items="buyersList"
      >
        <template #cell(action)="buyer">
          <b-button @click="confirmBuyer(buyer.item._id)" variant="success" size="sm">
            Accept
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
import moment from 'moment'

export default {
  components: {
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    datetime,
  },
  data() {
    return {
      offer: {},
      buyersList: [],
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
            key: "surname",
            label: "Surname",
            sortable: true,
            sortDirection: "desc",
            tdClass: "list-item-heading"
          },
          {
            key: "adress",
            label: "Adress",
            sortable: true,
            tdClass: "text-muted"
          },
          {
            key: "phone",
            label: "Phone",
            sortable: true,
            tdClass: "text-muted"
          },
          { key: "action", label: "Action", tdClass: "text-muted" }
        ]
      }
    };
  },
  mounted(){
     this.getOffer()
  },
  methods: {
    moment,
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
    getStatus(status){
      if(status == 'o') return 'Owned'
      if(status == 's') return 'For sell'
      if(status == 'a') return 'For Adoption'
    },
    getOffer(){
      this.$Axios.get('/pet/'+this.petId+'/offer')
      .then(res => {
        this.offer = res.data[0]
        this.buyersList = this.offer.buyers
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
    confirmBuyer(id) {
      if(!confirm('are you sure ?')) return
        this.$Axios.put('/confirmOffer/'+ this.offer._id, {buyer: id})
        .then(res => {
          console.log(res.data)
          this.$notify("success", "Offer", "Pet is given!", {
          duration: 3000,
          permanent: false
        });
        this.$router.push('/owner/pets')
        })
        .catch(e => console.log(e))
    },
    deleteOffer(){
      if(!confirm('are you sure ?')) return
       this.$Axios.delete('/pet/'+this.petId+'/offer/' + this.offer._id)
        .then(res => {
          this.$notify("success", "Offer", "Offer deleted", {
          duration: 3000,
          permanent: false
        });
         this.$router.push("/owner/pets")
        })
        .catch(e => console.log(e))
    },
  }
};
</script>
