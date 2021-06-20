<template>
<b-row class="justify-content-center">
                <b-colxx xxs="12" lg="7" xl="8" class="col-center">
                        <b-card class="mb-4" no-body>
                            <b-card-body>
                            <b-card-title>{{$t('Add post')}}</b-card-title>
                            <b-form-textarea
                                id="textarea"
                                v-model="text"
                                placeholder="Enter something..."
                                rows="3"
                                max-rows="6"
                                ></b-form-textarea>
                            <b-form-file
                            v-model="file"
                            placeholder="Choose an image or drop it here..."
                            drop-placeholder="Drop file here..."
                            ></b-form-file>
                            <b-button @click="addPost" class="primary m-2" size="small">Create</b-button>
                            </b-card-body>
                        </b-card>
                        <post @deleted="getPosts" v-for="(post,postIndex) in posts" :data="post" :key="`post_${postIndex}`" class="mb-4" />
                    </b-colxx>
</b-row>
</template>

<script>
import { mapGetters} from "vuex";

import SingleLightbox from "../../../../components/Pages/SingleLightbox";
import GalleryDetail from "../../../../components/Pages/GalleryDetail"
import GalleryProfile from "../../../../components/Pages/GalleryProfile"
import UserFollowUnf from "../../../../components/Cards/UserFollowUnf";
import RecentPost from "../../../../components/Common/RecentPost";
import Post from "../../../../components/Cards/Post";

import produtcs from "../../../../data/products";
import recentPosts from "../../../../data/recentPosts";
import followers from "../../../../data/follow";
export default {
    components: {
        "single-lightbox": SingleLightbox,
        "gallery-detail": GalleryDetail,
        "gallery-profile": GalleryProfile,
        "user-follow-unf": UserFollowUnf,
        "recent-post": RecentPost,
        "post": Post
    },
    data() {
        return {
            produtcs: produtcs.slice(0, 15),
            recentPosts,
            followers: followers.slice(0, 5),
            friends: [],
            apiUrl: process.env.VUE_APP_API_URL,
            text: null,
            file: null,
            posts: null,
        };
    },
    methods: {
        getFollowers() {
           this.$Axios.get('/followers')
           .then(res => {
               console.log(res.data)
               this.friends = res.data
           })
           .catch(e => console.log(e))
        },
        addPost(){
            if(!this.file && !this.text) {
                this.$notify("error", "Post", "Fill all fields", {
                    duration: 3000,
                    permanent: false
                    });
            } else {
                let formData = new FormData()
                    formData.append('desc', this.text)
                    formData.append('photo', this.file)

                console.log(formData);

                this.$Axios({
                    method: 'post',
                    url: '/post',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then(res => {
                    this.$notify("success", "Post", "Post added", {
                        duration: 3000,
                        permanent: false
                        });
                    this.getPosts()
                    this.file = null
                    this.text = null
                })
                .catch(e => {
                    console.log(e)
                })
            }
        },
        getPosts() {
            this.$Axios.get('/allPosts')
                .then(res => {
                    this.posts = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    computed: {
    ...mapGetters({
      currentUser: "currentUser",
    })
  },
    mounted() {
        this.getPosts()
        this.getFollowers()
    }
};
</script>
