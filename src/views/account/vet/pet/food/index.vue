<template>
  <div>
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
  props:['data'],
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
            key: "dateForm",
            label: "Date/Time",
            sortable: true,
            tdClass: "text-muted"
          },
        ]
      }
    };
  },
  mounted(){
     this.getFoods()
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
    getFoods(){
      this.foodsList= []
        this.data.forEach(food => {
          food.dateForm = this.moment(food.date).format("DD-MM-YYYY HH:mm")
          this.foodsList.push(food)
        })
    },
  }
};
</script>
