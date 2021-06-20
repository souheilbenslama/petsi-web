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
            <b-button v-if="selected" class="float-right" v-b-modal.modalEditBath variant="secondary" size="sm">Edit Bath</b-button>
                        <b-modal
                        v-if="selected"
              id="modalEditBath"
              ref="modalEditBath"
              :title="$t('Edit Bath')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('Description')">
                  <b-form-input v-model="selected.description" />
                </b-form-group>
                <b-form-group :label="$t('Date')">
                  <datetime format="YYYY-MM-DD H:i:s" width="300px" v-model="selected.date"></datetime>
                </b-form-group>
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalEditBath')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="updateBath()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>

            <b-button class="float-right" v-b-modal.modalBath variant="primary" size="sm">Add Bath</b-button>
            <b-modal
              id="modalBath"
              ref="modalBath"
              :title="$t('Add Bath')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('Description')">
                  <b-form-input v-model="newBath.description" />
                </b-form-group>
                <b-form-group :label="$t('Date')">
                  <datetime format="YYYY-MM-DD H:i:s" width="300px" v-model="newBath.date"></datetime>
                </b-form-group>
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalBath')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="addNewBath()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>
          </b-col>
      </b-row>
    <b-card>
      <b-card-header class="mb-1 font-weight-bold text-primary">
        <h3>{{ $t("Baths") }}</h3>
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
        :items="bathsList"
      >
        <template #cell(action)="bath">
          <b-button @click="confirmBath(bath.item._id)" v-if="!bath.item.done" variant="success" size="sm">
            Confirmer
          </b-button>
          <b-button @click="deleteBath(bath.item._id)"  variant="danger" size="sm">
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
import moment from 'moment'

export default {
  components: {
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    datetime,
  },
  data() {
    return {
      newBath: {
        description: null,
        date: null,
      },
      bathsList: [],
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
            key: "description",
            label: "Description",
            sortable: true,
            sortDirection: "desc",
            tdClass: "list-item-heading"
          },
          {
            key: "dateForm",
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
     this.getBaths()
  },
  methods: {
    moment,
      hideModal(refname) {
      this.$refs[refname].hide();
    },
    onRowSelected(items) {
        this.selected = items[0]
      },
    addNewBath() {
      let f = this.newBath

      if(!f.description || !f.date) {
        this.$notify("error", "Add Bath", "Fill all fields", {
                        duration: 3000,
                        permanent: false
                        });
            return
      }

      this.$Axios.post('/pet/'+this.petId+'/bath',this.newBath)
      .then(res => {
        this.newBath = {}
        this.getBaths()
        this.hideModal('modalBath')
        this.$notify("success", "Bath", "Bath added", {
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
    getBaths(){
      this.$Axios.get('/pet/'+this.petId+'/bath')
      .then(res => {
        this.bathsList= []
        res.data.forEach(bath => {
          bath.dateForm = this.moment(bath.date).format('DD-MM-YYYY HH:mm')
          this.bathsList.push(bath)
        })
      })
      .catch(e => {
        console.log(e)
      })
    },
    confirmBath(id){
      if(!confirm('are you sure ?')) return
      this.$Axios.put('/pet/'+this.petId+'/bath/' + id,{done: true})
        .then(res => {
          this.getBaths()
          this.$notify("success", "Bath", "Bath confimed", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
    updateBath(){
      this.$Axios.put('/pet/'+this.petId+'/bath/' + this.selected._id,this.selected)
        .then(res => {
          this.getBaths()
          
          this.hideModal('modalEditBath')
          this.$notify("success", "Bath", "Bath updated", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
    deleteBath(id){
      if(!confirm('are you sure ?')) return
       this.$Axios.delete('/pet/'+this.petId+'/bath/' + id)
        .then(res => {
          this.getBaths()
          this.$notify("success", "Bath", "Bath deleted", {
          duration: 3000,
          permanent: false
        });
        })
        .catch(e => console.log(e))
    },
  }
};
</script>
