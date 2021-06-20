<template>
<b-card :class="{'active' : true}" no-body>
    <div class="position-relative">
        <img :src="data.image" class="card-img-top card-img image" :alt="data.title" />
        <b-badge pill v-if="data.gender == 'Male'" :variant="'secondary'" class="position-absolute badge-top-left">{{ data.gender }}</b-badge>
        <b-badge pill v-if="data.gender == 'Female'" :variant="'danger'" class="position-absolute badge-top-left">{{ data.gender }}</b-badge>
    </div>
    <b-card-body>
        <b-row>
            <b-colxx xxs="10" class="mb-3">
                <h5 class="mb-1 text-primary font-weight-bold"> Nom :</h5>
                <h6 class="mb-4 card-subtitle">{{data.name}}</h6>

                <h6 class="mb-1 text-primary font-weight-bold"> Birthdate :</h6>
                <p class=" text-small mb-0 font-weight-light card-text">{{convertMoment(data.birthday,"DD-MM-YYYY")}}</p>
            </b-colxx>
        </b-row>
        <b-row>
            <b-colxx xxs="10" class="mb-3">
                <div class="float-right">
                    <router-link :to='"/owner/pet/"+ data.id +"/all"'>
                <b-button
                    variant="info"
                    size="xs"
                    class="top-right-button"
                    >{{ $t("Consult") }}</b-button>
                    </router-link>
                <b-button
                    variant="danger"
                    v-b-popover.hover.top="'Popover!'"
                    size="xs"
                    class="top-right-button"
                    @click="deletePet()"
                    >{{ $t("pages.delete") }}</b-button>
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
    methods: {
        moment,
        convertMoment(value,format) {
            return this.moment(value).format(format)
        },
        deletePet: function() {

            if(!confirm('are you sure ?')) return
            this.$Axios.delete('/pet/' + this.data.id)
            .then(res => {
                console.log(res.data)
                this.$router.go(0);
            })
            .catch(e => {
                console.log(e)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.card-img-top {
    height: 220px;
    object-fit: cover;
}
</style>
