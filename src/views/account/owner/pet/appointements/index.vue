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
             <b-button v-if="selected" class="float-right" v-b-modal.modalEditAppointment variant="secondary" size="sm">Edit Appointment</b-button>
                        <b-modal
                        v-if="selected"
              id="modalEditAppointment"
              ref="modalEditAppointment"
              :title="$t('Appointement')"
              modal-class="modal-right"
            >
              <b-form>
                  <b-form-group :label="$t('Date')">
                  <b-form-datepicker
                    id="minDate"
                    v-model="selected.date"
                    size="lg"
                    today-button
                    close-button
                    start-weekday="1"
                    value-as-date
                    locale="en-GB"
                  />
                </b-form-group>
                <b-form-group :label="$t('veterinary')">
                  <b-form-select
                    v-model="selected.vet"
                    :options="vetOptions"
                  ></b-form-select>
                </b-form-group>
                <b-form-group :label="$t('Place')">
                  <b-form-input v-model="selected.lieu" />
                </b-form-group>
                <b-form-group :label="$t('Report')">
                  <b-form-input v-model="selected.rapport" />
                </b-form-group>
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalEditAppointment')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="updateAppointment()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>
            <b-button class="float-right" v-b-modal.modalAppointment variant="primary" size="sm">Add Appointment</b-button>
            <b-modal
              id="modalAppointment"
              ref="modalAppointment"
              :title="$t('Add Appointment')"
              modal-class="modal-right"
            >
              <b-form>
                  <b-form-group :label="$t('Date')">
                  <b-form-datepicker
                    id="minDate"
                    v-model="newAppointment.date"
                    size="lg"
                    today-button
                    close-button
                    start-weekday="1"
                    value-as-date
                    locale="en-GB"
                  />
                </b-form-group>
                <b-form-group :label="$t('veterinary')">
                  <b-form-select
                    v-model="newAppointment.vet"
                    :options="vetOptions"
                  ></b-form-select>
                </b-form-group>
                <b-form-group :label="$t('Place')">
                  <b-form-input v-model="newAppointment.lieu" />
                </b-form-group>
                <b-form-group :label="$t('Report')">
                  <b-form-input v-model="newAppointment.rapport" />
                </b-form-group>
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalAppointment')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="addNewAppointment()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>
          </b-col>
      </b-row>
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
        <template #cell(action)="appointment">
          <b-button @click="confirmAppointment(appointment.item._id)" v-if="!appointment.item.done" variant="success" size="sm">
            Confirmer
          </b-button>
          <b-button @click="deleteAppointment(appointment.item._id)"  variant="danger" size="sm">
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
          { key: "action", label: "Action", tdClass: "text-muted" }
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
    addNewAppointment() {
      let f = this.newAppointment
      if(!f.vet || !f.lieu || !f.date) {
        this.$notify("error", "Add Appointment", "Fill all fields", {
                        duration: 3000,
                        permanent: false
                        });
            return
      }


      this.$Axios.post('/pet/'+this.petId+'/appointment',this.newAppointment)
      .then(res => {
        this.newAppoinment = {}
        this.getAppointments()
        this.hideModal('modalAppointment')
        this.$notify("success", "Appointment", "Appointment added", {
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
      this.$Axios.get('/pet/'+this.petId+'/appointment')
      .then(res => {
        this.appointmentsList= []
        console.log(res.data)
        res.data.forEach(appo => {
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
      })
      .catch(e => {
        console.log(e)
      })
    },
    confirmAppointment(id){
      if(!confirm('are you sure ?')) return
      this.$Axios.put('/pet/'+this.petId+'/appointment/' + id,{done: true})
        .then(res => {
          this.getAppointments()
          this.$notify("success", "Appointment", "Appointment confimed", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
    updateAppointment(){
      this.$Axios.put('/pet/'+this.petId+'/appointment/' + this.selected._id,this.selected)
        .then(res => {
          this.getAppointments()
          
          this.hideModal('modalEditAppointment')
          this.$notify("success", "Appointment", "Appointment updated", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
    deleteAppointment(id){
      if(!confirm('are you sure ?')) return
       this.$Axios.delete('/pet/'+this.petId+'/appointment/' + id)
        .then(res => {
          this.getAppointments()
          this.$notify("success", "Appointment", "Appointment deleted", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
  }
};
</script>
