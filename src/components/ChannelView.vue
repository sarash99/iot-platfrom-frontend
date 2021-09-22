<template>
<div>
    <topnav ref="top"></topnav>
    <div class="channel-view flexbox column-direction align-center justify-center">
        <div class="channel_descriptions">
            <h2>{{channel.channel_name}}</h2>   
        </div>
        <div class="feeds_section flexbox align-center justify-center">
            <el-tabs type="border-card">
                <el-tab-pane :label="this.$t('table_view')">
                    <channel_table :channel="channel" :feeds="feeds" v-if="channel.channel_name"/>
                </el-tab-pane>
                <el-tab-pane :label="this.$t('chart_view')">
                    <channel_chart :channel="channel" :feeds="feeds" v-if="channel.channel_name"/>
                </el-tab-pane>
                <el-tab-pane :label="this.$t('api_key')">
                    <generate_api_key  :channel="channel"/>
                </el-tab-pane>                
            </el-tabs>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TopNav from '@/components/TopNav'
import ChannelTable from '@/components/channel/ChannelTable'
import GenerateApiKey from '@/components/channel/GenerateApiKey'
import ChannelChart from '@/components/channel/ChannelChart'
import test from '@/components/channel/Test'
export default {
    name: 'channel-view',
    data(){
        return {
            channel:{},
            feeds: [], 
        }
    },
    components:{
        topnav : TopNav,
        channel_table : ChannelTable,
        generate_api_key : GenerateApiKey,
        channel_chart : ChannelChart,
        test
    },

    computed: {
        ...mapGetters([
            'channel_name',
        ])
    },

    methods:{
        ...mapActions([
            'handleRequest',
        ]),
        async getChannelFeeds(){
            let ch_name = this.$route.params.channel_name || this.channel_name
            this.handleRequest({                              
                name:`channel/${ch_name}/view-channel/`,
                action:'getAll',
            }).then((res)=>{
                this.channel = res.channel;
                this.feeds = res.feeds;
            }).catch((res)=>{
                // console.log(res)
            }) 
        },
 
        getData(){
            this.$refs.top.getData();
            this.getChannelFeeds();
        },
        
    },
    mounted(){
        this.getData();
    }

}
</script>