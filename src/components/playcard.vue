<template>
<v-app>
    <v-container class="justify-center text-center">
        <v-card>
            <v-card-title class="justify-space-around">
                <v-card-actions class="">
                    <v-btn class="" to="/">Отмена
                        <v-icon>mdi-cancel</v-icon>
                    </v-btn>
                    <ctdTimer></ctdTimer>
                </v-card-actions>
            </v-card-title>
            <v-card-title class=" justify-center">
                <v-row class=" justify-center">
                    <v-col cols="12" sm="2" md="2" class=" justify-center">
                        <v-text-field solo
                            :value="staticNumber"
                            readonly
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="1" md="1" class=" justify-center text-center">
                        <v-text-field readonly
                            solo
                            :value="op1"
                            class=" justify-center text-center"
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" class=" justify-center text-center">
                        <v-text-field
                            v-model="FIRST_NUMBER"
                            solo
                            label="0"
                            class=" justify-center text-center"
                            dense
                            ref="firstNumber"
                            autofocus
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="1" md="1" class=" justify-center text-center" v-if="this.get_lvl>3">
                        <v-text-field readonly
                            solo
                            :value="op2"
                            class=" justify-center text-center"
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" class=" justify-center text-center" v-if="this.get_lvl>3">
                        <v-text-field
                            v-model="SECOND_NUMBER"
                            solo
                            label="0"
                            class=" justify-center text-center"
                            dense
                            ref="secondNumber"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="1" md="1" class=" justify-center text-center" v-if="this.get_lvl>=7">
                        <v-text-field readonly
                            solo
                            :value="op3"
                            class=" justify-center text-center"
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" class=" justify-center text-center" v-if="this.get_lvl>=7">
                        <v-text-field
                            v-model="THIRD_NUMBER"
                            solo
                            label="0"
                            class=" justify-center text-center"
                            dense
                            ref="thirdNumber"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="justify-center">
                    <v-col cols="12" sm="1" md="1" class=" justify-center text-center">
                        <v-text-field readonly
                            solo
                            value="="
                            class=" justify-center text-center"
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" class=" justify-center text-center">
                        <v-text-field readonly
                            solo
                            :value="totalNumber"
                            class=" justify-center text-center"
                            dense
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>
                <v-card-actions class="justify-center">
                    <v-btn @click="clickNumberBtn($event)">1</v-btn>
                    <v-btn @click="clickNumberBtn($event)">2</v-btn>
                    <v-btn @click="clickNumberBtn($event)">3</v-btn>
                    <v-btn  @click="setFocusRight">&#62;</v-btn>
                </v-card-actions>
                <v-card-actions class="justify-center">
                    <v-btn @click="clickNumberBtn($event)">4</v-btn>
                    <v-btn @click="clickNumberBtn($event)">5</v-btn>
                    <v-btn @click="clickNumberBtn($event)">6</v-btn>
                    <v-btn @click="setFocusLeft">&#60;</v-btn>
                </v-card-actions>
                <v-card-actions class="justify-center">
                    <v-btn @click="clickNumberBtn($event)">7</v-btn>
                    <v-btn @click="clickNumberBtn($event)">8</v-btn>
                    <v-btn @click="clickNumberBtn($event)">9</v-btn>
                    <v-btn @click="logger">&#63;</v-btn>
                </v-card-actions>
                <v-card-actions class="justify-center">
                    <v-btn disabled></v-btn>
                    <v-btn @click="clickNumberBtn($event)">0</v-btn>
                    <v-btn disabled></v-btn>
                    <v-btn @click="checkResult">=</v-btn>
                </v-card-actions>
        </v-card>
    </v-container>
</v-app>
</template>
<script>
import ctdTimer from "./timer";
import {mapGetters,mapMutations} from 'vuex';

