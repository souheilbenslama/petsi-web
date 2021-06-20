<template>
<b-card :class="className" no-body>
    <b-card-body>
        <div class="d-flex flex-row mb-3">
                <img :src="apiUrl + '/' + data.user.avatar" alt="thumbnail" class="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
            <div class="pl-3">
                    <p class="font-weight-medium mb-0">{{data.user.name + ' ' + data.user.surname}}</p>
                    <p class="text-muted mb-0 text-small">{{moment(data.createdAt).fromNow()}}</p>
            </div>
            <div class="delete-btn ml-3" v-if="currentUser.user._id == data.user._id">
                <b-button @click="deletePost()" class="p-1" variant="danger" size="sm"><i class="iconsminds-close" /></b-button>
            </div>
        </div>
        <p>{{data.desc}}</p>
        <single-lightbox v-if="data.photo" :thumb="apiUrl + '/' + data.photo" :large="apiUrl + '/' + data.photo" class-name="img-fluid border-0 border-radius mb-3" />
        <div class="mb-3">
            <div class="post-icon mr-3 d-inline-block">
                <router-link to="#">
                    <i class="simple-icon-bubble mr-1"></i>
                </router-link>
                <span>{{comments.length}} {{$t('pages.comments-title')}}</span>
            </div>
        </div>

        <div class="mt-5 remove-last-border">
            <comment-with-likes v-for="(comment,commentIndex) in comments" :data="comment" :key="`comment_${commentIndex}`" />
        </div>
        <b-input-group class="comment-contaiener">
            <b-input v-model="comment" :placeholder="$t('pages.addComment')" />
            <template v-slot:append>
                <b-button @click="addComment" variant="primary">
                    <span class="d-inline-block">{{$t('pages.send')}}</span>
                    <i class="simple-icon-arrow-right ml-2"></i>
                </b-button>
            </template>
        </b-input-group>
    </b-card-body>
</b-card>
</template>

<script>
import { mapGetters} from "vuex";

import SingleLightbox from "../Pages/SingleLightbox";
import CommentWithLikes from "../Pages/CommentWithLikes";
import VideoPlayer from "../Common/VideoPlayer";
import moment from 'moment';
import { comments } from '../../data/comments';

export default {
    props: ["class-name", "data"],
    components: {
        "single-lightbox": SingleLightbox,
        "comment-with-likes": CommentWithLikes,
        "video-player": VideoPlayer
    },
    data: () => ({
        apiUrl: process.env.VUE_APP_API_URL,
        comments: [],
        comment: null,
    }),
    methods: {
        moment,
        deletePost() {
            if(!confirm('are you sure ?')) return
            this.$Axios.delete('/post/'+ this.data._id)
                .then(res => {
                    this.$emit('deleted',this.data._id)
                    this.$notify("success", "Post", "Post deleted", {
                        duration: 3000,
                        permanent: false
                        });
                })
                .catch(e => {
                    console.log(e)
                })
        },
        getComments() {
            this.$Axios.get('/post/'+ this.data._id+'/comment')
                .then(res => {
                     console.log(res.data)
                     this.comments = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        },
        addComment() {
            this.$Axios.post('/post/'+ this.data._id+'/comment',{comment: this.comment})
                .then(res => {
                    this.comment = null
                     this.getComments()
                     this.$notify("success", "Comment", "Comment added", {
                        duration: 3000,
                        permanent: false
                        });
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    computed: {
    ...mapGetters({
      currentUser: "currentUser",
    }),
  },
  mounted() {
        this.getComments()
    }
};
</script>