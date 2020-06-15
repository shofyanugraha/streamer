<template>
  <div class="chat-box" v-chat-scroll>
    <chat-item v-for="chat in chats" :key="chat.key" :chat="chat" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import firebase from '@/commons/firebase';
import ChatItem from './Item.vue';

export default {
  name: 'ChatList',
  props: {
    chatRoomId: {
      type: String,
      default: '',
    },
  },
  components: {
    ChatItem,
  },
  data() {
    return {
      chats: [],
      ref: firebase.database().ref('chatrooms/'),
      isLoading: true,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  watch: {
    chatRoomId() {
      this.loadMessage();
    },
  },
  methods: {
    async loadMessage() {
      if (this.chatRoomId !== '') {
        const joinData = await firebase.database().ref(`chatrooms/${this.chatRoomId}/chats`).push();
        joinData.set({
          type: 'join',
          user: this.user.name,
          message: `${this.user.name} has joined this room.`,
          sendDate: Date(),
        });
        await firebase.database().ref(`chatrooms/${this.chatRoomId}/chats`).on('value', (snapshot) => {
          this.chats = [];
          snapshot.forEach((doc) => {
            const item = doc.val();
            item.key = doc.key;
            this.chats.push(item);
          });
        });
      }
    },
  },
  mounted() {
    this.loadMessage();
  },
};
</script>

<style lang="scss" scoped>
.chat-box {
  height: 500px;
  width: 100%;
  overflow-y: scroll;
}
</style>
