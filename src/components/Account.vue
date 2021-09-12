<template>
    <div>
        <topnav ref="top" ></topnav>
        <div class="channels">
            <div class="flexbox row-direction justify-between">
            <h1>{{$t('my_channels')}}</h1>
            <el-button type="primary" class="new_channel_button" @click="channelFormVisible=true">{{$t('new_channel')}}</el-button>
            </div>
            <p v-if="no_channel_error">{{$t('no_channel_error')}}</p>
            <channel v-for="(channel, index) in user_channels" :key="index" class="text item" :info="channel"/>           
        </div>
        <el-dialog :visible.sync="channelFormVisible">
            <channel_form @formInvisable="updateChannelList()" />
        </el-dialog>
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TopNav from '@/components/TopNav'
import Channel from '@/components/Channel'
import ChannelForm from './ChannelForm.vue'
export default {
    name: 'account',
    computed: {
        ...mapGetters([
        'username',
        'token'
        ])
    },
    components:{
        topnav : TopNav,
        channel : Channel,
        channel_form: ChannelForm,
    },
    data(){
        return {
            channelFormVisible:false,
            user_channels: [],
            no_channel_error :false,
        }
    },
    methods:{
        ...mapActions([
            'handleRequest',
        ]),
        getData(){
            this.$refs.top.getData();
            this.getChannels();
        },
        async getChannels(){
            this.handleRequest({
            name:'channel/channel-list/',
            action:'getAll',
            }).then((res)=>{
                this.user_channels=res.channels
                if(this.user_channels.length ==0){
                    this.no_channel_error = true
                }else{
                    this.no_channel_error = false
                }
            }).catch((res)=>{
                
                console.log(res)
            }) 
        },
        updateChannelList(){
            this.channelFormVisible=false;
            this.getChannels();
        }

    },

    mounted () {
        this.getData()
    },

}
</script>