<template>
  <validation-observer slim v-slot="{ invalid, handleSubmit }">
    <form class="generator" @submit.prevent="handleSubmit(generateChatRoom)">
        <input type="hidden" v-model="form.username" >
        <div class="button-holder">
        <b-button
            native-type="submit"
            :disabled="invalid"
            type="is-danger"
            rounded
            >Broadcast Now</b-button>
        </div>
    </form>
    </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import { mapState } from 'vuex';

import firebase from '@/commons/firebase';
import StreamAPI from '@/commons/api/streams';

export default {
  name: 'Generator',
  components: {
    ValidationObserver,
  },
  data() {
    return {
      form: {
        username: '',
        room_id: '',
      },
      result: {
        host: '',
        key: '',
        id: '',
      },
      isLoading: false,
      ref: firebase.database().ref('chatrooms/'),
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    async generateChatRoom() {
      this.isLoading = true;

      const newData = this.ref.push();
      await newData.set({
        roomName: this.form.username,
      });
      this.form.room_id = newData.key;

      await StreamAPI.post(this.form).then(({ data }) => {
        this.isLoading = false;
        this.result.key = data.data.stream_key;
        this.result.host = data.data.stream_host;
        this.result.id = data.data.stream_id;
      });

      this.isLoading = false;

      this.$router.push({
        name: 'Broadcast',
        params: {
          id: this.result.id,
        },
      });
    },
  },
  mounted() {
    this.form.username = this.user.name;
  },
};
</script>

<style>

</style>
