<template>
  <div >

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      getUserName: []
    }
  },
  computed: {
    ...mapGetters(['userName', 'ip', 'identify', 'online']),
  },
  mounted () {
    var vm = this
    this.bus.$off('getState')
    this.bus.$on('getState', () => {
      vm.getdata()
    })
  },
  methods: {
    getdata () {
      this.getUserName = this.userName
      this.senddata()
    },
    senddata () {
      this.bus.$emit('returnState', this.getUserName)
    }
  }

}
</script>
