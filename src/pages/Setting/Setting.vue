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
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';

import { ValidationObserver } from 'vee-validate';

import { ToastProgrammatic as Toast } from 'buefy';

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
        this.streamKey = data.data.streamKey;
        this.streamHost = data.data.streamHost;
      });
    },
    onCopy(text) {
      Toast.open(`Copied Stream ${text}`, { position: 'is-bottom-right' });
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
</style>
