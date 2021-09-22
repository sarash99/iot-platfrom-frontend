<template>
<div class="flexbox full-height align-center justify-center form-background">

  <el-form :label-position="labelPosition" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
    <el-form-item prop="channel_name">
      <label>{{$t('channel_name')}}</label>
      <el-input v-model="ruleForm.channel_name"></el-input>
    </el-form-item>
    <el-form-item>
      <label>{{$t('num_of_fields')}}</label>
      <el-input-number v-model="ruleForm.num_of_fields" :min="1" :max="8"></el-input-number>
    </el-form-item>

    <div v-for="i in ruleForm.num_of_fields" :key="i" class="text item">
        <el-form-item 
            :prop="'fields.'+(i-1)"
            :rules="fieldRule"
        >
            <label>{{$t('field')}} {{i}}</label>
            <el-input v-model="ruleForm.fields[i-1]"></el-input>      
        </el-form-item>
    </div> 


    <el-form-item class="mt-2-rem flexbox justify-center">
      <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('confirm') }}</el-button>
    </el-form-item>
  </el-form>

</div>
</template>


<script>
import {mapActions,mapGetters} from 'vuex'
import { passwordLength, latinPassword, passwordNumber, persianPassword, correctPassword } from '@/utils/patterns'
export default {
  name: 'channel-form',
  data(){
    
    var validateField= (rule, value, callback) => {
        console.log(value)
        if(!value){
            callback(new Error(this.$i18n.t('blank_field_error')));
        }
        callback()
      
    }
    var validateFields = (rule, value, callback) => {

      for (let i=0; i< this.ruleForm.num_of_fields; i++){
          console.log(i)
        if(!value[i]){
            callback(new Error(this.$i18n.t('invalid_email_error')));
        } 
      }
      callback()
      
    }

    return{

      labelPosition: 'top',
      blank_message:  this.$t('blank_field_error'),

      ruleForm: {
        channel_name: '',
        num_of_fields: 1,
        fields:[]
      },
      rules: {
        channel_name:[
          { required: true, message: this.$i18n.t('blank_channel_name_error'), trigger: 'blur' }
        ],
      },
      fieldRule:{ validator: validateField,message: this.$i18n.t('blank_field_error') ,trigger: 'blur' }
    }
  },

  methods:{
    ...mapActions([
      'handleRequest',
    ]),

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
      this.usernameError = false
      this.emailError = false
    },

    sendRequest:function(){
      this.clearErrors();
      let formData=new FormData();
      formData.append('channel_name',this.ruleForm.channel_name);
      for(let i=0;i<this.ruleForm.fields.length;i++){
        var field_name = 'field' + (i+1)
        formData.append(field_name,this.ruleForm.fields[i]);
      }
      
      this.handleRequest({
        name:'channel/create-channel/',
        action:'create',
        data:formData,
      }).then((res)=>{
        //router to dashboard 
        alert('created')    
        console.log(res) 
        this.$emit('formInvisable')

      }).catch((res)=>{
        alert('not created')    
        console.log(res)
        
      })
    },



  }
}
</script>



