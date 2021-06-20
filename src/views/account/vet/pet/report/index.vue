<template>
  <div>
    <b-card>
      <b-card-header class="mb-1 font-weight-bold text-primary">
        <h3>{{ $t("Report") }}</h3>
      </b-card-header>
      <b-form-textarea
      v-if="onEdit"
      
      class="mb-5"
      v-model="text"
      rows="8"
    ></b-form-textarea>

    <pre v-if="!onEdit" class="mt-3 mb-5">{{ text }}</pre>
    <b-button v-if="!onEdit && dossier.status=='open'" @click="changeEdit(true)">Edit</b-button>
    <b-button v-if="onEdit && dossier.status=='open'" @click="updateReport">Submit</b-button>
    <b-button-close v-if="onEdit && dossier.status=='open'" @click="changeEdit(false)">Cancel</b-button-close>
    </b-card>
  </div>
</template>
<script>
import VuetablePaginationBootstrap from "@/components/Common/VuetablePaginationBootstrap";
import datetime from 'vuejs-datetimepicker';
import moment from 'moment'

export default {
  props:['dossier'],
  components: {
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    datetime,
  },
  data() {
    return {
      onEdit: false,
      text: '',
      lastText: ''
    };
  },
  mounted(){
    this.lastText = this.dossier.rapport ? this.dossier.rapport : ''
    this.text = this.lastText
  },
  methods: {
    moment,
    changeEdit(edit){
      if(this.dossier.status == 'open') {
        if(edit == false) {
        this.lastText = this.text
      }
      this.onEdit = edit        
      }
      
    },
    updateReport() {
            this.$Axios.put('/addRapport/' + this.dossier._id, {rapport : this.text} )
            .then(res =>  {
              this.$notify("success", "Report", "Report updated", {
                duration: 3000,
                permanent: false
              });
              console.log(res.data)
              this.changeEdit(false)
            })
            .catch(e => {
              this.$notify("error", "Report", "Folder closed", {
                duration: 3000,
                permanent: false
              });
            })
    }
  }
};
</script>
