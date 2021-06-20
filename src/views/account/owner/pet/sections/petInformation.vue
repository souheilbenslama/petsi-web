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
      </dl>
      <b-card-footer class="footer">
            <b-modal
              id="modalright"
              ref="modalright"
              :title="$t('Update Pet')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('image')">
                <b-form-file
                   accept="image/jpeg, image/png, image/gif"
                  v-model="image"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                </b-form-group>
                <b-form-group :label="$t('name')">
                  <b-form-input v-model="pet.name" />
                </b-form-group>
                <b-form-group :label="$t('breed')">
                  <b-form-input v-model="pet.breed" />
                </b-form-group>
                <b-form-group :label="$t('birthday')">
                  <b-form-datepicker
                    id="minDate"
                    v-model="pet.birthday"
                    size="lg"
                    today-button
                    close-button
                    start-weekday="1"
                    value-as-date
                    locale="en-GB"
                  />
                </b-form-group>
                <b-form-group :label="$t('Gender')">
                  <b-form-radio-group
                    stacked
                    class="pt-2"
                    :options="statuses"
                    v-model="pet.gender"
                  />
                </b-form-group>
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalright')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="editPet()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>

        <b-row>
          <b-col>
        <b-button v-b-modal.modalright variant="primary" size="md">Edit</b-button>
        <router-link :to="'/owner/pet/'+ $route.params.id +'/schedule'"
          ><b-button variant="secondary" size="md"
            >Schedule</b-button
          ></router-link
        ></b-col>
        <b-col align-self="end" >
        <b-button v-if="pet.status == 'o'" v-b-modal.modalOffer variant="danger" size="md"
            >Put on market</b-button>
        <router-link v-else :to="'/owner/pet/'+ $route.params.id +'/offer'">
          <b-button  variant="danger" size="md"> 
            Offer
        </b-button>
        </router-link>
          <b-modal
              id="modalOffer"
              ref="modalOffer"
              :title="$t('Put on market')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('Action')">
                  <b-form-radio-group
                    stacked
                    class="pt-2"
                    :options="[{
                      text: 'For Adoption', value: 'a'
                    },{
                      text: 'For Sell', value: 's'
                    }]"
                    v-model="offer.action"
                  />
                </b-form-group>
                <b-form-group :label="$t('Price')">
                  <b-form-input type="number" v-model="offer.price" />
                </b-form-group>
                <b-form-group :label="$t('Description')">
                  <b-form-input v-model="offer.description" />
                </b-form-group>
                
              </b-form>

              <template slot="modal-footer">
                <b-button
                  variant="outline-secondary"
                  @click="hideModal('modalOffer')"
                  >{{ $t("pages.cancel") }}</b-button
                >
                <b-button
                  variant="primary"
                  @click="putOnMarket()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>
          </b-col>
        </b-row>
      </b-card-footer>
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
      if(!this.pet.name || !this.pet.breed ||!this.pet.birthday || !this.pet.gender) {
            this.$notify("error", "Update Pet", "Fill all fields", {
                        duration: 3000,
                        permanent: false
                        });
            return
      }

      if(this.pet.birthday > Date.now()) {
            this.$notify("error", "Update Pet", "Date is invalid", {
                        duration: 3000,
                        permanent: false
                        });
            return
      }

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
          console.log(res.data)
          this.pet.image = process.env.VUE_APP_API_URL + '/' + res.data.photo
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
