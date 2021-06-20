<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header
        v-b-toggle.weight
        header-tag="header"
        class="p-2 bg-primary"
        role="tab"
      >
        <b-container fluid class="bg-primary">
          <b-row align-v="center" class="my-2" align-h="between">
            <b-col cols="12"
              ><span class="font-weight-bold text-white">Weight</span></b-col>
          </b-row>
        </b-container>
      </b-card-header>
      <b-collapse id="weight" accordion="weight" role="tabpanel">
        <b-card-body>
          <b-row>
            <b-col cols="6">
              <b-form-group :label="'Today\'s weight'">
                <b-form-input v-model="todayWeight" />
              </b-form-group>
               <b-button @click="addWeight" class="mb-2" variant="success" size="sm">confirm</b-button>
            </b-col> 
            <b-col cols="6"> 
              <gradient-card>
                <i class="iconsminds-scale text-white display-1"/>
                <p class="lead text-white">
                  {{ $t("Your pet's weight is :") }}
                  {{pet.weight}}
                </p>
              </gradient-card>
            </b-col>
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import GradientCard from "@/components/Cards/GradientCard";
import AreaShadowChart from "@/components/Charts/AreaShadow";
import LineShadowChart from '@/components/Charts/LineShadow'

import { lineChartData } from "@/data/charts.js";

export default {
  props: ["pet"],
  components: {
    GradientCard,
    AreaShadowChart,
    LineShadowChart
  },
  data: () => ({
      todayWeight: null,
      lineChartData,
      stat: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: '',
            data: [65, 60, 68, 60, 58, 63, 60],
            borderColor: 'blue',
            pointBackgroundColor: 'blue',
            pointBorderColor: 'blue',
            pointHoverBackgroundColor: 'blue',
            pointHoverBorderColor: 'blue',
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: 'blue'
          }
        ]
      },
      text: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `
  }),
  methods: {
    addWeight() {
      this.$Axios.post('/pet/'+ this.pet.id + '/weight',{weight: this.todayWeight})
      .then(res => {
           this.pet.weight = this.todayWeight + ' Kg'
           this.todayWeight = null
      })
    }
  }
};
</script>
