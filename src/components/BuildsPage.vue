<template>
  <div>
    <BuildsTable :headings="headings" :builds="builds"></BuildsTable>
  </div>
</template>

<script>
import axios from 'axios'
import BuildsTable from '@/components/BuildsTable'
export default {
  name: 'Builds',
  data: () => {
    return {
      builds: [],
      headings: [
        'Application',
        'OS',
        'Build Name',
        'Region',
        'Status',
        'Release Time'
      ]
    }
  },
  methods: {
    async getLatestBuilds () {
      const response = await axios.get(process.env.API_BASE_URL + 'builds')
      //this.builds = this.$_.sortBy(response.data, 'status')
      this.builds = response.data
      // console.log(this.builds.sort((a, b) => {
      //   if ((a.status === 'No build' && b.status === 'On time') ||
      //     (a.status === 'Delayed' && b.status === 'On time') ||
      //     (a.status === 'No build' && b.status === 'Delayed')) {
      //     return -1
      //   } else if ((a.status === 'On time' && b.status === 'No build') ||
      //     (a.status === 'On time' && b.status === 'Delayed') ||
      //     (a.status === 'Delayed' && b.status === 'No build')) {
      //     return 1
      //   }
      //   return 0
      // }))
    }
  },
  components: {
    BuildsTable
  },
  mounted () {
    this.getLatestBuilds()
  }
}
</script>

<style lang="scss">
</style>
