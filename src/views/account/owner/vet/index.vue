<template>
<div>
  <b-card v-if="vet" :img-src="vet.image" img-alt="Card image" img-left class="mb-3">
    <b-card-body class="info-body" >
        <dl class="row">
     <dt class="col-3 text-primary">Name :</dt>
        <dd class="col-9">
          {{vet.name + ' ' + vet.surname}}
        </dd>

        <dt class="col-3 text-primary">Email :</dt>
        <dd class="col-9">
          {{vet.email}}
        </dd>

        <dt class="col-3 text-primary">Adress :</dt>
        <dd class="col-9">
          {{vet.adress}}
        </dd>

        <dt class="col-3 text-primary">Phone :</dt>
        <dd class="col-9">
          {{vet.phone}}
        </dd>
        </dl>
    </b-card-body>
  </b-card>
  <assaign/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import moment from 'moment'
import Assaign from './assaign'
export default {
  components: {
     Assaign,
  },
  data: () => ({
      vet: null,
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
  mounted(){
     this.getVet();
  },
  methods: {
    moment,
    convertMoment(value,format) {
        return moment(value).format(format)
    },
    getVet(){
       this.$Axios.get('/getVets')
       .then(res => {
           let vet = res.data.filter(vet => { return vet._id == this.$route.params.id })[0]
           this.vet = {
              id: vet._id,
              image: this.apiUrl + '/' + vet.avatar,
              name: vet.name,
              surname: vet.surname,
              birthday: vet.birthday,
              gender: vet.gender,
              phone: vet.phone,
              adress: vet.adress,
              email: vet.email,
           }
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
