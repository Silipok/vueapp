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
        get_all_op: state=>{
            return state.settingMathOp
        },
        get_operations: state=>{
            return state.settingMathOp.filter(op=>op.status)
        },
        get_result: state=>{
            return state.playerResult
        },
        get_time: state=>{
            return state.settingTime
        },
        get_lvl: state=>{
            return state.level
        }
    },
    mutations: {
        true_answer(state){
            state.playerResult.rightAnswer++;
            state.playerResult.totalAnswer++;
        },
        wrong_answer(state){
            state.playerResult.totalAnswer+=1;
        },
        set_time(state,payload){
            state.settingTime=payload
        },
        set_operations(state,payload){
            state.settingMathOp.forEach(el=>{if(el.name==payload)el.status!=el.status});
        },
        set_lvl(state,payload){
            state.level=payload
        }
    }
});