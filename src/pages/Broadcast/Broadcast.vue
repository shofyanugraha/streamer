<template>
  <section class="setting">
    <div class="columns">
      <div class="column is-4-desktop">
        <!-- <template v-if="videoOptions">
          <video-player :options="videoOptions" />
        </template> -->
        <div>
          <div class="data-form">
            <label>Stream Host</label>
            <input type="text" v-model="stream_url" disabled>
            <button type="button"
              v-clipboard:copy="stream_url"
              v-clipboard:success="() => onCopy('Stream Host')"
              >Copy!</button>
          </div>
          <div class="data-form">
            <label>Stream Key</label>
            <input type="text" v-model="stream_key" disabled>
            <button type="button"
              v-clipboard:copy="stream_key"
              v-clipboard:success="() => onCopy('Stream Key')"
              >Copy!</button>
          </div>
        </div>
      </div>
      <div class="column is-8-desktop">
        <template v-id="chatRoomId">
          <chat-list :chat-room-id="chatRoomId"/>
          <chat-compose :chat-room-id="chatRoomId"/>
        </template>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';

import { ToastProgrammatic as Toast } from 'buefy';

// import VideoPlayer from '@/components/video/VideoPlayer.vue';
import ChatList from '@/components/chat/List.vue';
import ChatCompose from '@/components/chat/Compose.vue';

// service

import StreamAPI from '@/commons/api/streams';

export default {
  name: 'Setting',
  data() {
    return {
      stream_key: null,
      stream_id: null,
      stream_url: 'rtmp://global-live.mux.com:5222/app',
      isLoading: true,
      chatRoomId: null,
      videoOptions: null,
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
    // VideoPlayer,
    ChatList,
    ChatCompose,
  },
  methods: {
    onCopy(text) {
      Toast.open({ message: `Copied Stream ${text}`, position: 'is-bottom-right' });
    },
    async loadData() {
      await StreamAPI.get(this.$route.params.id).then(({ data }) => {
        this.isLoading = false;
        this.videoOptions = {
          autoplay: true,
          fluid: true,
          controls: true,
          sources: [
            {
              src: data.data.stream_url,
              type: 'application/x-mpegURL',
            },
          ],
        };
        this.stream_key = data.data.stream_key;
        this.stream_id = data.data.stream_id;
        this.chatRoomId = data.data.room_id;
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style lang="scss" scoped>
.setting{
  padding: 0;
  overflow: hidden;
  padding-bottom: 77px;
  @media screen and (min-width: $tablet){
    padding: 2rem 0;
  }
}

</style>
