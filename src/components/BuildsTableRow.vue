<template>
  <tr class="builds-table-row">
    <td>{{build.name}}</td>
    <td>{{build.platform}}</td>
    <td>{{build.name}}</td>
    <td>{{build.region}}</td>
    <td><BuildsTableRowStatusBadge :status="build.status"></BuildsTableRowStatusBadge></td>
    <td>{{build.release_time}}</td>
  </tr>
</template>

<script>
import BuildsTableRowStatusBadge from '@/components/BuildsTableRowStatusBadge'
export default {
  name: 'BuildsTableRow',
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

<style lang="scss">
  @import '~styles/main.scss';

  tr.builds-table-row {
    background-color: $primary;
    color: $primary-invert;
    font-family: "Ford Antenna Condensed";
  }

  tr.builds-table-row td {
    border-bottom: 3pt solid #ffffff;
  }
</style>
