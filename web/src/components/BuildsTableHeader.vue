<template>
  <span id="builds-table-header-row" class="columns">
    <span class="builds-table-header column is-2" v-for="heading in headings"><b>{{heading}}</b></span>
  </span>
</template>

<script>
export default {
  name: 'Builds',
  props: {
    headings: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/main.scss";
  .builds-table-header {
    font-size: 1.4em;
    padding-bottom: 0px;
    font-family: $family-sans-serif-cond;
    font-weight: 700;
    text-align: center;
    background-color: #f4f4f4;
  }
</style>
