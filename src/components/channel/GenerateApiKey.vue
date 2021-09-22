<template>
  <div class="generate_api_key flexbox  column-direction align-center justify-center justify-between">
      <el-button type="primary" @click="generate_api_key">{{$t('generate_new_api_key')}}</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'generate_api_key',
    data(){
        return {
            api_key :'',
        }
    },
    props:{
        channel:{}
    },
    methods:{
        ...mapActions([
            'handleRequest',
        ]),
        generate_api_key(){
            this.handleRequest({                              
                name:`channel/${this.channel.channel_name}/create-api-key/`,
                action:'getAll',
            }).then((res)=>{
                this.api_key = res["api-key"]
                this.openMessageBox();
            }).catch((res)=>{
                console.log(res)
            })
        },
        openMessageBox() {
            var message = this.api_key
            this.$alert(message, this.$t('your_api_key'), {
            confirmButtonText: 'OK',

            });
        }
        
    },

}
</script>