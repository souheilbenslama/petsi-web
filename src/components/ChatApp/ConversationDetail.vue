<template>
  <div>
    <div class="d-flex flex-row chat-heading">
      <div class="d-flex">
        <img
          :alt="otherUser.name + ' ' + otherUser.surname" :src="apiUrl + '/' + otherUser.avatar"
          class="img-thumbnail border-0 rounded-circle ml-0 mr-4 list-thumbnail align-self-center small"
        />
      </div>
      <div class="d-flex min-width-zero">
        <div
          class="card-body pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
        >
          <div class="min-width-zero">
            <div>
              <p class="list-item-heading mb-1 truncate">
                {{ otherUser.name + ' ' + otherUser.surname }}
              </p>
            </div>
            <p class="mb-0 text-muted text-small">{{ otherUser.date }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="separator mb-5" />
    <vue-perfect-scrollbar
      class="scroll"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      ref="chatArea"
    >
      <div v-for="(message, index) in messages" :key="`message${index}`">
        <b-card
          no-body
          :class="{
            'd-inline-block mb-3': true,
            'float-left': message.sender === otherUser._id,
            'float-right': message.sender === currentUser.user._id
          }"
        > 
          <div class="position-absolute pt-1 pr-2 r-0">
            <span class="text-extra-small text-muted">{{  moment(message.createdAt).format('DD/MM/YYYY HH:mm')}}</span>
          </div>
          <b-card-body>
            <div
              class="d-flex flex-row pb-1"
              v-if="message.sender === currentUser.user._id"
            > 
              <img
                :alt="currentUser.user.name + ' ' + currentUser.user.surname"
                :src="apiUrl + '/' + currentUser.img"
                class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
              />
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <p class="mb-0 truncate list-item-heading">
                      {{ currentUser.user.name + ' ' + currentUser.user.surname }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row pb-1" v-else>
              <img
                :alt="otherUser.name + ' ' + otherUser.surname" :src="apiUrl + '/' + otherUser.avatar"
                class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
              />
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <p class="mb-0 truncate list-item-heading">
                      {{ otherUser.name + ' ' + otherUser.surname }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-text-left">
              <p class="mb-0 text-semi-muted">{{ message.message }}</p>
            </div>
          </b-card-body>
        </b-card>
        <div class="clearfix" />
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: ["currentUser", "otherUser","messages"],
  data: () => ({
    apiUrl: process.env.VUE_APP_API_URL,
  }),
  methods: {
    moment,
    scrollToEnd() {
      setTimeout(() => {
        const container = this.$refs.chatArea.$el;
        container.scrollTop = container.scrollHeight;
      }, 0);
    },
  },
  mounted() {
    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  }
};
</script>
