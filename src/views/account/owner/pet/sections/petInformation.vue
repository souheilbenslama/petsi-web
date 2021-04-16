<template>
  <b-card :img-src="pet.image" img-alt="Card image" img-left class="mb-3">
    <b-card-body class="info-body">
      <dl class="row">
        <dt class="col-md-3 text-primary">Name :</dt>
        <dd class="col-md-9">
          {{ pet.name }}
        </dd>

        <dt class="col-md-3 text-primary">Gender :</dt>
        <dd class="col-md-9">
          {{ pet.sexe }}
        </dd>

        <dt class="col-md-3 text-primary">Birthday :</dt>
        <dd class="col-md-9">
          {{ pet.birthday }}
        </dd>

        <dt class="col-md-3 text-primary">Breed :</dt>
        <dd class="col-md-9">
          {{ pet.breed }}
        </dd>
      </dl>
      <b-card-footer class="footer">
        <b-button v-b-modal.modalright variant="primary" size="md">Edit</b-button>
            <b-modal
              id="modalright"
              ref="modalright"
              :title="$t('pages.add-new-pet')"
              modal-class="modal-right"
            >
              <b-form>
                <b-form-group :label="$t('image')">
                <b-form-file
                   accept="image/jpeg, image/png, image/gif"
                  v-model="newPet.image"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                </b-form-group>
                <b-form-group :label="$t('name')">
                  <b-form-input v-model="newPet.name" />
                </b-form-group>
                <b-form-group :label="$t('breed')">
                  <b-form-input v-model="newPet.breed" />
                </b-form-group>
                <b-form-group :label="$t('birthday')">
                  <b-form-datepicker
                    id="minDate"
                    v-model="newPet.birthday"
                    size="lg"
                    today-button
                    close-button
                    start-weekday="1"
                    value-as-date
                    locale="en-GB"
                  />
                </b-form-group>
                <b-form-group :label="$t('Weight')">
                  <b-form-input v-model="newPet.weight" />
                </b-form-group>
                <b-form-group :label="$t('Gender')">
                  <b-form-radio-group
                    stacked
                    class="pt-2"
                    :options="statuses"
                    v-model="newPet.gender"
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
                  @click="addNewPet()"
                  class="mr-1"
                  >{{ $t("pages.submit") }}</b-button
                >
              </template>
            </b-modal>


        <router-link :to="'/owner/pet/1/schedule'"
          ><b-button variant="secondary" size="md"
            >Schedule</b-button
          ></router-link
        >
      </b-card-footer>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  props: ["pet"],
  data: () => ({
    newPet: {
        image: null,
        name: null,
        breed: null,
        birthday: null,
        weight: null,
        gender: null,
      }
  }),
  methods: {
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    addNewPet() {
      console.log("adding item : ", this.newPet);
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
