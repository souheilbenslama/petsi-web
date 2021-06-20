<template>
  <div class="d-flex flex-row mb-3 pb-3 border-bottom justify-content-between align-items-center">
    <single-lightbox
      :thumb="apiUrl + '/' + data.follower.avatar"
      :large="apiUrl + '/' + data.follower.avatar"
      class-name="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
    />
    <div class="pl-3 flex-fill">
      <router-link to="#">
        <p class="font-weight-medium mb-0">{{data.follower.name}}</p>
        <p class="text-muted mb-0 text-small">{{data.follower.status}}</p>
      </router-link>
    </div>
    <div>
      <b-button variant="outline-primary" size="xs" @click="declineFollow">{{$t('Unfollow')}}</b-button>
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
    apiUrl: process.env.VUE_APP_API_URL
  }),
  methods: {
    declineFollow() {
      if(!confirm('are you sure ?')) return
        this.$Axios.delete("/follow/" + this.data._id)
        .then(res => {
          console.log(res.data)
          this.$emit("changed",true)
        })
        .catch(e => console.log(e))
      }
  }
};
</script>
