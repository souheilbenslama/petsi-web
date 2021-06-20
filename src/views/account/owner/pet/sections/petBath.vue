<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header v-b-toggle.Bath header-tag="header" class="p-2 bg-primary" role="tab">
        <b-container fluid class="bg-primary">
          <b-row align-v="center" align-h="between">
            <b-col cols="4"><span class="font-weight-bold text-white">Bath</span></b-col>
            <b-col cols="1" class="mx-3">
              <router-link :to="'/owner/pet/'+ $route.params.id +'/bath'">
              <b-button size="sm"  variant="info">Consult</b-button>
              </router-link>
              </b-col>
          </b-row>
        </b-container>
      </b-card-header>
      <b-collapse id="Bath" accordion="Bath" role="tabpanel">
        <b-card-body>
          <b-row>
              <b-col v-if="pet.lastBath" cols="12" class="icon-cards-row">
                  <icon-card :title="'Next Bath'" icon="iconsminds-rain-drop" :value="moment(pet.lastBath).format('DD/MM/YYYY HH:mm')" />
              </b-col>
              <b-col cols="12" class="icon-cards-row" v-else>
                <icon-card :title="'Next Bath'" icon="iconsminds-close" :value="'No bath scheduled'" />
              </b-col>
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import IconCard from '@/components/Cards/IconCard'
import moment from 'moment'

  export default {
      props: {
         pet: Object
      },
      components: {
         IconCard 
      },
      methods: {
          moment,
      },
  }
</script>