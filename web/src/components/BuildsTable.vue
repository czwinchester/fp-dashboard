<!--suppress ALL -->
<template>
  <div id="builds-table">
    <div>
      <div class="builds-table-header-row columns">
        <span class="builds-table-header column is-2" v-for="heading in headings"><b>{{heading}}</b></span>
      </div>
      <BuildsTableRow :headings="headings" :build="build" v-for="build in sortedBuilds"></BuildsTableRow>
    </div>
  </div>
</template>

<script>
import BuildsTableHeader from '@/components/BuildsTableHeader'
import BuildsTableRow from '@/components/BuildsTableRow'
import moment from 'moment'
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
      let vm = this
      let noBuild = vm.builds.filter(build => {
        return build.status === 'No build'
      })
      let delayed = vm.builds.filter(build => {
        return build.status === 'Delayed'
      })
      let onTime = vm.builds.filter(build => {
        return build.status === 'On time'
      })
      let buildCategories = [noBuild, delayed, onTime]
      buildCategories.forEach(category => {
        category = category.sort((a, b) => {
          if (a.release_time < b.release_time) {
            return -1
          } else if (a.release_time > b.release_time) {
            return 1
          }
          return 0
        })
      })
      return noBuild.concat(delayed).concat(onTime)
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
