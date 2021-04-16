<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header v-b-toggle.appointement header-tag="header" class="p-2 bg-primary" role="tab">
        <b-container fluid class="bg-primary">
          <b-row align-v="center" align-h="between">
            <b-col cols="4"><span class="font-weight-bold text-white">Appointements</span></b-col>
            <b-col cols="1" class="mx-3">
              <router-link :to="'/owner/pet/1/appointements'">
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
        @row-selected="rowSelected"
        selectable
        :select-mode="bootstrapTable.selectMode"
        :current-page="currentPage"
        selectedVariant="primary"
        :fields="bootstrapTable.fields"
        :items="dataProvider"
      ></b-table>
            </b-card>
        </b-card-body>
      </b-collapse>
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
            key: "place",
            label: "Place",
            sortable: true,
            tdClass: "text-muted"
          },
          {
            key: "report",
            label: "Report",
            sortable: false,
            tdClass: "text-muted"
          },
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
              date: '12.12.2020',
              vet: 'Hbib',
              place: 'Zahra',
              report: '',
          }];
    },
  }
};
</script>