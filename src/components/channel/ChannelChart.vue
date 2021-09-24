<template>
  <div class="channel_chart flexbox  column-direction align-center justify-center justify-between" v-loading="loading">
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
        <apexchart width="100%" 
        type="line" 
        :options="chart_options" 
        :series="series"
        class="ltr"
         v-if="data_loaded"></apexchart>
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
            filteredFeeds:[],     
            options: [],
            value: '',
            label: '',
            series:[],
            chart_options:{},
            data_loaded :false,
            date :'',
            fa : require("apexcharts/dist/locales/fa.json"),
        }
    },
    props:{
        channel:{}
    },

    methods:{
        ...mapActions([
            'handleRequest',
        ]),

        createOptions(){
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
                var time = this.converToShamsi(this.filteredFeeds[i]['created_at'])
                categories.push(time)
            }

            this.series =[{
                name: field,
                data: data
            }]

            this.chart_options={
                chart: {
                    id: 'vuechart-example',
                    locales: [this.fa],
                    defaultLocale: 'fa',
                },
                xaxis: {
                    categories: categories,
                    type:'datetime',
                    labels:{
                        datetimeUTC: false,
                    } ,
                },
                colors: ['#f25a5a']
                
            }

            this.data_loaded=true
        },

        

        deleteNullFieldsinFeeds(){
            
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
            this.loading = true
            var s_datetime = {
                filter_datetime:''
            }
            if (this.date.length > 0) {              
                s_datetime.filter_datetime= moment(this.date,'jYYYY-jMM-jDD HH:mm').format('YYYY-MM-DD HH:mm')
            }

            this.feeds = []
            this.filteredFeeds =[]
            this.handleRequest({                              
                name:`channel/${this.channel.channel_name}/get-filtered-feeds/`,
                action:'getAll',
                data: {
                    query: s_datetime
                }
            }).then((res)=>{
                this.feeds = res.feeds
                this.deleteNullFieldsinFeeds()
                this.createChartData()
            }).catch((res)=>{
                this.$message({
                    type: 'warning',
                    message: this.$t('a_problem_try_again')
                })
            }).finally(()=>{
                this.loading= false
            })
        },

        getChartInitialFeeds(){
            this.loading=true
            this.filteredFeeds = []
            this.feeds = []
            this.filteredFeeds =[]
            this.handleRequest({                              
                name:`channel/${this.channel.channel_name}/get-page-feeds/1/`,
                action:'getAll',
            }).then((res)=>{
                this.feeds = res.feeds
                this.deleteNullFieldsinFeeds()
                this.createOptions()
                this.createChartData()
            }).catch(()=>{
                this.$message({
                    type: 'warning',
                    message: this.$t('a_problem_try_again')
                })
            }).finally(()=>{
                this.loading = false
            })

        },

        converToShamsi(time){
            var date = time.substring(0,10)
            var shamsidate =  moment(date,'YYYY-MM-DD').format('jYYYY-jMM-jDD')
            return shamsidate+time.substring(10)
        },  


    },

    mounted(){
        this.getChartInitialFeeds()
    }


}
</script>