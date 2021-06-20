<template>
  <vue-perfect-scrollbar
    class="scroll"
    :settings="{ suppressScrollX: true, wheelPropagation: false }"
  >
    <div class="pt-0 spaced-content pb-0">
      <div
        class="d-flex flex-row mb-1 border-bottom pb-3"
        v-for="(user,index) in users"
        :key="`conversation${index}`"
      >
        <a class="d-flex" href="#" @click.prevent="selectConversation(user)">
          <img :alt="user.name + ' ' + user.surname" :src="apiUrl + '/' + user.avatar" class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall" />
          <div class="d-flex flex-grow-1 min-width-zero">
            <div
              class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
            >
              <div class="min-width-zero">
                <p class="mb-0 truncate">{{user.name + ' ' + user.surname}}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </vue-perfect-scrollbar>
</template>

<script>
export default {
  props: ['conversations', 'contacts', 'currentUser'],
  data: () =>({
     apiUrl: process.env.VUE_APP_API_URL,
     users:[],
  }),
  methods: {
    selectConversation (otherUser) {
      this.$emit('select-conversation', otherUser)
    },
    getUsers () {
      this.conversations.forEach(conv => {
         let otherUser
         if(conv.sender._id == this.currentUser.user._id){
            otherUser = conv.receiver
         } else {
           otherUser = conv.sender
         }
         if(!this.users.includes(otherUser)){
           this.users.push(otherUser)
         }
      });
    }
  },
  watch: {
    conversations(val){
      this.getUsers()
    }
  },
  computed: {},
  mounted () {
    if(this.users[0]) this.selectConversation(this.users[0])
  },
}
</script>
