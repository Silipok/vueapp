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
        get_operations: state=>{
            return state.settingMathOp.filter(op=>op.status)
        },
        get_result: state=>{
            return state.playerResult
        },
        get_time: state=>{
            return state.settingTime
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
        }
    }
});