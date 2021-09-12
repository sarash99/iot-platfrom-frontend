<template>
<div>
    <topnav ref="top"></topnav>
    <div class="channel-view">
        <div class="channel_descriptions">
            <h2>{{channel.channel_name}}</h2>   
        </div>
        <div class="feeds">
            <!-- <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">{{$t('table_view')}}</el-menu-item>
                <el-menu-item index="2">{{$t('chart_view')}}</el-menu-item>
                <el-menu-item index="3">{{$t('api_key')}}</el-menu-item>
            </el-menu> -->
            <channel_table :channel="channel" :feeds="feeds" v-if="channel.channel_name"/>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TopNav from '@/components/TopNav'
import ChannelTable from '@/components/ChannelTable'
export default {
    name: 'channel-view',
    data(){
        return {
            channel:{},
            feeds: []
        }
    },
    components:{
        topnav : TopNav,
        channel_table : ChannelTable
    },
    methods:{
        ...mapActions([
            'handleRequest',
        ]),
        async getChannelFeeds(){
            let ch_name = this.$route.params.channel_name
            this.handleRequest({                              
                name:`channel/${ch_name}/view-channel/`,
                action:'getAll',
            }).then((res)=>{
                this.channel = res.channel;
                this.feeds = res.feeds;
                console.log(feeds)
            }).catch((res)=>{
                console.log(res)
            }) 
        },

        getData(){
            this.$refs.top.getData();
            this.getChannelFeeds();
        }
        
    },
    mounted(){
        this.getData();
    }

}
</script>