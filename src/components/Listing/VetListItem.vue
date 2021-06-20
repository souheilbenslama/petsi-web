<template>
<b-card :class="{'active' : true}" no-body>
    <div class="position-relative">
        <img :src="apiUrl + '/' + data.avatar" class="card-img-top card-img" :alt="data.title" />
        <b-badge pill v-if="data.gender == 'Male'" :variant="'secondary'" class="position-absolute badge-top-left">{{ data.gender }}</b-badge>
        <b-badge pill v-if="data.gender == 'Female'" :variant="'danger'" class="position-absolute badge-top-left">{{ data.gender }}</b-badge>
    </div>
    <b-card-body>
        <b-row>
            <b-colxx xxs="10" class="mb-3">
                <h5 class="mb-1 text-primary font-weight-bold"> Nom :</h5>
                <h6 class="mb-2 card-subtitle">{{data.name + ' ' + data.surname}}</h6>

                <h6 class="mb-1 text-primary font-weight-bold"> Email :</h6>
                <h6 class="mb-2 card-subtitle">{{data.email}}</h6>

                <h6 class="mb-1 text-primary font-weight-bold"> Phone :</h6>
                <h6 class="mb-2 card-subtitle">{{data.phone}}</h6>
            </b-colxx>
        </b-row>
        <b-row>
            <b-colxx xxs="10" class="mb-3">
                <div class="float-right">
                    <router-link :to='"/owner/vet/"+ data._id '>
                <b-button
                    variant="primary"
                    size="xs"
                    class="top-right-button"
                    >{{ $t("consult") }}</b-button>
                    </router-link>
                <b-button
                    :to='"/owner/chat/"+ data._id '
                    variant="secondary"
                    size="xs"
                    class="top-right-button"
                    >chat</b-button>
                </div>
            </b-colxx>
        </b-row>
    </b-card-body>
</b-card>
</template>

<script>
import moment from 'moment'

export default {
    props: ['data'],
    data: () => ({
      apiUrl: process.env.VUE_APP_API_URL,
    }),
    methods: {
        moment,
        convertMoment(value,format) {
            return this.moment(value).format(format)
        },
    }
}
</script>
