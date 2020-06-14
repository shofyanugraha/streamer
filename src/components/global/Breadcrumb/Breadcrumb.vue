<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li>
        <a @click="$router.push('/dashboard')">Dashboard</a>
      </li>
      <template v-for="(item, key) in data">
        <li :key="key" :class="{ 'is-active': key === data.length - 1 }">
          <a v-if="key < data.length - 1" @click="$router.push(item.link)"
            >{{ item.title }}&nbsp;</a
          >
          <a href="#" aria-current="page" v-else>{{ item.title }}</a>
        </li>
      </template>
    </ul>
  </nav>
</template>
<script>
/**
 * Breadcrumb.
 * @displayName Breadcrumb
 */
export default {
  name: 'Breadcrumb',
  props: {
    /**
     * Props link for breadcrumb
     * @values [ { link: '#', title: 'title' } ]
     */
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
