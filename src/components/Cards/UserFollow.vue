<template>
  <div class="d-flex flex-row mb-3 pb-3 border-bottom justify-content-between align-items-center">
    <single-lightbox
      :thumb="apiUrl + '/' + data.avatar"
      :large="apiUrl + '/' + data.avatar"
      class-name="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
    />
    <div class="pl-3 flex-fill">
      <p class="font-weight-medium mb-0">{{data.name + ' ' + data.surname}}</p>
      <p class="text-muted mb-0 text-small">{{data.role}}</p>
    </div>
    <div>
      <b-button v-if="!exist" variant="outline-primary" size="xs" @click="followUser">{{$t('pages.follow')}}</b-button>
    </div>
  </div>
</template>

<script>
import SingleLightbox from "../Pages/SingleLightbox";
export default {
  props: ["data"],
  components: {
    "single-lightbox": SingleLightbox
  },
  data: () => ({
    apiUrl: process.env.VUE_APP_API_URL,
    exist: false,
  }),
  methods: {
    followUser() {
      this.$Axios.post("/follow/" + this.data._id)
      .then(res => {
        this.$notify("success", "Follow", "Success", {
          duration: 3000,
          permanent: false
        });
        this.exist = true
      })
      .catch(e => {
        console.log(e)
      })
    },
    getfollows(){
      this.$Axios('/follows')
      .then(res => {
        let exist = res.data.filter(a => a._id == this.data._id)
        this.exist = exist;
      })
    }
  }
};
</script>
