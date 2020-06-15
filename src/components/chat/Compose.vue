<template>
  <div class="compose-message-holder">
    <div class="composer-message">
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
            @click="() => sendMessage()"
            :disabled="message.message === ''"
            type="is-primary"
            class="button-send"
            >
            <img src="@/assets/images/svg/send.svg" alt="">
        </b-button>
      </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from '@/commons/firebase';

export default {
  name: 'ChatCompose',
  data() {
    return {
      message: {
        message: '',
        type: 'message',
        user: '',
        sendDate: Date(),
      },
    };
  },
  props: {
    chatRoomId: {
      type: String,
      default: '-M9qng51pgSkDribW-Me',
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    sendMessage() {
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
};
</script>

<style lang="scss" scoped>
.compose-message-holder{
  background: #FFFFFF;
  box-shadow: 0px 10px 20px rgba(54, 147, 164, 0.2012);
  border-radius: 0;
  padding: 1em;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(54, 147, 164, 0.2012);
  @media screen and (min-width: $tablet){
    position: static;
    border-radius: 10px;
    width: auto;
  }
}
.composer-message{
  display: flex;
  flex-wrap: wrap;
  .composer-input{
    display: flex;
    max-width: 75%;
    flex: 75%;
    @media screen and (min-width: $tablet){
      max-width: 90%;
      flex: 90%;
    }
    &.composer-button{
      max-width: 25%;
      flex: 25%;
      @media screen and (min-width: $tablet){
        max-width: 10%;
        flex: 10%;
      }
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
