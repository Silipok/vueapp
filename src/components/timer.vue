<template>
  <v-container>
    <v-card height="36" width="106">
        <div v-html="time"></div>
    </v-card>
  </v-container>
</template>

<script>
import {router} from '../route/route';
import {mapGetters} from 'vuex'
export default {
  name: "ctdTimer",
  data(){
    return{
    totalTime: 0,
    timerRunning: false,
    interval: null
    }
  },
  mounted(){
      this.totalTime=this.getTime*60,
      this.timerRun()
  },
  updated(){
    if(this.minutes=='00'&&this.seconds=='00'){
      this.timerRunning=false;
      this.setInterval=null;
      router.push({path: '/'})
    }
  },
  computed: {
      ...mapGetters(['getTime']),
      time: function() {
      return this.minutes + " : " + this.seconds;
    },
    minutes: function() {
      var min = Math.floor(this.totalTime / 60);
      return min >= 10 ? min : '0' + min;
    },
    seconds: function() {
      var sec = this.totalTime - (this.minutes * 60);
      return sec >= 10 ? sec : '0' + sec;
    }
  },
  methods: {
    timerRun() {
      this.timerRunning = true;
      this.interval = setInterval(this.countdownTimer, 1000);
    },
    countdownTimer() {
      if (this.timerRunning == true) {
          this.totalTime--;
      }
    },
  }
}
</script>

<style scoped>

</style>