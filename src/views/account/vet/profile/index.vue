<template>
<b-row>
    <b-colxx xxs="12">
        <piaf-breadcrumb />
        <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
            <b-tab :title="$t('pages.profile')">
                <b-row class="mt-5 pt-5">
                    <b-colxx xxs="12" lg="5" xl="4" class="col-left">
                        <single-lightbox :thumb="apiUrl + '/' + currentUser.img" :large="apiUrl + '/' + currentUser.img" class-name="img-thumbnail card-img social-profile-img" />
                        <b-card class="mb-4" no-body>
                            <b-card-body>
                                <div class="text-center pt-4">
                                    <p class="list-item-heading pt-2">{{currentUser.title}}</p>
                                </div>
                                <p class="text-muted text-small mb-2">{{$t('email')}}</p>
                                <p class="mb-3">{{currentUser.user.email}}</p>
                                <p class="text-muted text-small mb-2">{{$t('Birthday')}}</p>
                                <p class="mb-3">{{currentUser.user.birthday}}</p>
                                <p class="text-muted text-small mb-2">{{$t('pages.location')}}</p>
                                <p class="mb-3">{{currentUser.user.adress}}</p>
                                <p class="text-muted text-small mb-2">{{$t('pages.phone')}}</p>
                                <p class="mb-3">
                                    {{currentUser.user.phone}}
                                </p>

                            </b-card-body>
                        </b-card>
                    </b-colxx>
                    <b-colxx xxs="12" lg="7" xl="8" class="col-right">
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
            </b-tab>

            <b-tab :title="$t('pages.friends')">
                <b-row>
                    <b-colxx v-for="(follower,followerIndex) in friends" xxs="12" md="6" lg="4" :key="`follower_${followerIndex}`">
                        <user-follow-unf @changed="getFollowers" :data="follower" />
                    </b-colxx>
                </b-row>
            </b-tab>
        </b-tabs>
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
                this.$notify("error", "Post", "Fill aal fields", {
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
            this.$Axios.get('/post')
                .then(res => {
                    this.posts = res.data.reverse()
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
