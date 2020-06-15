<template>
  <div
      :class="{
        'has-text-right' : (chat.type==='message') && chat.user === user.name,
        'has-text-left' : (chat.type==='message') && chat.user !== user.name,
        'has-text-centered' : (chat.type==='join'||chat.type==='exit'),
      }"
      class="chat-item"
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
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ChatItem',
  props: {
    chat: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style lang="scss" scoped>

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
  color: invert($yellow, 100%);
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
</style>
