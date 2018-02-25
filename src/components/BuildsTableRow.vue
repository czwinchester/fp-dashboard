<template>
  <div class="builds-table-row columns">
    <span class="icon-cell column is-2" v-if="build.name.includes('FordPass')">
      <img class="fp-icon" src="../assets/img/fp-icon-sm.svg">
    </span>
    <span class="icon-cell column is-2" v-else><img class="lw-icon" src="../assets/img/lw-icon-sm.svg"></span>
    <span class="column is-2" >
      <i class="fa fa-apple" v-if="build.os.includes('iOS')"></i>
      <i class="fa fa-android" v-else></i>
    </span>
    <span class="column is-2">{{build.name}}</span>
    <span class="column is-2">{{region}}</span>
    <span class="column is-2"><BuildsTableRowStatusBadge :status="build.status"></BuildsTableRowStatusBadge></span>
    <span class="column is-2 release-time" v-if="build.status === 'No build'">{{releaseTime}} ago</span>
    <span class="column is-2 release-time" v-else-if="build.status === 'On time'">-</span>
    <span class="column is-2 release-time" v-else>{{timeDelayed}}</span>
  </div>
</template>

<script>
import BuildsTableRowStatusBadge from '@/components/BuildsTableRowStatusBadge'
import moment from 'moment'
export default {
  name: 'BuildsTableRow',
  computed: {
    region: function () {
      let vm = this
      if (vm.build.name.includes('CN')) {
        return 'CN'
      } else if (vm.build.name.includes('NA')) {
        return 'NA'
      } else if (vm.build.name.includes('EU')) {
        return 'EU'
      } else if (vm.build.name.includes('SA')) {
        return 'SA'
      } else {
        return 'Unknown'
      }
    },
    releaseTime: function () {
      let vm = this
      let num
      let str
      if (vm.build.status === 'No build') {
        if (moment().startOf('day').diff(vm.build.releaseTime, 'month') === 0) {
          num = moment().startOf('day').diff(vm.build.release_time, 'days')
          if (num === 1) {
            str = 'Yesterday'
          } else {
            str = num + ' ' + vm.$i18n.tc('day', num.valueOf())
          }
        } else {
          num = moment().startOf('day').diff(vm.build.release_time, 'month')
          str = num + ' ' + vm.$i18n.tc('month', num.valueOf())
        }
      }
      return str
    },
    timeDelayed: function () {
      let vm = this
      // let hoursDelayed = moment(vm.build.release_time).diff(moment().startOf('day').add(9, 'hours'), 'hours')
      // let minsDelayed = moment(vm.build.release_time).diff(moment().startOf('day').add(9, 'hours'), 'minutes') - hoursDelayed * 60
      let hoursDelayed = moment(vm.build.release_time).diff(moment(vm.build.release_time).startOf('day').add(9, 'hours'), 'hours')
      let minsDelayed = moment(vm.build.release_time).diff(moment(vm.build.release_time).startOf('day').add(9, 'hours'), 'minutes') - hoursDelayed * 60
      let retStr = ''
      if (hoursDelayed > 0) {
        retStr += hoursDelayed.valueOf() + 'h'
      }
      if (minsDelayed > 0) {
        if (hoursDelayed > 0) {
          retStr += ' '
        }
        retStr += minsDelayed.valueOf() + 'm'
      }
      return retStr + ' late'
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
    width: 35px;
  }

  .fa-android {
    color: #a0be45;
  }

  i {
    font-size: 1.5em;
  }

  img.lw-icon {
    width: 14px;
  }

  div.builds-table-row {
    background-color: white;
    color: $primary-invert;
    font-family: $family-sans-serif-cond;
    font-size: 20px;
    min-height: 50px;
    display: table;
  }

  div.builds-table-row span {
    border-bottom: 2pt solid $grey;
    border-top: 2pt solid $grey;
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
