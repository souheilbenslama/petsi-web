<template>
  <div>
    <b-card>
      <b-card-header class="mb-1 font-weight-bold text-primary">
        <h3>{{ $t("Appointments") }}</h3>
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
        :items="appointmentsList"
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
  props: ["data"],
  components: {
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap
  },
  data() {
    return {
      newAppointment: {
        date: null,
        vet: null,
        lieu: null,
        rapport: null,
      },
      vetOptions: [],
      appointmentsList: [],
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
            key: "dateForm",
            label: "Date",
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
            key: "lieu",
            label: "Place",
            sortable: true,
            tdClass: "text-muted"
          },
          {
            key: "rapport",
            label: "Report",
            sortable: false,
            tdClass: "text-muted"
          },
        ]
      }
    };
  },
   mounted(){
     this.getVets();
     this.getAppointments();
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
    dataProvider(ctx) {
      return [{
              date: '12.12.2020',
              vet: 'Hbib',
              place: 'Zahra',
              report: '',
          }];
    },
    getVets(){
      this.$Axios.get('/getUsers')
      .then(res => {
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
     getAppointments(){
      this.data.forEach(appo => {
          let appointment = {
              _id: appo._id,
              lieu: appo.lieu,
              rapport: appo.rapport,
              vet: appo.vet._id,
              vetName: appo.vet.name + ' ' + appo.vet.surname,
              dateForm: this.moment(appo.date).format('DD-MM-YYYY'),
              date: appo.date,
              desc: appo.name,
              done: appo.done,
          }
          this.appointmentsList.push(appointment)
        })
    },
  }
};
</script>
