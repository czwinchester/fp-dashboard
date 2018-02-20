<template>
  <div class="builds-table-row columns">
    <span class="icon-cell column is-2" v-if="build.name.includes('FordPass')"><img class="fp-icon" src="../assets/img/fp-icon-sm.svg"></span>
    <span class="icon-cell column is-2" v-else><img class="lw-icon" src="../assets/img/lw-icon-sm.svg"></span>
    <span class="column is-2">{{build.os}}</span>
    <span class="column is-2">{{build.name}}</span>
    <span class="column is-2">{{computeRegion(build.name)}}</span>
    <span class="column is-2"><BuildsTableRowStatusBadge :status="build.status"></BuildsTableRowStatusBadge></span>
    <span class="column is-2">{{build.release_time}}</span>
  </div>
</template>

<script>
import BuildsTableRowStatusBadge from '@/components/BuildsTableRowStatusBadge'
export default {
  name: 'BuildsTableRow',
  methods: {
    computeRegion: (name) => {
      if (name.includes('CN')) {
        return 'CN'
      } else if (name.includes('NA')) {
        return 'NA'
      } else if (name.includes('EU')) {
        return 'EU'
      } else if (name.includes('SA')) {
        return 'SA'
      } else {
        return 'Unknown'
      }
    }
  },
  props: {
    build: {
      required: true,
      type: Object
    }
  },
  components: {
    BuildsTableRowStatusBadge
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/main.scss';

  img.fp-icon {
    width: 30px;
  }

  img.lw-icon {
    width: 12px;
  }

  div.builds-table-row {
    background-color: white;
    color: $primary-invert;
    font-family: "Ford Antenna Condensed";
    font-size: 20px;
    min-height: 50px;
    display: table;
  }

  div.builds-table-row span {
    border-bottom: 3pt solid $grey;
    border-top: 3pt solid $grey;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }

  span.column {
    //padding-top: 8px;
  }

  span.icon-cell {
    //padding-top: 5px;
  }

</style>
