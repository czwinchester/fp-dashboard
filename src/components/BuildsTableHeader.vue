<template>
  <thead id="builds-table-header">
    <tr>
      <th v-for="heading in headings">{{heading}}</th>
    </tr>
  </thead>
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

<style>
  th {
    font-size: 1.3em;
    padding: 2rem 2rem;
    font-family: "Ford Antenna Condensed", sans-serif;
  }
</style>
