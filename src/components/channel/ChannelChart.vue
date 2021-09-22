<template>
  <div class="channel_chart flexbox  column-direction align-center justify-center justify-between">
    <div style="margin-top:3rem">
        <div class="flexbox  row-direction align-center justify-center justify-between">
            <el-select v-model="value" placeholder="Select" @change="createChartData">
                <el-option 
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <div class="flexbox  column-direction align-end " style="margin-right: 15rem;">
            <custom-date-picker v-model="date" @change="showTime($event)"></custom-date-picker>
            </div>
        </div>
        <el-divider></el-divider>
    </div>
    <div style="margin-top:3rem">
        <apexchart width="100%" type="line" :options="chart_options" :series="series" v-if="data_loaded"></apexchart>
    </div>
    <p>{{date}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment-jalaali'
export default {
    name: 'channel-table',
    data(){
        return {
            filteredFeeds:[],     
            options: [],
            value: '',
            label: '',
            series:[],
            chart_options:{},
            data_loaded :false,
            date :''
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

        async createOptions(){
            for(var i=1; i<=8; i++){
                var fieldName = 'field'+(i)
                if(this.channel[fieldName] != null){
                    var option={
                        value: fieldName,
                        label: this.channel[fieldName]
                    }
                    this.options.push(option)
                }else{
                    break
                }
            }
            this.value=this.options[0].value
        },

        createChartData(){
            var data = []
            var categories = []
            var field = this.channel[this.value]
            for (var i =0 ;i<this.filteredFeeds.length; i++){
                data.push(this.filteredFeeds[i][this.value])
                categories.push(this.filteredFeeds[i]['created_at'])
            }

            this.series =[{
                name: field,
                data: data
            }]

            this.chart_options={
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: categories,
                    type:'datetime',
                }
            }

            this.data_loaded=true

        },

        

        async deleteNullFieldsinFeeds(){
            for(var i = 0; i < this.feeds.length; i++){
                var feed = this.feeds[i]
                var filteredFeed = {}
                filteredFeed['created_at'] = feed['created_at']
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
        showTime () {
            var d = {
                filter_datetime:''
            }
            if (this.date.length > 0) {
                
                d.filter_datetime= moment(this.date,'jYYYY-jMM-jDD HH:mm').format('YYYY-MM-DD HH:mm')
                
                

            }
            console.log(
            this.date
            )

            this.handleRequest({                              
                name:`channel/${this.channel.channel_name}/get-filtered-feeds/`,
                action:'getAll',
                data: {
                    query: d
                }
            }).then((res)=>{
                console.log('filtered')
                console.log(res)
            }).catch((res)=>{
                console.log(res)
            })
        },


    },

    mounted(){
        this.deleteNullFieldsinFeeds(this.feeds)
        this.createOptions()
        this.createChartData()
    }


}
</script>