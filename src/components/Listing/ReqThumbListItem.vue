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

        <dd class="col-12">
                <b-button variant="success" size="sm" @click="acceptReq">Accept</b-button>
                <b-button variant="danger" size="sm" @click="declineReq">Decline</b-button>
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
        acceptReq(){
           this.$Axios.put('/dossier/'+this.data.id)
          .then(res => {
            this.$notify("success", "Request", "Vaccine accepted", {
              duration: 3000,
              permanent: false
            });
             this.$emit('refresh')
          })
          .catch(e => {
            this.$notify("error", "Request", "Erreur has occured", {
              duration: 3000,
              permanent: false
            });
          })
        },
        declineReq(){
          if(!confirm('are you sure ?')) return
          this.$Axios.delete('/dossier/'+this.data.id)
          .then(res => {
             this.$notify("success", "Request", "Vaccine declined", {
              duration: 3000,
              permanent: false
            });
            this.$emit('refresh')
          })
          .catch(e => {
            this.$notify("error", "Request", "Erreur has occured", {
              duration: 3000,
              permanent: false
            });
          })
        }
    }
}
</script>