export default {
    name: "playcard",
    data(){
        return {
            staticNumber: 0,
            FIRST_NUMBER: 0,
            SECOND_NUMBER: 0,
            THIRD_NUMBER: 0,
            op1: '',
            op2: '',
            op3: '',
            activeEl: 'firstNumber',
        }
    },
    mounted(){
        this.staticNumber=Math.floor(Math.random()*100);
        this.op1 = this.get_operations[Math.floor(Math.random()*this.get_operations.length)].value 
        this.op2= this.get_operations[Math.floor(Math.random()*this.get_operations.length)].value
        this.op3=this.get_operations[Math.floor(Math.random()*this.get_operations.length)].value
    },
    computed: {
        ...mapGetters(['get_operations','get_lvl']),
        totalNumber(){
            let total=0;
            total=this.getOpVal(this.op1,this.staticNumber);
            if(this.get_lvl>3)total=this.getOpVal(this.op2,total);
            if(this.get_lvl>=7)total=this.getOpVal(this.op3,total);
            return total
        }
    },
    components: {
        ctdTimer,
    },
    methods: {
        ...mapMutations(['true_answer','wrong_answer']),
        logger: function(){
            window.console.log(this.$route)
            //window.console.log(arg);
        },
        setFocusRight: function(){
            switch(this.activeEl){
                case ('firstNumber'):
                    if(this.get_lvl>3)this.activeEl='secondNumber';
                    this.$refs[this.activeEl].$el.children[0].children[0].children[0].children[0].focus();
                    break;
                case ('secondNumber'):
                    this.get_lvl>=7 ? this.activeEl='thirdNumber' : this.activeEl='firstNumber';
                    this.$refs[this.activeEl].$el.children[0].children[0].children[0].children[0].focus();
                    break;
                case ('thirdNumber'):
                    this.activeEl='firstNumber'
                    this.$refs[this.activeEl].$el.children[0].children[0].children[0].children[0].focus();
                    break;
                default:
                    break;
            }
        },
        setFocusLeft: function(){
            switch(this.activeEl){
                case ('firstNumber'):
                    if(this.get_lvl>=7) this.activeEl='thirdNumber';
                    if(this.get_lvl>3) this.activeEl='secondNumber';
                    this.$refs[this.activeEl].$el.children[0].children[0].children[0].children[0].focus();
                    break;
                case ('secondNumber'):
                    this.activeEl='firstNumber';
                    this.$refs[this.activeEl].$el.children[0].children[0].children[0].children[0].focus();
                    break;
                case ('thirdNumber'):
                    this.activeEl='secondNumber';
                    this.$refs[this.activeEl].$el.children[0].children[0].children[0].children[0].focus();
                    break;
                default :
                    break;
            }
        },
        getOpVal: function(op,seed){
            let res=0;
            switch(op){
                case '+':
                    res=Number(seed)+Math.floor(Math.random()*100);
                    break;
                case '-':
                    res=seed-Math.floor(Math.random()*this.staticNumber);
                    break;
                case '*':
                    res=seed*Math.floor(Math.random()*10);
                    break;
                case '/':
                    res=Math.round(seed/Math.floor(Math.random()*10));
                    break;
                case '^':
                    res=seed**Math.floor(1+Math.random()*3);
                    break;
                default:
                    res=seed;
                    break;
            }
            return res
        },
        getResUserOps: function(op,firstEl,secondEl){
            let res=0;
            switch(op){
                case '+':
                    res=Number(firstEl)+Number(secondEl);
                    break;
                case '-':
                    res=firstEl-secondEl
                    break;
                case '*':
                    res=firstEl*secondEl;
                    break;
                case '/':
                    res=Math.round(firstEl/secondEl);
                    break;
                case '^':
                    res=firstEl**secondEl;
                    break;
                default:
                    res=firstEl;
                    break;
            }
            return res
        },
        checkResult: function(){
            let res=0;
            res=this.getResUserOps(this.op1,this.staticNumber,this.FIRST_NUMBER);
            if(this.get_lvl>3)res=this.getResUserOps(this.op2,res,this.SECOND_NUMBER);
            if(this.get_lvl>=7)res=this.getResUserOps(this.op3,res,this.THIRD_NUMBER);
            window.console.log(`res=${res}; total=${this.totalNumber}; answ=${res==this.totalNumber}`);
            res==this.totalNumber ? this.true_answer() : this.wrong_answer();
            this.op1 = this.get_operations[Math.floor(Math.random()*this.get_operations.length)].value 
            this.op2= this.get_operations[Math.floor(Math.random()*this.get_operations.length)].value
            this.op3=this.get_operations[Math.floor(Math.random()*this.get_operations.length)].value
            this.staticNumber=Math.floor(Math.random()*100);
        },
        clickNumberBtn: function(e){
            switch(this.activeEl){
                case('firstNumber'):
                    this.FIRST_NUMBER=this.FIRST_NUMBER+e.target.innerText;
                    break;
                case('secondNumber'):
                    this.SECOND_NUMBER=this.SECOND_NUMBER+e.target.innerText;
                    break;
                case('thirdNumber'):
                    this.THIRD_NUMBER=this.THIRD_NUMBER+e.target.innerText;
                    break;
                default:
                    break;
            }
        }
    }
}
</script>