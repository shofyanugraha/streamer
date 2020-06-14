<template>
  <validation-provider v-slot="{ errors }" :rules="rules" tag="div" :vid="vid" :name="title">
    <div class="input-group" :class="{ active: active }">
      <slot name="label_left"></slot>
      <span class="input">
        <label :for="vid">{{ title }}</label>
        <b-input
          :expanded="true"
          @focus="active = true"
          @blur="blur"
          v-model="dValue"
          :type="type"
          :placeholder="placeholder"
          :id="vid"
        />
      </span>
    </div>
    <div v-if="errors.length" class="errors has-text-danger">
      <ul>
        <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
      </ul>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'Input',
  props: ['title', 'placeholder', 'value', 'options', 'type', 'notes', 'rules', 'vid'],
  components: { ValidationProvider },
  data() {
    return {
      dValue: this.value,
      active: false,
    };
  },
  watch: {
    dValue(val) {
      if (this.type === 'checkbox') {
        if (val) {
          this.$emit('input', 1);
        } else {
          this.$emit('input', 0);
        }
      } else {
        this.$emit('input', val);
      }
    },
  },

  methods: {
    blur() {
      if (!this.value) {
        this.active = false;
      }
    },
  },
  mounted() {
    if (this.type === 'checkbox') {
      if (this.dValue === 0) {
        this.dValue = false;
      } else {
        this.dValue = true;
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@keyframes anim-1 {
  50% {
    opacity: 0;
    -webkit-transform: translate3d(1rem, 0, 0);
    transform: translate3d(1rem, 0, 0);
  }

  51% {
    opacity: 0;
    -webkit-transform: translate3d(-1rem, -100%, 0);
    transform: translate3d(-1rem, -100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

input,
.input {
  border: none;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border-radius: 0;
  font-size: 16px;
  padding: 0;
  padding-left: 0.2rem;
  &:active {
    border-color: transparent;
    outline: transparent;
  }
  &:focus, &:focus-within {
    border-color: transparent;
    box-shadow: none;
    outline: none;
  }
  &[type="password"] {
    font-size: 16px !important;
  }
}

input[type="password"] {
  -webkit-text-security: disc !important;
  font-size: 1rem;
  letter-spacing: 0rem;
}

.input-group {
  position: relative;
  padding-bottom: 1rem;
  padding-top: 1rem;
  text-align: left;
  display: flex;
  background: #fff;
  &.active {
    transition: 0.3s;
    label {
      font-size: 14px;
      animation: anim-1 0.3s forwards;
    }
  }

  label {
    position: absolute;

    text-transform: uppercase;
    left: 0.8rem;
    color: #9b9b9b;
    z-index: 9;
    cursor: text;
  }

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 10px);
    border-bottom: 1px solid #9b9b9b;
  }
  &::after {
    border-bottom: 2px solid $blue;
    width: 0px;
    transition: 0.3s;
  }

  &:focus-within,
  &.active {
    &::after {
      width: 100%;
    }
  }
}

.is-expanded {
  width: 100%;
}
::v-deep {
  .input,
  .taginput .taginput-container.is-focusable,
  .textarea {
    box-shadow: none;
    border: none;
    z-index: 3;
    &:focus {
      box-shadow: none;
    }
  }
  .input-group-label {
    border: 0px;
    padding: 0px 5px;
    background: none;
    display: inline-flex;
    align-items: center;
    img {
      min-height: 16px;
    }
  }
}
.errors {
  font-size: 12px;
}
</style>
