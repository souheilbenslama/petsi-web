<template>
<div :class="`d-flex flex-row mb-3 border-bottom justify-content-between ${className}`">
    <router-link to=" #">
        <img :src="apiUrl + '/' + data.commenter.avatar" alt="data.name" class="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
    </router-link>
    <div class="pl-3 flex-grow-1">
        <router-link to="#">
            <p class="font-weight-medium mb-0">{{data.commenter.name + ' ' + data.commenter.surname}}</p>
            <p class="text-muted mb-0 text-small">{{moment(data.createdAt).format('DD/MM/YYYY HH:mm:ss')}}</p>
        </router-link>
        <p class="mt-3">{{data.comment}}</p>
    </div>
</div>
</template>
<script>
import moment from 'moment'
export default {
    props: ["className","data"],
    data: () => ({
        apiUrl: process.env.VUE_APP_API_URL
    }),
    methods: {
        moment,
    }
};
</script>
