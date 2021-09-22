<template>
<el-menu 
class="topnav" 
mode="horizontal" 
@select="handleSelect" 
background-color="rgb(98, 169, 242)"
text-color="white">
  <el-submenu index="1">
    <template slot="title">{{username}}</template>
    <el-menu-item index="1-1">{{$t('logout')}}</el-menu-item>
  </el-submenu>
  <el-menu-item index="2" class="webname" @click="goToAccountpage">{{$t('iot_platform')}}</el-menu-item>

</el-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'token'
    ])
  },
  methods: {
    ...mapActions([
      'setUsername',
      'handleRequest',
    ]),
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if(key==="1-1"){
          this.handleLogout();
        }
    },

    handleLogout () {
      window.localStorage.removeItem('token')
      this.setUsername('')
      this.$router.push({ name: 'login' })
    },

    goToAccountpage(){
      this.$router.push({ name: 'account' }).catch(()=>{})
    },

    getData () {
      this.handleRequest({
        name: 'account/detail/',
        action: 'getAll'
      }).then((res) => {
        this.setUsername(res.username)
      }).catch(() => {
        window.localStorage.removeItem('token')
        this.$router.push({ name: 'login' })
      })
    },

  },

  mounted(){
    if(this.token){
      if(!this.username) {
        this.getData(); 
      }                
    }else{
      this.$router.push({ name: 'login' })
    }
  }

}
</script>
