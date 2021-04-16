/* eslint-disable vue/no-unused-components */
<template>
  <div>

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
        events: [
          {
            id: "e2",
            startDate: this.thisMonth(15),
            title: "Meeting",
            classes: "secondary"
          },
          {
            id: "e3",
            startDate: this.thisMonth(8, 9, 25),
            endDate: this.thisMonth(9, 16, 30),
            title: "Sales",
            classes: "primary"
          },
          {
            id: "e5",
            startDate: this.thisMonth(5),
            endDate: this.thisMonth(12),
            title: "Tax Days",
            classes: "secondary"
          },
          {
            id: "e10",
            startDate: this.thisMonth(27),
            title: "My Birthday!"
          }
        ]
      },
    };
  },

  methods: {
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
    }
  }
};
</script>
