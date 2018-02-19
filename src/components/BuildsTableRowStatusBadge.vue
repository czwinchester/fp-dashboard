<template>
  <div class = "badge badge-style" :style="computedStyle">
    {{status}}
  </div>
</template>

<script>
export default {
  name: 'BuildsTableRowStatusBadge',
  data: () => {
    return {
      onTimeColor: 'green'
    }
  },
  computed: {
    computedStyle: function () {
      let style = { 'background-color': '' }
      switch (this.status) {
        case 'no_build':
          style['background-color'] = '#d00c1b' // red
          break
        case 'ok':
          style['background-color'] = '#12b664' // green
          break
        case 'delayed':
          style['background-color'] = '#e58b00' // orange
          break
        default:
          style['background-color'] = '#12b664'
      }
      console.log(style)
      return style
    }
  },
  props: {
    status: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .badge {
    font-family: 'Ford Antenna Condensed', 'Helvetica' ;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    text-align: center;
    margin: 10px 5px 0px 3px;
    width: 85px;
    height: 20px;
    border-radius: 4px;
  }

</style>
