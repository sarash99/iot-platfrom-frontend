<template>
<div class="flexbox full-height align-center justify-center form-background">
<el-card class="form">
  <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
    <el-form-item>
      <label>{{$t('username')}}</label>
      <el-input v-model="formLabelAlign.username"></el-input>
    </el-form-item>
    <el-form-item>
      <label>{{$t('password')}}</label>
      <el-input v-model="formLabelAlign.password"></el-input>
    </el-form-item>
    <el-form-item class="mt-2-rem flexbox justify-center">
      <el-button type="primary" @click.prevent="validate">{{ $t('login') }}</el-button>
    </el-form-item>
    <router-link to="signup" class="mt-1-rem flexbox justify-center link">{{$t('signup')}}</router-link>
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



