<template>
  <main class="dashboard">
    <div class="stream sc-content">
      <div class="title is-4">Streams</div>
      <template v-if="!streamLoading">
        <template v-if="streams.length > 0">
          <div class="columns is-multiline is-mobile">
              <div v-for="data in streams"
                class="column is-12-mobile is-4-tablet is-3-desktop is-3-fullhd"
                :key="data.id">
                <video-card :data="data"/>
              </div>
          </div>
        </template>
        <div v-else class="has-text-centered">
          No livestreaming right now
        </div>
      </template>
    </div>
    <div class="assets sc-content">
      <div class="title is-4">Assets</div>
      <template v-if="!assetLoading">
        <div v-if="assets.length > 0" class="columns is-multiline is-mobile" >
            <div v-for="data in assets"
              class="column is-6-mobile is-4-tablet is-3-desktop is-3-fullhd"
              :key="data.id" >
              <video-card :data="data" type="assets"/>
            </div>
        </div>
        <div v-else class="has-text-centered">
          No asssets right now
        </div>
      </template>
    </div>
  </main>
</template>
<script>
import { mapState } from 'vuex';

import VideoCard from '@/components/video/Card.vue';

// Services
import StreamAPI from '@/commons/api/streams';
import AssetAPI from '@/commons/api/assets';

export default {
  name: 'Dashboard',
  data() {
    return {
      streams: [],
      assets: [],
      streamLoading: true,
      assetLoading: true,
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
    VideoCard,
  },
  methods: {
    async fetchStreams() {
      await StreamAPI.query().then(({ data }) => {
        this.streamLoading = false;
        this.streams = data.data.lists;
      });
    },
    async fetchAssets() {
      await AssetAPI.query().then(({ data }) => {
        this.assetLoading = false;
        this.assets = data.data.lists;
      });
    },
  },
  mounted() {
    this.fetchAssets();
    this.fetchStreams();
  },
};
</script>
<style lang="scss" scoped>
.dashboard{
  padding: 2rem 2rem;
  overflow: hidden;
  @media screen and (min-width: $tablet){
    padding: 2rem 0;
  }
}
</style>
