<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header v-b-toggle.appointement header-tag="header" class="p-2 bg-primary" role="tab">
        <b-container fluid class="bg-primary">
          <b-row align-v="center" align-h="between">
            <b-col cols="4"><span class="font-weight-bold text-white">Appointements</span></b-col>
            <b-col cols="1" class="mx-3">
              <router-link :to="'/owner/pet/'+ $route.params.id +'/appointements'">
                <b-button size="sm"  variant="info">Consult</b-button>
              </router-link>
              </b-col>
          </b-row>
        </b-container>
      </b-card-header>
      <b-collapse id="appointement" accordion="appointement" role="tabpanel">
        <b-card-body>
          <b-card class="mb-4" :title="$t('Appointements')">
             <b-table
        ref="custom-table"
        class="vuetable"
        sort-by="title"
        sort-desc.sync="false"
        selectable
        :select-mode="bootstrapTable.selectMode"
        :current-page="currentPage"
        selectedVariant="primary"
        :fields="bootstrapTable.fields"
        :items="appointmentsList"
      ></b-table>
            </b-card>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
import VuetablePaginationBootstrap from "@/components/Common/VuetablePaginationBootstrap";
import moment from 'moment'

export default {
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
            key: "date",
            label: "Date",
            sortable: true,
            sortDirection: "desc",
            tdClass: "list-item-heading"
          },
          {
            key: "vet",
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
          }
        ]
      }
    };
  },
  mounted(){
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
    getAppointments(){
      this.$Axios.get('/pet/'+this.petId+'/appointment')
      .then(res => {
        this.appointmentsList= []
        res.data.forEach(appo => {
          let appointment = {
              _id: appo._id,
              lieu: appo.lieu,
              rapport: appo.rapport,
              vet: appo.vet.name + ' ' + appo.vet.surname,
              date: this.moment(appo.date).format('DD-MM-YYYY'),
              desc: appo.name,
              done: appo.done,
          }
          this.appointmentsList.push(appointment)
        })
      })
      .catch(e => {
        console.log(e)
      })
    },
  }
};
</script>