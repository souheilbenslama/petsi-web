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
           let pet = res.data;
           console.log(pet)
           this.pet = {
              id: pet._id,
              image: this.apiUrl + '/' + pet.photo,
              name: pet.name,
              breed: pet.breed,
              birthday: pet.birthday,
              weight: pet.weight + ' Kg',
              gender: pet.sex,
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