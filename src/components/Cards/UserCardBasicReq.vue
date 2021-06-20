<template>
  <b-card no-body class="d-flex flex-row mb-4 cardStyle">
    <router-link :to=" '#'" class="d-flex">
      <ThumbnailImage rounded small :src="apiUrl + '/' + data.follower.avatar" alt="profile" class-name="m-4"/>
    </router-link>
    <div class=" ">
      <b-card-body
        class="">
        <div>
          <div class="row">
            <div class="col-8">
              {{data.follower.name + ' ' + data.follower.surname}}
              <div class="text-muted"> {{moment(data.created).fromNow()}} </div>
            </div>
            <div class="col-2">
              <b-button @click="acceptFollow" class="p-1" variant="success" size="sm"><i class="iconsminds-yes" /> </b-button>
            </div>
            <div class="col-2">
              <b-button @click="declineFollow" class="p-1" variant="danger" size="sm"><i class="iconsminds-close" /> </b-button>
            </div>
          </div>
        </div>
      </b-card-body>
    </div>
  </b-card>
</template>
<script>
    import ThumbnailImage from "./ThumbnailImage";
    import moment from 'moment'
    export default {
        props: [ 'data'],
        components: {
            ThumbnailImage
        },data: () => ({
    apiUrl: process.env.VUE_APP_API_URL,
  }),methods: {
      moment,
      acceptFollow() {
        this.$Axios.put("/confirmFollow/" + this.data._id)
        .then(res => {
          this.$emit("changed",true)
        })
        .catch(e => console.log(e))
      },
      declineFollow() {
        if(!confirm('are you sure ?')) return
        this.$Axios.delete("/follow/" + this.data._id)
        .then(res => {
          this.$emit("changed",true)
        })
        .catch(e => console.log(e))
      }
      
    }
    }
</script>
<style lang="scss" scoped>
.cardStyle {
  width: 350px;
}
</style>
