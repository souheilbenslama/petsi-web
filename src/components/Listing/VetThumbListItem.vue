<template>
<b-card :class="{'d-flex flex-row':true,'active' : true}" style="height: 200px;" no-body>
        <img style="height: 200px;max-width: 200px;" :src="apiUrl + '/' + data.avatar" class="list-thumbnail responsive border-0" :alt="data.title" />
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
        <div class="card-body d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <dl class="row">
        <dt class="col-3 text-primary">Name :</dt>
        <dd class="col-3">
          {{data.name + ' ' + data.surname}}
        </dd>

        <dt class="col-3 text-primary">Email :</dt>
        <dd class="col-3">
          {{data.email}}
        </dd>

        <dt class="col-3 text-primary">Adress :</dt>
        <dd class="col-3">
          {{data.adress}}
        </dd>

        <dt class="col-3 text-primary">Birthday :</dt>
        <dd class="col-3">
          {{moment(data.birthday).format('DD/MM/YYYY')}}
        </dd>

        <dt class="col-3 text-primary">Phone :</dt>
        <dd class="col-3">
          {{data.phone}}
        </dd>

        <dd class="col-12">
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
        </dd>
        </dl>
            </div>
        </div>
    
</b-card>
</template>

<script>
import moment from 'moment'
export default {
    props: ['data', 'selectedItems'],
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
