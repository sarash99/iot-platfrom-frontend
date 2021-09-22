<template>
<div class="channel" @click="showChannel()">
    <el-card class="box-card">
    <p>{{channel_name}}</p>
    <div class="field_names">
        <p>{{$t('fields')}}:</p>
        <p v-for="(field,index) in fields" :key="field">{{field}}<span v-if="index != fields.length-1">{{$t('comma')}}</span></p>
    </div>
    </el-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'channel',
    props: {
        info: {}
    },
    data(){
        return {
            channel_name:'',
            fields : []
        }
    },
    methods:{
        ...mapActions([
            'setChannelName'
        ]),
        showChannel(){ 
            this.setChannelName(this.channel_name)
            this.$router.push({name:'channel-view', params: { channel_name: this.channel_name}})
        }
    },
    mounted(){
        this.channel_name = this.info.channel_name;
        if(this.info.field1){
            this.fields[0] = this.info.field1
        }
        if(this.info.field2){
            this.fields[1] = this.info.field2
        }
        if(this.info.field3){
            this.fields[2] = this.info.field3
        }
        if(this.info.field4){
            this.fields[3] = this.info.field4
        }
        if(this.info.field5){
            this.fields[4] = this.info.field5
        }
        if(this.info.field6){
           
           this.fields[5] = this.info.field6
        }
        if(this.info.field7){
            this.fields[6] = this.info.field7
        }
        if(this.info.field8){
            this.fields[7] = this.info.field8
        }
    }

}
</script>