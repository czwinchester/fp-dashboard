<!--suppress ALL -->
<template>
  <div id="builds-table">
    <div>
      <div class="builds-table-header-row columns">
        <span class="builds-table-header column is-2" v-for="heading in headings">{{heading}}</span>
      </div>
      <BuildsTableRow :headings="headings" :build="build" v-for="build in sortedBuilds"></BuildsTableRow>
    </div>
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
  },
  computed: {
    sortedBuilds: function () {
      return this.builds.sort((a, b) => {
        if ((a.status === 'No build' && b.status === 'On time') ||
          (a.status === 'Delayed' && b.status === 'On time') ||
          (a.status === 'No build' && b.status === 'Delayed')) {
          return -1
        }
        else if ((a.status === 'On time' && b.status === 'No build') ||
          (a.status === 'On time' && b.status === 'Delayed') ||
          (a.status === 'Delayed' && b.status === 'No build')) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/main.scss';
  table {
    // margin-top: 20px;
    width: 100%;
  }

  .builds-table-header {
    font-size: 1.4em;
    padding-top: 25px;
    padding-bottom: 0px;
    font-family: "Ford Antenna Condensed", sans-serif;
    text-align: center;
    background-color: #f4f4f4;
  }

</style>
