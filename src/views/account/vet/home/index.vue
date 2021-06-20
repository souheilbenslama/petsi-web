<template>
<b-row>
    <b-colxx xxs="12">
                <b-row>
                    <b-colxx xxs="12" lg="5" xl="4" class="col-left">
                        <b-card class="mb-4" no-body>
                            <b-card-body>
                                <b-card-title>{{$t('pages.who-to-follow')}}</b-card-title>
                                <div class="remove-last-border remove-last-margin remove-last-padding">
                                    <user-follow v-for="(friend, fIndex) in followers" :data="friend" :key="`frind_${fIndex}`" />
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-colxx>
                    <b-colxx xxs="12" lg="7" xl="8" class="col-right">
                        <post v-for="(post,postIndex) in posts" :data="post" :key="`post_${postIndex}`" class="mb-4" />
                    </b-colxx>
                </b-row>
    </b-colxx>
</b-row>
</template>

<script>
import SingleLightbox from "../../../../components/Pages/SingleLightbox";
import GalleryDetail from "../../../../components/Pages/GalleryDetail"
import GalleryProfile from "../../../../components/Pages/GalleryProfile"
import UserFollow from "../../../../components/Cards/UserFollow";
import RecentPost from "../../../../components/Common/RecentPost";
import UserCardBasic from "../../../../components/Cards/UserCardBasic";
import Post from "../../../../components/Cards/Post";

import produtcs from "../../../../data/products";
import recentPosts from "../../../../data/recentPosts";
import followers from "../../../../data/follow";
import posts from "../../../../data/posts";
export default {
    components: {
        "single-lightbox": SingleLightbox,
        "gallery-detail": GalleryDetail,
        "gallery-profile": GalleryProfile,
        "user-follow": UserFollow,
        "recent-post": RecentPost,
        "user-card-basic": UserCardBasic,
        "post": Post
    },
    data() {
        return {
            produtcs: produtcs.slice(0, 15),
            recentPosts,
            followers: followers.slice(0, 5),
            friends: followers.slice(0),
            posts
        };
    },
    methods: {},
    mounted() {}
};
</script>
