<template>
    <div>
        <pet-information :pet="folder.pet" v-if="folder"/>
        <vaccines class="mt-4" :data="folder.vaccine" v-if="folder"/>
        <appointment class="mt-4" :data="folder.appointment"  v-if="folder"/>
        <bath class="mt-4" :data="folder.bath" v-if="folder" />
        <food class="mt-4" :data="folder.food"  v-if="folder"/>
        <report class="mt-4" :dossier="folder.dossier" v-if="folder" />
    </div>
</template>
<script>
import PetInformation from './sections/petInformation'
import appointment from './appointements'
import bath from './bath'
import food from './food'
import vaccines from './vaccines'
import report from './report'

export default {
    components: {
        PetInformation,
        appointment,
        bath,
        food,
        vaccines,
        report,
    },
    data: () => ({
        folder: null,
        apiUrl: process.env.VUE_APP_API_URL,
    }),
    methods: {
      getPet: function() {
        let id = this.$route.params.id
        this.$Axios.get('/dossier/' + id)
       .then(res => {
         console.log(res.data)
           let data = res.data;

           data.pet.image = this.apiUrl + '/' + data.pet.photo
           this.folder = data

       })
       .catch(e => {
         console.log(e)
       })
      }
    },
    mounted() {
      this.getPet();
    }
}
</script>
