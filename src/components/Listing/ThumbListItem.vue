<template>
<b-card :class="{'d-flex flex-row':true,'active' : true}" style="height: 200px;" no-body>
        <img style="height: 200px;max-width: 200px;" :src="data.image" class="list-thumbnail responsive border-0" :alt="data.title" />
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
        <div class="card-body d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <dl class="row">
        <dt class="col-3 text-primary">Name :</dt>
        <dd class="col-3">
          {{data.name}}
        </dd>

        <dt class="col-3 text-primary">Owner name :</dt>
        <dd class="col-3">
          {{data.ownerName}}
        </dd>

        <dt class="col-3 text-primary">Adress :</dt>
        <dd class="col-3">
          {{data.adress}}
        </dd>

        <dt class="col-3 text-primary">Birthday :</dt>
        <dd class="col-3">
          {{moment(data.birthday).format('DD/MM/YYYY')}}
        </dd>

        <dt class="col-3 text-primary">Type :</dt>
        <dd class="col-3">
          {{data.petType}}
        </dd>

        <dt class="col-3 text-primary">Buyers :</dt>
        <dd class="col-3">
          {{data.buyers.length}}
        </dd>

        <dd class="col-12">
            <router-link :to='"/owner/market/"+ data.petId +"/offer/" + data.id'>
                <b-button variant="primary" size="sm">Consult</b-button>
            </router-link>
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
    methods: {
        moment,
    }
}
</script>
