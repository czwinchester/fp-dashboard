<template>
  <div id="builds-table">
    <BuildsTableHeader :headings="headings"></BuildsTableHeader>
    <BuildsTableRow :headings="headings" :build="build" v-for="build in builds"></BuildsTableRow>
  </div>
</template>

<script>
import BuildsTableHeader from '@/components/BuildsTableHeader'
import BuildsTableRow from '@/components/BuildsTableRow'
export default {
  name: 'BuildsTable',
  props: {
    builds: {
      type: Array,
      required: true
    },
    headings: {
      type: Array,
      required: true
    }
  },
  components: {
    BuildsTableHeader,
    BuildsTableRow
  }
}
</script>

<style lang="scss" scoped>
  table {
    // margin-top: 20px;
    width: 100%;
  }

</style>
