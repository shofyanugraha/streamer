<template>
  <div class="course-card-grid">
    <router-link
      class="card"
      :to="{
        name: 'Player',
        params: {
          id: data && data.id !== undefined && data.id ? data.id : 1
        }
      }"
      slot="reference"
    >
      <div class="card-image">
        <figure class="image is-16by9">
          <img :src="imageUrl" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="meta-content">
          <div class="author">
            <div class="icon">
              <img svg-inline src="@/assets/images/svg/author.svg" />
            </div>
            <span>{{ data && data.name !== undefined ? data.name : 'name'  }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import API_URL from '@/commons/config';

export default {
  name: 'Card',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    imageUrl() {
      if (this.data && this.data.image !== undefined) {
        return API_URL + this.data.image.url;
      }
      return '/img/video/default.jpg';
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 8px;
  overflow: hidden;
  display: block;
  &:hover {
    box-shadow: 0 0 5px 0 rgba(58, 58, 58, 0.5);
  }
  .card-content {
    padding: 1rem;
  }
}
.title {
  margin-bottom: 0.7rem;
}
.author {
  font-size: 14px;
  color: $grey;
  > * {
    display: inline-block;
  }
  .icon {
    vertical-align: middle;
    margin-right: 0.5rem;
    width: 14px;
    svg {
      max-width: 100%;
      path {
        fill: $grey;
      }
    }
  }
}

</style>
