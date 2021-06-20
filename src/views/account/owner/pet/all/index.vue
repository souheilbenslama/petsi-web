<template>
<div>
    <pet-vaccines-section :pet="pet" v-if="pet"/>
        <pet-weight-section :pet="pet" v-if="pet"/>
        <pet-food-section :pet="pet" v-if="pet"/>
        <pet-bath-section :pet="pet" v-if="pet"/>
        <pet-appointements-section :pet="pet" v-if="pet" />
</div>
</template>
<script>
import PetInformation from '../sections/petInformation'
import PetVaccinesSection from '../sections/petVaccines'
import PetWeightSection from '../sections/petWeight'
import PetFoodSection from '../sections/petFood'
import PetBathSection from '../sections/petBath'
import PetAppointementsSection from '../sections/petAppointements'
export default {
    components: {
        PetInformation,
        PetVaccinesSection,
        PetFoodSection,
        PetWeightSection,
        PetBathSection,
        PetAppointementsSection,
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
           let data = res.data;
           console.log(`Looking for food`)
           console.log(data.bath)
           this.pet = {
              id: data.pet._id,
              image: this.apiUrl + '/' + data.pet.photo,
              name: data.pet.name,
              breed: data.pet.breed,
              birthday: data.pet.birthday,
              weight: data.pet.weight + ' Kg',
              gender: data.pet.sex,
              nextFood: data.food,
              lastBath: data.bath.date,
              status: data.pet.status
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