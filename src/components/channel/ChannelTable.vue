<template>
  <div class="channel_table flexbox  column-direction align-center justify-center justify-between" v-loading="loading">
    <el-table :data="filteredFeeds" empty-text="no data" height="25rem">
        <el-table-column
        header-align="center"
        align="center"
        v-if="channel.field1"
        prop="field1"
        :label=channel.field1
        >
        </el-table-column>

        <el-table-column
        header-align="center"
        align="center"
        v-if = "channel.field2"
        prop="field2"
        :label=channel.field2
        >
        </el-table-column>

        <el-table-column
        header-align="center"
        align="center"
        v-if="channel.field3"
        prop="field3"
        :label=channel.field3
        >
        </el-table-column>

        <el-table-column       
        header-align="center"
        align="center"
        v-if="channel.field4"
        prop="field4"
        :label=channel.field4
        >
        </el-table-column>

        <el-table-column
        header-align="center"
        align="center"
        v-if="channel.field5"
        prop="field5"
        :label=channel.field5
        >
        </el-table-column>

        <el-table-column
        header-align="center"
        align="center"
        v-if="channel.field6"
        prop="field6"
        :label=channel.field6
        >
        </el-table-column>

        <el-table-column
        header-align="center"
        align="center"
        v-if="channel.field7"
        prop="field7"
        :label=channel.field7
        >
        </el-table-column>
        
        <el-table-column
        header-align="center"
        align="center"
        v-if="channel.field8"
        prop="field8"
        :label=channel.field8
        >
        </el-table-column>

        <el-table-column
        header-align="center"
        align="center"
        prop="created_at_date"
        :label="$t('date')"
        >
        </el-table-column>

        <el-table-column
        header-align="center"
        align="center"
        prop="created_at_time"
        :label="$t('hour')"
        >
        </el-table-column>

    </el-table>
    <div class="mt-2-rem">
        <el-pagination @current-change="getPageFeeds"
        :pager-count="5"
        :page-count="count"
        :current-page.sync="current_page"
        layout="prev, pager, next">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment-jalaali'
export default {
    name: 'channel-table',
    data(){
        return {
            loading:false,
            feeds:[],
            filteredFeeds: [],
            count:0,
            current_page: 1,
        }
    },
    props:{
        channel:{}
    },
    methods:{
        ...mapActions([
            'handleRequest',
        ]), 

        deleteNullFieldsinFeeds(){
            for(var i = 0; i < this.feeds.length; i++){
                var feed = this.feeds[i]
                var filteredFeed = {}
                filteredFeed['created_at_date'] = this.convertToPersianDate(feed['created_at'])
                filteredFeed['created_at_time'] = this.convertToTime(feed['created_at'])
                for(var j = 0; j < 8; j++){
                    var fieldName = 'field' + (j+1)
                    if (feed[fieldName] != null){
                        filteredFeed[fieldName] = feed[fieldName]
                    }else{
                        break 
                    }
                }
                this.filteredFeeds.push(filteredFeed)
            }
        },
        convertToPersianDate (num) {
            return moment(num).format('jYYYY/jM/jD')
        },
        convertToTime (num) {
            return moment(num).format('HH:mm:ss')
        },

        getPageFeeds(){
            this.loading=true
            this.filteredFeeds = []
            this.feeds = []
            this.handleRequest({                              
                name:`channel/${this.channel.channel_name}/get-page-feeds/${this.current_page}/`,
                action:'getAll',
            }).then((res)=>{
                this.count = res.count;
                this.feeds = res.feeds;
            }).catch((res)=>{
                this.$message({
                    type: 'warning',
                    message: this.$t('a_problem_try_again')
                })
            }).finally(()=>{
                this.deleteNullFieldsinFeeds()
                this.loading=false
            }) 
        },


    },

    mounted(){
        this.getPageFeeds(1)
        
    }

}
</script>