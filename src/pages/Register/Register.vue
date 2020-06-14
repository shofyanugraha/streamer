<template>
  <section class="login">
    <div class="has-text-centered" style="margin-bottom: 2em">
    <figure class="logo">
      <img src="@/assets/images/logo/logo.svg" width='170'/>
    </figure>
    </div>
    <div class="card">
      <div class="card-content">
        <div class="title is-3">
          Register
        </div>
        <validation-observer slim v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(doSubmit)">
            <input-form
              v-model="form.name"
              title="Nama Anda"
              rules="required"
              type="text"
            >
              <span class="input-group-label" slot="label_left">
                <img svg-inline src="@/assets/images/svg/author.svg" />
              </span>
            </input-form>
            <div class="button-holder">
              <b-button
                native-type="submit"
                :disabled="invalid"
                type="is-warning"
                expanded
                rounded
                >Join</b-button>
            </div>
          </form>
        </validation-observer>
        <b-loading
          :is-full-page="isFullPage"
          :active.sync="isLoading"
          :can-cancel="true"
        ></b-loading>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import { ValidationObserver } from 'vee-validate';

import InputForm from '@/components/global/Input/Input.vue';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        // email: '',
        // password: '',
        // repassword: '',
      },
      isFullPage: true,
      isLoading: false,
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
    InputForm,
    ValidationObserver,
  },
  methods: {
    doSubmit() {
      this.isLoading = true;
      this.$store
        .dispatch('auth/login', this.form)
        .then(() => {
          this.$router.push({ name: 'Dashboard' });
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(10, 10, 10, 0.05);
  .card-content {
    padding: 2.5rem 3.5rem;
  }
}
.button-holder {
  margin-top: 1rem;
  ::v-deep {
    .button {
      font-weight: 500;
    }
  }
}

</style>
