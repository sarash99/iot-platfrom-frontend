<template>
    <div>
        <topnav></topnav>
        <div class="channels">
            <div class="flexbox row-direction justify-between">
            <h1>{{$t('my_channels')}}</h1>
            <el-button type="primary" class="new_channel_button" plain @click="channelFormVisible=true">more ch</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                <channel/>
            </div>            
        </div>
        <el-dialog :visible.sync="channelFormVisible">
            <channel_form/>
        </el-dialog>
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TopNav from '@/components/TopNav'
import Channel from '@/components/Channel'
import ChannelForm from './ChannelForm.vue'
export default {
    name: 'login',
    components:{
        topnav : TopNav,
        channel : Channel,
        channel_form: ChannelForm,
    },
    data(){
        return {
            channelFormVisible:false,
        }
    }

}
</script>