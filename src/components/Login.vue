<template>
<div class="flexbox full-height align-center justify-center form-background">
<el-card class="form flexbox justify-center">
  <el-form :label-position="labelPosition" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
    <p v-if="incorrect" class="error">{{$t('incorrect_pass_or_username_error')}}</p>
    <el-form-item prop="email">
      <label>{{$t('email')}}</label>
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <label>{{$t('password')}}</label>
      <el-input v-model="ruleForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item class="mt-2-rem flexbox justify-center">
      <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('login') }}</el-button>
    </el-form-item>
    <router-link class="mt-1-rem flexbox justify-center link" to="signup">{{ $t('signup') }}</router-link>
  </el-form>
</el-card>
</div>
</template>


<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  name: 'login',
  data(){
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
      incorrect: false,

      ruleForm: {
        email: '',
        password: '',
      },
      rules: {
        password:[
          { required: true, message: this.$i18n.t('blank_password_error'), trigger: 'blur'}
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'token'
    ])
  },

  methods:{
    ...mapActions([
      'handleRequest',
      'setToken',
      'setUsername',
    ]),

    clearErrors(){
      this.incorrect = false
    },

    isValidEmail:function(email)  {
      var emailTest=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return (emailTest).test(email)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendRequest();
        }else{
          return false;
        }
      });

    },

    clearErrors(){
      this.incorrect = false
    },

    sendRequest:function(){
      this.clearErrors();
      let formData=new FormData();
      formData.append('password',this.ruleForm.password);
      formData.append('email',this.ruleForm.email);
      this.handleRequest({
        name:'account/login/',
        action:'create',
        data:formData,
      }).then((res)=>{
        this.setToken(res.token); 
        this.$router.push({ name: 'account'});
      }).catch(()=>{
        this.incorrect=true;
      })     
    }, 



  }
}
</script>



