<template>
<el-menu 
class="topnav" 
mode="horizontal" 
@select="handleSelect" 
background-color="#A8CFF7"
text-color="black">
  <el-submenu index="1">
    <template slot="title">username</template>
    <el-menu-item index="1-1">item one</el-menu-item>
    <el-menu-item index="1-2">item two</el-menu-item>
  </el-submenu>
  <el-menu-item index="2" class="webname">webname</el-menu-item>

</el-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
//   data () {
//     return {
//       windowWidth: window.innerWidth
//     }
//   },
//   computed: {
//     ...mapGetters([
//       'username',
//       'checkUsername'
//     ])
//   },
//   methods: {
//     ...mapActions([
//       'setUsername',
//       'handleRequest',
//       'setFullscreen',
//       'setCheckUsername'
//     ]),
//     handleLogout () {
//       window.localStorage.removeItem('token')
//       this.setUsername('')
//       this.setFullscreen(true)
//       this.$router.push({ name: 'Dashboard', params: {showAlert: false} })
//     },
//     getData () {
//       this.setCheckUsername(false)
//       this.handleRequest({
//         name: 'users/valid/',
//         action: 'getAll'
//       }).then((res) => {
//         this.setUsername(res.username)
//         if (this.$route.name === 'Dashboard') {
//           this.$router.push({ name: 'Account' })
//         }
//       }).catch(() => {
//         if (this.$route.name !== 'Dashboard' && this.$route.name !== 'Advertisements' && this.$route.name !== 'View') {
//           this.$router.push({ name: 'Dashboard', params: {showAlert: false} })
//         }
//         window.localStorage.removeItem('token')
//       })
//       .finally(() => {
//         this.setFullscreen(false)
//         this.setCheckUsername(true)
//       })
//     },
//     getWidthOnResize () {
//       this.windowWidth = window.innerWidth
//     }
//   },
//   created () {
//     window.addEventListener('resize', this.getWidthOnResize)
//   },
//   destroyed () {
//     window.removeEventListener('resize', this.getWidthOnResize)
//   },
}
</script>
