<template>
  <div>
    <md-table v-model="latestBuilds" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import axios from 'axios'

  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }
    return items
  }

  export default {
    name: 'LatestBuilds',
    data () {
      return {
        latestBuilds: [],
        search: null,
        searched: []
      }
    },
    props: [
      'currentMoment'
    ],
    methods: {
      async getLatestBuilds () {
        const response = await axios.get(process.env.API_BASE_URL + 'builds')
        this.latestBuilds = response.data
      }
    },
    created () {
      this.getLatestBuilds()
      //this.searched = this.latestBuilds
    }
  }
</script>

<style lang="scss">

  .md-table {
    height: 85vh;
  }

  .table-icon {
    min-height: 27px;
    min-width: 27px;
    width: 27px;
  }

  .table-header > th {
    font-size: 22px;
  }

  .title {
    font-family: 'Ford Antenna Regular', sans-serif;
  }
</style>
