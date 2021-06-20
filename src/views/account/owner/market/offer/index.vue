<template>
  <b-card v-if="offer" :img-src="offer.image" img-alt="Card image" img-left class="mb-3">
    <b-card-body class="info-body" >
        <dl class="row">
     <dt class="col-3 text-primary">Name :</dt>
        <dd class="col-3">
          {{offer.name}}
        </dd>

        <dt class="col-3 text-primary">Owner name :</dt>
        <dd class="col-3">
          {{offer.ownerName}}
        </dd>

        <dt class="col-3 text-primary">Adress :</dt>
        <dd class="col-3">
          {{offer.adress}}
        </dd>

        <dt class="col-3 text-primary">Birthday :</dt>
        <dd class="col-3">
          {{moment(offer.birthday).format('DD/MM/YYYY')}}
        </dd>

        <dt class="col-3 text-primary">Type :</dt>
        <dd class="col-3">
          {{offer.petType}}
        </dd>

        <dt class="col-3 text-primary">Buyers :</dt>
        <dd class="col-3">
          {{offer.buyers.length}}
        </dd>
        <dt v-if="offer.price" class="col-3 text-primary">Price :</dt>
        <dd v-if="offer.price" class="col-3">
          {{offer.price}}
        </dd>
        <dt class="col-12 text-primary">Description :</dt>
        <dd class="col-12">
          {{offer.description}}
        </dd>
        </dl>
      <b-card-footer class="footer" v-if="verifyUser != -1">
            <b-button v-if="verifyUser != 1" @click="requestPet" variant="success" size="sm">Request</b-button>
            <b-button v-else @click="cancelRequest" variant="danger" size="sm">Cancel Request</b-button>
      </b-card-footer>
    </b-card-body>
  </b-card>
</template>
<script>
import { mapGetters } from "vuex";
import moment from 'moment'
export default {
  data: () => ({
      offer: null,
      image: null,
      apiUrl: process.env.VUE_APP_API_URL,
      statuses: [
        {
          text: "Male",
          value: "Male"
        },
        {
          text: "Female",
          value: "Female"
        }
      ],
  }),
  computed: {
    ...mapGetters(["currentUser"]),
    verifyUser(){
        let id = this.currentUser._id
        if(id === this.offer.petOwnerId){
            return -1
        } else {
           if(this.offer.buyers.filter(buyer => buyer._id == id).length > 0){
               return 1
           } else {
               return 0
           }
        }
    }
  },
  mounted(){
     this.getOffer();
  },
  methods: {
    moment,
    convertMoment(value,format) {
        return moment(value).format(format)
    },
    getOffer(){
       this.$Axios.get('/pet/' + this.$route.params.petiId + '/offer/' + this.$route.params.offerId)
       .then(res => {
           console.log(res.data)
           let offer = res.data
           this.offer = {
              id: offer._id,
              image: this.apiUrl + '/' + offer.pet.photo,
              name: offer.pet.name,
              breed: offer.pet.breed,
              petType: offer.pet.type,
              birthday: offer.pet.birthday,
              gender: offer.pet.sex,
              description: offer.description,
              price: offer.price,
              createdAt: offer.createdAt,
              buyers: offer.buyers,
              offerType: offer.type,
              adress: offer.pet.owner.adress,
              ownerName: offer.pet.owner.name + ' ' + offer.pet.owner.surname,
              petId: offer.pet._id,
              petOwnerId: offer.pet.owner._id,
           }
       })
       .catch(e => console.log(e))
    },
    requestPet(){
           this.$Axios.put('/offer/' + this.$route.params.offerId)
       .then(res => {
           console.log(res.data)
           this.getOffer()
       })
       .catch(e => console.log(e))
    },
    cancelRequest(){
           this.$Axios.put('/cancelOffer/' + this.$route.params.offerId)
       .then(res => {
           console.log(res.data)
           this.getOffer()
       })
       .catch(e => console.log(e))
    }
  }
};
</script>
<style lang="scss" scoped>
.card-img-left {
  height: 20em;
  width: 20em;
  object-fit: cover;
  border: 2px solid #145388;
  border-radius: 2;
}

.card-body {
  padding: 5px;
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
  .card-img-left {
    height: 10em;
    width: 10em;
    object-fit: cover;
    border: 2px solid #145388;
    border-radius: 2;
  }
}
</style>
