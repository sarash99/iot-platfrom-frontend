<template>
  <div>
    <el-table :data="feeds" empty-text="no data">
        <el-table-column
        v-if="channel.field1"
        prop="field1"
        :label=channel.field1
        width="150">
        </el-table-column>
        <el-table-column
        v-if = "channel.field2"
        prop="field2"
        :label=channel.field2
        width="150">
        </el-table-column>
        <el-table-column
        v-if="channel.field3"
        prop="field3"
        :label=channel.field3
        width="150">
        </el-table-column>
        <el-table-column
        v-if="channel.field4"
        prop="field4"
        :label=channel.field4
        width="150">
        </el-table-column>
        <el-table-column
        v-if="channel.field3"
        prop="field5"
        :label=channel.field5
        width="150">
        </el-table-column>
        <el-table-column
        v-if="channel.field6"
        prop="field6"
        :label=channel.field6
        width="150">
        </el-table-column>
        <el-table-column
        v-if="channel.field7"
        prop="field7"
        :label=channel.field7
        width="150">
        </el-table-column>
        <el-table-column
        v-if="channel.field8"
        prop="field8"
        :label=channel.field8
        width="150">
        </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TopNav from '@/components/TopNav'
import ChannelTable from '@/components/ChannelTable'
export default {
    name: 'channel-table',
    data(){
        return {
           
        }
    },
    props:{
        feeds:[],
        channel:{}
    },
    methods:{
        ...mapActions([
            'handleRequest',
        ]),

        
    },
    mounted(){
        console.log(this.feeds)
    }


}
</script>