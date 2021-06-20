/* eslint-disable vue/no-unused-components */
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
    <b-row>
      <b-colxx class="mb-4">
        <b-card :title="$t('Schedule')">
          <calendar-view
            style="min-height:500px"
            :events="calendar.events"
            :show-date="calendar.showDate"
            :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
            :enable-drag-drop="false"
            :show-event-times="true"
            display-period-uom="month"
            :starting-day-of-week="1"
            current-period-label="Today"
            @drop-on-date="onDropDate"
            @click-date="onClickDay"
            @click-event="onClickEvent"
          >
            <calendar-view-header
              slot="header"
              slot-scope="t"
              :header-props="t.headerProps"
              @input="setShowDate"
            />
          </calendar-view>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment'
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMathMixin
} from "vue-simple-calendar";



export default {
  components: {
    "calendar-view": CalendarView,
    "calendar-view-header": CalendarViewHeader,
  },
  mixins: [CalendarMathMixin],
  data() {
    return {
      calendar: {
        showDate: this.thisMonth(1),
        events: []
      },
    };
  },
  mounted() {
     this.getEvents()
  },
  methods: {
    moment,
    refreshButtonClick() {
      console.log("refreshButtonClick");
    },
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    onClickDay(d) {
      console.log(`You clicked: ${d.toLocaleDateString()}`);
    },
    onClickEvent(e) {
        console.log(e)
      console.log(`You clicked: ${e.title}`);
    },
    setShowDate(d) {
      this.calendar.showDate = d;
    },
    onDropDate(event, date) {
      console.log(`You dropped ${event.id} on ${date.toLocaleDateString()}`);

      const eLength = this.dayDiff(event.startDate, date);
      event.originalEvent.startDate = this.addDays(event.startDate, eLength);
      event.originalEvent.endDate = this.addDays(event.endDate, eLength);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    getEvents(){
      let id = this.$route.params.id
        this.$Axios.get('/pet/' + id + '/appointment')
       .then(res => {
           
          res.data.forEach(appo => {
              console.log(appo)
              let event = {
                id: appo._id,
                startDate: this.thisMonth(moment(appo.date).format("DD"), moment(appo.date).format("HH"), moment(appo.date).format("mm")),
                title: "Appointment",
                classes: "primary"
              }
              console.log(event)
              this.calendar.events.push(event)
          })
       })
       .catch(e => {
         console.log(e)
       })
       
       this.$Axios.get('/pet/' + id + '/bath')
       .then(res => {
           
          res.data.forEach(bath => {
              console.log(bath)
              let event = {
                id: bath._id,
                startDate: this.thisMonth(moment(bath.date).format("DD"), moment(bath.date).format("HH"), moment(bath.date).format("mm")),
                title: "Bath",
                classes: "success"
              }
              console.log(event)
              this.calendar.events.push(event)
          })
       })
       .catch(e => {
         console.log(e)
       })

       this.$Axios.get('/pet/' + id + '/food')
       .then(res => {
           
          res.data.forEach(food => {
              let event = {
                id: food._id,
                startDate: this.thisMonth(moment(food.date).format("DD"), moment(food.date).format("HH"), moment(food.date).format("mm")),
                title: "Food",
                classes: "error"
              }
              this.calendar.events.push(event)
          })
       })
       .catch(e => {
         console.log(e)
       })

       this.$Axios.get('/pet/' + id + '/vaccine')
       .then(res => {
           
          res.data.forEach(vaccine => {
              let event = {
                id: vaccine._id,
                startDate: this.thisMonth(moment(vaccine.date).format("DD"), moment(vaccine.date).format("HH"), moment(vaccine.date).format("mm")),
                title: "Vaccine",
                classes: "secondary"
              }
              this.calendar.events.push(event)
          })
       })
       .catch(e => {
         console.log(e)
       })
    },
  }
};
</script>
