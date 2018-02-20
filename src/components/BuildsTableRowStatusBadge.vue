<template>
  <div class="badge" :style="computedStyle">
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
        case 'No build':
          style['background-color'] = '#d00c1b' // red
          break
        case 'On time':
          style['background-color'] = '#12b664' // green
          break
        case 'Delayed':
          style['background-color'] = '#e58b00' // orange
          break
        default:
          style['background-color'] = '#12b664'
      }
      // console.log(style)
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
  @import '~styles/main.scss';

  div.badge {
    color: $white;
    width: 150px;
    margin: 0 auto;
    border-radius: 4px;
  }

</style>
