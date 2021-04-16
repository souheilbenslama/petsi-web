<template>
  <div>
      <b-row class="m-2" align-h="between">
          <b-col cols="1">
                <router-link :to="'/owner/pet/1/all'"
          ><b-button size="sm"
            ><i class="iconsminds-left"/></b-button></router-link
        >
          </b-col>
          <b-col cols="4" >
            <b-button class="float-right" v-b-modal.modalVaccine variant="primary" size="sm">Add Vaccine</b-button>
            <b-modal
              id="modalVaccine"
              ref="modalVaccine"
              :title="$t('pages.add-new-pet')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('name')">
                  <b-form-input v-model="newVaccine.name" />
                </b-form-group>
                <b-form-group :label="$t('veterinary')">
                  <b-form-input v-model="newVaccine.vet" />
                </b-form-group>
                <b-form-group :label="$t('Date')">
                  <b-form-datepicker
                    id="minDate"
                    v-model="newVaccine.date"
                    size="lg"
                    today-button
                    close-button
                    start-weekday="1"
                    value-as-date
                    locale="en-GB"
                  />
                </b-form-group>
                <b-form-group :label="$t('Description')">
                  <b-form-input v-model="newVaccine.desc" />
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
          </b-col>
      </b-row>
    <b-card>
      <b-card-header class="mb-1 font-weight-bold text-primary">
        <h3>{{ $t("Vaccines") }}</h3>
      </b-card-header>
      <b-table
        ref="custom-table"
        class="vuetable"
        sort-by="title"
        sort-desc.sync="false"
        @row-selected="rowSelected"
        selectable
        :select-mode="bootstrapTable.selectMode"
        :current-page="currentPage"
        selectedVariant="primary"
        :fields="bootstrapTable.fields"
        :items="dataProvider"
      >
        <template #cell(action)="">
          <b-button variant="success" size="sm">
            Confirmer
          </b-button>
          <b-button variant="danger" size="sm">
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

export default {
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
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      bootstrapTable: {
        selected: [],
        selectMode: "multi",
        fields: [
          {
            key: "name",
            label: "Name",
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
            key: "date",
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
          { key: "action", label: "Action", tdClass: "text-muted" }
        ]
      }
    };
  },
  methods: {
      hideModal(refname) {
      this.$refs[refname].hide();
    },
    addNewPet() {
      console.log("adding item : ", this.newPet);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataProvider(ctx) {
      return [{
              name: 'pfizer',
              vet: 'Hbib',
              date: '12.12.2020',
              desc: 'vaccin 1',
          }];
    },
  }
};
</script>
