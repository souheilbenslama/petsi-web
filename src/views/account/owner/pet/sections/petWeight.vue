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
              <gradient-card>
                <i class="iconsminds-scale text-white display-1"/>
                <p class="lead text-white">
                  {{ $t("Your pet's weight is :") }}
                  3Kg
                </p>
              </gradient-card>
            </b-col>
            <b-col cols="6">
              <b-card class="dashboard-filled-line-chart" no-body>
                <b-card-body>
                  <div class="float-left float-none-xs">
                    <div class="d-inline-block">
                      <h5 class="d-inline">
                        {{ $t("dashboards.conversion-rates") }}
                      </h5>
                      <span class="text-muted text-small d-block">{{
                        $t("dashboards.per-session")
                      }}</span>
                    </div>
                  </div>
                  <b-dropdown
                    id="ddown5"
                    :text="$t('dashboards.this-week')"
                    size="xs"
                    variant="outline-secondary"
                    class="float-right float-none-xs mt-2"
                  >
                    <b-dropdown-item>{{
                      $t("dashboards.last-week")
                    }}</b-dropdown-item>
                    <b-dropdown-item>{{
                      $t("dashboards.this-month")
                    }}</b-dropdown-item>
                  </b-dropdown>
                </b-card-body>
                <div class="chart card-body pt-0">
                  <area-shadow-chart
                    :data="conversionChartData"
                    :height="195"
                  />
                </div>
              </b-card>
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

import { conversionChartData } from "@/data/charts";

export default {
  components: {
    GradientCard,
    AreaShadowChart,
  },
  data() {
    return {
      todayWeight,
      conversionChartData,
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
    };
  }
};
</script>
