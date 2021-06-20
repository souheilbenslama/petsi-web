<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header
        v-b-toggle.vaccines
        header-tag="header"
        class="p-2 bg-primary"
        role="tab"
      >
        <b-row align-v="center" align-h="between">
          <b-col cols="4"
            ><span class="font-weight-bold text-white">Vaccines</span></b-col
          >
          <b-col cols="1" class="mx-3">
            <router-link :to="'/owner/pet/'+ $route.params.id +'/vaccines'">
              <b-button size="sm" variant="info">Consult</b-button>
            </router-link>
          </b-col>
        </b-row>
      </b-card-header>
      <b-collapse id="vaccines" accordion="vaccines" role="tabpanel">
        <b-card-body>
          <b-row>
            <b-col cols="6">
              <b-card :title="$t('Done vaccines')">
                <vue-perfect-scrollbar
                  class="dashboard-logs scroll"
                  :settings="{ suppressScrollX: true, wheelPropagation: false }"
                >
                  <log-list :logs="Done" />
                </vue-perfect-scrollbar>
              </b-card>
            </b-col>
            <b-col cols="6">
              <b-card :title="$t('To Do vaccines')">
                <vue-perfect-scrollbar
                  class="dashboard-logs scroll"
                  :settings="{ suppressScrollX: true, wheelPropagation: false }"
                >
                  <log-list :logs="toDo" />
                </vue-perfect-scrollbar>
              </b-card>
            </b-col>
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import LogList from "@/components/Listing/LogList";
import moment from 'moment'
export default {
  components: {
    LogList
  },
  data() {
    return {
      Done: [],
      toDo: [],
      petId: this.$route.params.id,
    };
  },
  mounted() {
     this.getVaccines();
  },
  methods: {
    moment,
    getVaccines(){
      this.$Axios.get('/pet/'+this.petId+'/vaccine')
      .then(res => {
        this.toDo= []
        this.Done= []
        res.data.forEach(vacc => {
          let vaccine = {
              label: vacc.name,
              time: this.moment(vacc.date).format('DD-MM-YYYY'),
              color: "border-theme-4",
              key: vacc._id
          }
          vacc.done ? this.Done.push(vaccine) : this.toDo.push(vaccine)
        })
      })
      .catch(e => {
        console.log(e)
      })
    },
  }
};
</script>
