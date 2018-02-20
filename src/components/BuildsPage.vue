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
      this.builds = response.data
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
