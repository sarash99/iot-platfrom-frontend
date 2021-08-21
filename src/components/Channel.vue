<template>
<div class="channel">
    <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
        {{'List item ' + o }}
    </div>
    </el-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'channel',
    data(){
        return {
            
        }
    }

}
</script>