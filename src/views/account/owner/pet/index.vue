<template>
    <div>
        <pet-information :pet="pet" v-if="pet"/>
        <router-view>
        </router-view>
    </div>
</template>
<script>
import PetInformation from './sections/petInformation'

export default {
    components: {
        PetInformation,
    },
    data: () => ({
        pet: {},
        apiUrl: process.env.VUE_APP_API_URL,
    }),
    methods: {
      getPet: function() {
        let id = this.$route.params.id
        this.$Axios.get('/pet/' + id)
       .then(res => {
           let pet = res.data.pet;
           this.pet = {
              id: pet._id,
              image: this.apiUrl + '/' + pet.photo,
              name: pet.name,
              breed: pet.breed,
              birthday: pet.birthday,
              weight: pet.weight + ' Kg',
              gender: pet.sex,
              appointment: pet.appointment,
              bath: pet.appointment,
              food: pet.food,
              treatment: pet.treatment,
              vaccine: pet.vaccine,
              status: pet.status
            }
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
