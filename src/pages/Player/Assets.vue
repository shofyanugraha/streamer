<template>
  <section class="player">
    <div class="columns is-multiline is-mobile">
      <div class="column is-7-desktop is-12-mobile">
        <video autoplay ref="videoPlayer" class="video-js"></video>
      </div>
      <div class="column is-5-desktop is-12-mobile">

      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';

import videojs from 'video.js';
import AssetsAPI from '@/commons/api/assets';
import firebase from '@/commons/firebase';

export default {
  name: 'Player',
  data() {
    return {
      videoOptions: null,
      isLoading: true,
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
        this.player = videojs(this.$refs.videoPlayer, this.videoOptions, function onPlayerReady() {
          console.log('onPlayerReady', this);
        });
      });
    },
  },
  async mounted() {
    this.fetchAssets();
    const vidId = this.$route.params.id;
    console.log(vidId);
    const test = await firebase.database().ref('/chatrooms').orderByChild('roomName').equalTo(vidId)
      .once('value');
    console.log(test);
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
