<template>
<div>
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.blog-detail')" />
            <div class="separator mb-5"></div>
        </b-colxx>
                    <b-colxx xxs="12" lg="12" xl="12" class="col-left">
                        <b-card class="mb-4" no-body>
                            <b-card-body>
                                <b-card-title>Research : {{$route.params.search}}</b-card-title>
                                <div class="remove-last-border remove-last-margin remove-last-padding">
                                    <user-follow v-for="(friend, fIndex) in followers" :data="friend" :key="`frind_${fIndex}`" />
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-colxx>
    </b-row>
</div>
</template>

<script>
import UserFollow from "../../../../components/Cards/UserFollow";

export default {
    components: {
        "user-follow": UserFollow,
    },
    data() {
        return {
            search: this.$route.params.search,
            users: [],
            follows: [],
        };
    },
    methods: {
        getUser() {
            
            this.$Axios
            .get('/getUsers')
            .then(res => {
                this.users = res.data
            })
            .catch(e => {
            })
        },
    },
    computed: {
       followers() {
           let ser = this.$route.params.search
           return this.users.filter(user => user.name.includes(ser) || user.surname.includes(ser))
       }
    },
    mounted() {
        this.getUser()
    }
};
</script>
