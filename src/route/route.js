import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloCard from '../components/hellocard.vue';
import PlayCard from '../components/playcard.vue';

Vue.use(VueRouter);

const routes=[
    {path: '/',component: HelloCard},
    {path: '/game',component: PlayCard}
]

export const router = new VueRouter({
    routes,
    mode: "history",
})