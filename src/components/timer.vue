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
      this.totalTime=this.get_time*60,
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
      ...mapGetters(['get_time']),
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
     //window.console.log(this.totalTime);
    },
    /*timerCountdown() {
      window.console.log('Working');
      this.timerRunning = true;
      this.interval = setInterval(this.updateCurrentTime, 1000);
      // Counts down from 60 seconds times 1000.
      setInterval( () => {
        this.timerMinutes--
      }, 60 * 1000)
      
      // Check if seconds at double zero and then make it a 59 to countdown from.
      // need another method of checking the number while in the loop and then adding a zero on the number under 10
      if(this.timerSeconds === '00'){
        this.timerSeconds = 59;
        setInterval( () => {
          this.timerSeconds--
        }, 1000);
      } else {
        setInterval( () => {
          this.timerSeconds--
        }, 1000);
      }
    },*/
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