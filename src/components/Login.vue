<template>
<div class="flexbox full-height align-center justify-center form-background">
<el-card class="form flexbox justify-center">
  <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
    <el-form-item>
      <label>{{$t('username')}}</label>
      <el-input v-model="formLabelAlign.username"></el-input>
    </el-form-item>
    <el-form-item>
      <label>{{$t('password')}}</label>
      <el-input v-model="formLabelAlign.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="validate">{{ $t('login') }}</el-button>
    </el-form-item>
    <router-link to="signup">{{$t('signup')}}</router-link>
  </el-form>
</el-card>
</div>
</template>


<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'login',
  data(){
    return{
      labelPosition: 'top',
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  }
}
</script>



