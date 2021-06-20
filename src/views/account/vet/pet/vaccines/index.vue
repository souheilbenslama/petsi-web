<template>
  <div>
    <b-card>
      <b-card-header class="mb-1 font-weight-bold text-primary">
        <h3>{{ $t("Vaccines") }}</h3>
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
        :items="vaccinesList"
      >
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
import moment from 'moment'

export default {
  props: ['data'],
  components: {
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap
  },
  data() {
    return {
      newVaccine: {
        name: null,
        vet: null,
        date: null,
        desc: null,
      },
      vetOptions: [],
      vaccinesList: [],
      petId: this.$route.params.id,
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      selected: null,
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
            key: "vetName",
            label: "Veterinary",
            sortable: true,
            tdClass: "text-muted"
          },
          {
            key: "dateForm",
            label: "Date",
            sortable: true,
            tdClass: "text-muted"
          },
          {
            key: "desc",
            label: "Description",
            sortable: true,
            tdClass: "text-muted"
          },
        ]
      }
    };
  },
  mounted(){
     this.getVets();
     this.getVaccines();
  },
  computed: {
    dataProvider(ctx) {
      return this.vaccinesList
    },
  },
  methods: {
     moment,
      hideModal(refname) {
      this.$refs[refname].hide();
    },
    onRowSelected(items) {
        this.selected = items[0]
      },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    getVets(){
      this.$Axios.get('/getUsers')
      .then(res => {
        console.log(res.data)
        this.vetOptions= []
        res.data.forEach(user => {
          if(user.role == 'Veterinary'){
            let option = {
              value: user._id,
              text: user.name + " " + user.surname,
            }
            this.vetOptions.push(option)
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
    },
    getVaccines(){
      this.vaccinesList= []
        this.data.forEach(vacc => {
          let vaccine = {
              _id: vacc._id,
              name: vacc.name,
              vet: vacc.vet._id,
              vetName: vacc.vet.name + ' ' + vacc.vet.surname,
              date: vacc.date,
              dateForm: this.moment(vacc.date).format('DD-MM-YYYY'),
              desc: vacc.name,
              done: vacc.done,
          }
          this.vaccinesList.push(vaccine)
        })
    },
  }
};
</script>
