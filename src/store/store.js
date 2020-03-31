import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        settingTime: 2,
        level: 1,
        settingMathOp:[
            {name: 'sum',value: '+',status: true},
            {name: 'div',value: '/',status: false},
            {name: 'mul',value: '*',status: true},
            {name: 'sub',value: '-',status: false},
            {name: 'sqr',value: '^',status: true}
        ],
        playerResult: {
            totalAnswer: 0,
            rightAnswer: 0
        }
    },
    getters: {
        getAllOp: state=>{
            return state.settingMathOp
        },
        getOperations: state=>{
            return state.settingMathOp.filter(op=>op.status)
        },
        getResult: state=>{
            return state.playerResult
        },
        getTime: state=>{
            return state.settingTime
        },
        getLvl: state=>{
            return state.level
        }
    },
    mutations: {
        trueAnswer(state){
            state.playerResult.rightAnswer++;
            state.playerResult.totalAnswer++;
        },
        wrongAnswer(state){
            state.playerResult.totalAnswer+=1;
        },
        setTime(state,payload){
            state.settingTime=payload
        },
        setOperations(state,payload){
            state.settingMathOp.forEach(el=>{if(el.name==payload)el.status!=el.status});
        },
        setLvl(state,payload){
            state.level=payload
        }
    }
});