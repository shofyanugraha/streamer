<template>
  <section class="player">
    <div class="columns is-multiline is-mobile">
      <div class="column is-7-desktop is-12-mobile">
        <video autoplay ref="videoPlayer" class="video-js"></video>
      </div>
      <div class="column is-5-desktop is-12-mobile">
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

import videojs from 'video.js';
import AssetsAPI from '@/commons/api/assets';
import ChatList from '@/components/chat/List.vue';
import ChatCompose from '@/components/chat/Compose.vue';

export default {
  name: 'Player',
  data() {
    return {
      videoOptions: null,
      isLoading: true,
      chatRoomId: null,
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
    }),
  },
  components: {
    ChatList, ChatCompose,
  },
  methods: {
    async fetchAssets() {
      await AssetsAPI.get(this.$route.params.id).then(({ data }) => {
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

        this.chatRoomId = data.data.room_id;

        this.player = videojs(this.$refs.videoPlayer, this.videoOptions, function onPlayerReady() {
          console.log('onPlayerReady', this);
        });
      });
    },
  },
  async mounted() {
    this.fetchAssets();
  },
};
</script>
<style lang="scss" scoped>
@import '~video.js/dist/video-js.css';
.player{
  padding: 0;
  overflow: hidden;
  @media screen and (min-width: $tablet){
    padding: 2rem 0;
  }
}
</style>
