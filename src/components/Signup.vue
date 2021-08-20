<template>
<div class="flexbox full-height align-center justify-center form-background">
<el-card class="form flexbox justify-center">
  <el-form :label-position="labelPosition" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
    <el-form-item prop="username">
      <label>{{$t('username')}}</label>
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <label>{{$t('email')}}</label>
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <label>{{$t('password')}}</label>
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item class="mt-2-rem flexbox justify-center">
      <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('confirm') }}</el-button>
    </el-form-item>
    <router-link class="mt-1-rem flexbox justify-center link" to="/">{{ $t('login') }}</router-link>
  </el-form>
</el-card>
</div>
</template>


<script>
import {mapActions,mapGetters} from 'vuex'
import { passwordLength, latinPassword, passwordNumber, persianPassword, correctPassword } from '@/utils/patterns'
export default {
  name: 'signup',
  data(){
    
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('blank_password_error')))
      } else if (!correctPassword.test(value) || persianPassword.test(value)) {

        if (passwordLength.test(value)) {

          callback(new Error(this.$i18n.t('wrong_password_length_error')))

        } if (latinPassword.test(value)) {

          callback(new Error(this.$i18n.t('wrong_password_all_char_error')))

        } if (passwordNumber.test(value)) {

          callback(new Error(this.$i18n.t('wrong_password_all_number_error')))

        } if (!persianPassword.test(value) && value.length) {

          callback(new Error(this.$i18n.t('wrong_password_latin_error')))
        }
      } else {
        callback()
      }
    }

    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$i18n.t('blank_email_error')));
      }
      else if (!this.isValidEmail(value)) {
        callback(new Error(this.$i18n.t('invalid_email_error')));
      }else{
        callback()
      }
    }

    return{

      labelPosition: 'top',
      usernameError: false,
      emailError: false,

      ruleForm: {
        username: '',
        password: '',
        email: ''
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        password:[
          { validator: checkPassword, trigger: 'blur' }
        ],
        username:[
          { required: true, message: this.$i18n.t('blank_username_error'), trigger: 'blur' }
        ]
      }
    }
  },

  methods:{
    ...mapActions([
      'handleRequest',
      'setToken',
      'setUsername',
    ]),

    isValidEmail:function(email)  {
      var emailTest=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return (emailTest).test(email)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.sendRequest();
        }else{
          return false;
        }
      });

    },

    clearErrors(){
      this.usernameError = false
      this.emailError = false
    },

    sendRequest:function(){
      this.clearErrors();
      let formData=new FormData();
      formData.append('email',this.ruleForm.email);
      formData.append('password',this.ruleForm.password);
      formData.append('username',this.ruleForm.username);
      this.handleRequest({
        name:'api/account/register/',
        action:'create',
        data:formData,
      }).then((res)=>{
        this.setTokens(res.token); 
        //router to dashboard      
      }).catch((res)=>{ 
        if(Object.prototype.hasOwnProperty.call(res,'username')){
          this.usernameError=true;
        }
        if(Object.prototype.hasOwnProperty.call(res,'email')){           
            this.emailError=true;            
        }
      })
    },



  }
}
</script>



