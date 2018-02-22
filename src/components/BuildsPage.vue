<template>
  <div>
    <div id="search-bar">
      <md-field md-inline md-clearable>
        <md-icon>search</md-icon>
        <label>Search</label>
        <md-input v-model="search"></md-input>
      </md-field>
    </div>
    <BuildsTable :headings="headings"
                 :builds="searchedBuilds"></BuildsTable>
  </div>
</template>

<script>
import axios from 'axios'
import BuildsTable from '@/components/BuildsTable'
import BuildsTableRow from '@/components/BuildsTableRow'
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
      ],
      search: ''
    }
  },
  computed: {
    searchedBuilds: function () {
      let vm = this
      return vm.builds.filter(function(build) {
        return ((vm.searchBuilds(build, vm.search)))
      })
    }
  },
  methods: {
    async getLatestBuilds () {
      const response = await axios.get(process.env.API_BASE_URL + 'builds')
      this.builds = response.data
    },
    searchBuilds: function (build, searchString) {
      let buildString = build.name + ' ' + build.os + ' ' + build.status
      let split = searchString.toLowerCase().split(' ')
      let found = 0
      split.forEach(function(word) {
        if (buildString.toLowerCase().includes(word)) {
          found += 1
        }
      })
      if (found === split.length) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    BuildsTable, BuildsTableRow
  },
  mounted () {
    this.getLatestBuilds()
  }
}
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine"; // Import the theme engine

  @include md-register-theme("default", (
    primary: md-get-palette-color(white, A200), // The primary color of your application
    accent: md-get-palette-color(pink, 500), // The accent or secondary color
    theme: dark
  ));

  @import "~vue-material/dist/theme/all"; // Apply the theme

  @import "~styles/main.scss";

  #search-bar {
    height: 75px;
    width: 100%;
    background-color: $ford;
    color: white;
    padding-left: 100px;
    font-size: 0.4em;
  }

  .md-field {
    font-family: $family-sans-serif;
    width: 25vw;
    margin-bottom: 0px;
    color: white;
  }

  .md-input {
    color: white;
  }

  .md-button {
    color: white;
  }

  .md-field.md-theme-default > .md-icon::after {
    background-color: transparent;
  }

</style>
