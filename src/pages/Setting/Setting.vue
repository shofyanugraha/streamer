<template>
  <section class="setting">
    <div class="columns">
      <div class="column is-4-desktop">
        <validation-observer slim v-slot="{ invalid, handleSubmit }">
          <form class="generator" @submit.prevent="handleSubmit(doSubmit)">
            <input type="hidden" v-model="form.username" >
            <div class="button-holder">
              <b-button
                native-type="submit"
                :disabled="invalid"
                type="is-warning"
                rounded
                >Generate Code</b-button>
            </div>
          </form>
        </validation-observer>
        <div>
          <div class="data-form">
            <label>Stream Host</label>
            <input type="text" v-model="streamHost" disabled>
            <button type="button"
              v-clipboard:copy="streamHost"
              v-clipboard:success="() => onCopy('test')"
              >Copy!</button>
          </div>
          <div class="data-form">
            <label>Stream Key</label>
            <input type="text" v-model="streamKey" disabled>
            <button type="button"
              v-clipboard:copy="streamKey"
              v-clipboard:success="() => onCopy('test')"
              >Copy!</button>
          </div>
        </div>
      </div>
      <div class="column is-8-desktop">
        <div class="chat-box" v-chat-scroll>
          <div
            :class="{
              'has-text-right' : (chat.type==='message') && chat.user === user.name,
              'has-text-left' : chat.user !== user.name,
              'has-text-centered' : (chat.type==='join'||chat.type==='exit'),
            }"
            class="chat-item"
            v-for="chat in chats"
            :key="chat.key"
          >
            <div class="chat-status chat-center" v-if="chat.type==='join'||chat.type==='exit'">
              <div class="chat-date">{{chat.sendDate | moment('from') }}</div>
              <div class="chat-content-center">{{chat.message}}</div>
            </div>
            <div v-else>
              <div
                class="chat-bubble"
                :class="{
                'chat-self' : chat.user === user.name,
                'chat-other' : chat.user !== user.name
                }"
                >
                <div class="msg-name">{{ chat.user === user.name ? 'Me' : chat.user }}</div>
                <p text-wrap>{{chat.message}}</p>
                <div class="msg-date">{{chat.sendDate | moment('from')}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="compose-message-holder">
          <validation-observer slim v-slot="{ invalid, handleSubmit }">
            <form class="composer-message" @submit.prevent="handleSubmit(submitMessage)">
              <div class="composer-input">
                <TextareaAutosize
                  placeholder="Type here"
                  v-model="message.message"
                  class="composer-input-message"
                  rows="1"
                  :important="['height']"
                  :max-height="350"
                />
              </div>
              <div class="composer-input composer-button">
                <b-button
                  native-type="submit"
                  :disabled="invalid"
                  type="is-primary"
                  class="button-send"
                  >
                  <img src="@/assets/images/svg/send.svg" alt="">
                </b-button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';

import { ValidationObserver } from 'vee-validate';

import { ToastProgrammatic as Toast } from 'buefy';

import firebase from '@/commons/firebase';

// service
import StreamAPI from '@/commons/api/streams';

export default {
  name: 'Setting',
  data() {
    return {
      form: {
        username: '',
      },
      isLoading: false,
      streamHost: '',
      streamKey: '',
      streamId: null,
      chatRoomId: null,
      ref: firebase.database().ref('chatrooms/'),
      chats: [],
      message: {
        message: '',
        type: 'message',
        user: '',
        sendDate: Date(),
      },
    };
  },
  computed: {
    ...mapState({
      errors: (state) => {
        if (state.error.errors !== null && state.error.errors.length) {
          return [
            ...state.error.errors.map(({ messages }) => messages.map((item) => item)),
          ];
        }
        return state.error.errors;
      },
      user: (state) => state.auth.user,
    }),
  },
  components: {
    ValidationObserver,
  },
  methods: {
    async doSubmit() {
      this.isLoading = true;
      await StreamAPI.post(this.form).then(({ data }) => {
        this.isLoading = false;
        this.streamKey = data.data.stream_key;
        this.streamHost = data.data.stream_host;
        this.streamId = data.data.stream_id;
      });

      const newData = this.ref.push();
      await newData.set({
        roomName: this.streamId,
      });

      this.chatRoomId = newData.key;

      const joinData = firebase.database().ref(`chatrooms/${newData.key}/chats`).push();
      joinData.set({
        type: 'join',
        user: this.user.name,
        message: `${this.user.name} has joined this room.`,
        sendDate: Date(),
      });
      firebase.database().ref(`chatrooms/${newData.key}/chats`).on('value', (snapshot) => {
        this.chats = [];
        snapshot.forEach((doc) => {
          const item = doc.val();
          item.key = doc.key;
          this.chats.push(item);
        });
      });
    },
    onCopy(text) {
      Toast.open({ message: `Copied Stream ${text}`, position: 'is-bottom-right' });
    },
    submitMessage() {
      const newData = firebase.database().ref(`chatrooms/${this.chatRoomId}/chats`).push();
      newData.set({
        type: 'message',
        user: this.user.name,
        message: this.message.message,
        sendDate: Date(),
      });
      this.message.message = '';
    },
  },
  mounted() {
    this.form.username = this.user.name;
  },
};
</script>
<style lang="scss" scoped>
.setting{
  padding: 0;
  overflow: hidden;
  @media screen and (min-width: $tablet){
    padding: 2rem 0;
  }
}
.generator {
  margin-bottom: 2rem;
}
.compose-message-holder{
  background: #FFFFFF;
  box-shadow: 0px 10px 20px rgba(54, 147, 164, 0.2012);
  border-radius: 10px;
  padding: 1em;
}
.composer-message{
  display: flex;
  flex-wrap: wrap;
  .composer-input{
    display: flex;
    max-width: 90%;
    flex: 90%;

    &.composer-button{
      max-width: 10%;
      flex: 10%;
    }
    .composer-input-message, .button{
      flex-direction: column;
      height: 100%;
      width: 100%;
    }
    .composer-input-message{
      border-radius: 10px;
      border: 1px solid $green;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-right: none;
      padding: 1em 1.25em;
      height: auto !important;
      &:focus, &:focus-within {
        outline: none;
      }

    }
  }
}

.chat-box {
    height: 500px;
    width: 100%;
    overflow: scroll;
  }

.chat-status, .chat-bubble{
  font-size: 12px;
  color: #9B9B9B;
  background: #FFFFFF;
  box-shadow: 0px 10px 20px rgba(118, 176, 177, 0.404693);
  border-radius: $radius;
  padding: .5em .75em;
  margin-bottom: 1.5em;
  display:inline-block;
}

.chat-bubble{
  color: invert($yellow, 30%);
  background: $yellow;
  border-radius: $radius $radius $radius $radius/2;
  &.chat-self {
    background: $primary;
    color: #fff;
    border-radius: $radius $radius $radius/2 $radius;

  }
  .msg-name{
    font-weight: bold;
  }
  .msg-date{
    font-size: 10px;
  }

}
::v-deep{
  .errors{
    position: absolute;
    bottom: -1em;
  }
  .button-send {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>
