<template>
  <b-card v-if="pet.name" :img-src="pet.image" img-alt="Card image" img-left class="mb-3">
    <b-card-body class="info-body" >
      <dl class="row">
        <dt class="col-md-3 text-primary">Name :</dt>
        <dd class="col-md-9">
          {{ pet.name }}
        </dd>

        <dt class="col-md-3 text-primary">Gender :</dt>
        <dd class="col-md-9">
          {{ pet.gender }}
        </dd>

        <dt class="col-md-3 text-primary">Birthday :</dt>
        <dd class="col-md-9">
          {{convertMoment(pet.birthday, 'DD-MM-YYYY') }}
        </dd>

        <dt class="col-md-3 text-primary">Breed :</dt>
        <dd class="col-md-9">
          {{ pet.breed }}
        </dd>

        <dt class="col-md-3 text-primary">Status :</dt>
        <dd class="col-md-9">
          {{ getStatus(pet.status)}}
        </dd>

        <dt class="col-md-3 text-primary">weight :</dt>
        <dd class="col-md-9">
          {{ pet.weight + ' kg'}}
        </dd>
      </dl>
    </b-card-body>
  </b-card>
</template>
<script>
import moment from 'moment'
export default {
  props: ["pet"],
  data: () => ({
      image: null,
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
      offer: {
        action: 'a',
        price: null,
        descritpion: null,
      }
  }),
  methods: {
    moment,
    convertMoment(value,format) {
        return moment(value).format(format)
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    editPet() {
       let formData = new FormData();
      if (this.image) {
        formData.append("photo", this.image);
      }
      formData.append("name", this.pet.name);
      formData.append("breed", this.pet.breed);
      formData.append("birthday", this.pet.birthday);
      formData.append("weight",this.pet.weight.slice(0,-3))
      formData.append("sex", this.pet.gender);

      this.$Axios({
        method: "put",
        url: "/pet/" + this.pet.id,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(res => {
            this.hideModal("modalright");
           this.$notify("success", "Pet", "Pet updated", {
            duration: 3000,
            permanent: false
          });
       }).catch(e => console.log(e))
    },
    getStatus(status){
      if(status == 'o') return 'Owned'
      if(status == 's') return 'For sell'
      if(status == 'a') return 'For Adoption'
    },
    putOnMarket(){
       let newOffer
       if(!this.offer.description) {
         this.$notify("error", "Offer", "Add description!", {
            duration: 3000,
            permanent: false
          });
          return 
       }
       if(this.offer.action == 's' && !this.offer.price) {
         this.$notify("error", "Offer", "Add a price!", {
            duration: 3000,
            permanent: false
          });
          return 
       }

       if(this.offer.action == 's'){
         newOffer = {
           type: this.offer.action,
           price: this.offer.price,
           description: this.offer.description
         }
       } else {
         newOffer = {
           type: this.offer.action,
           description: this.offer.description
         }
       }


       this.$Axios.post('/pet/' + this.pet.id + '/offer',newOffer)
       .then(res => {
           this.hideModal("modalOffer");
           this.$notify("success", "Offer", "Offer Added", {
            duration: 3000,
            permanent: false
          });
          this.pet.status = this.offer.action
       })
       .catch(e => console.log(e))
    },
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
