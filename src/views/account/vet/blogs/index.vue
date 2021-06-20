<template>
<div>
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('Follow requests')" />
            <div class="separator mb-5"></div>
        </b-colxx>
        <b-row v-if="friends.length > 0">
            <b-colxx v-for="(follower,followerIndex) in friends" xxs="12" md="6" lg="4" :key="`follower_${followerIndex}`">
                <user-card-basic-req @changed="getRequests" :data="follower" />
            </b-colxx>
        </b-row>
              
    </b-row>
</div>
</template>

<script>
import {
    blogData
} from "../../../../data/blog";

import UserCardBasicReq from "../../../../components/Cards/UserCardBasicReq";

export default {
    components: {
        UserCardBasicReq
    },
    data() {
        return {
            blogData,
            currentPage: 1,
            friends: [],
        };
    },
    methods: {
        getRequests() {
            this.$Axios.get('/requests')
            .then(res => {
                this.friends = res.data
            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    mounted() {
        this.getRequests()
    }
};
</script>
