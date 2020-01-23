<template>
<v-container>
        <div 
            class="d-flex justify-center flex-column text-center mt-12" 
            style="text-align: center;margin-top: 24px;margin-bottom: 12px"
        >
        <p class="text--accent-1 text--darken-1 font-weight-bold" style="font-size: 24px">Привет!</p>
        <p>Добро пожаловать на 24 день вашей тренировки!</p>
        <p>Ваш последний результат - решено {{result.rightAnswer}} из {{result.totalAnswer}}</p>
        <p>Общая точность {{currency}}%</p>
        </div>
        <v-card>
            <div class="text--accent-1 
                        text--darken-1 font-weight-bold" 
                        style="font-size: 24px; margin-left: 20px">
                Настройки
            </div>
            <v-card-subtitle>Установите время!</v-card-subtitle>
            <v-card-text>
                <v-slider
                    v-model="time"
                    step="1"
                    ticks="always"
                    tick-size="5"
                    :min="1"
                    :max="15"
                    thumb-label="always"
                    :tick-labels="labelsTime"
                    @click="clickTime"
                ></v-slider>
            </v-card-text>
            <v-card-subtitle>Установите уровень!</v-card-subtitle>
            <v-card-text>
                <v-slider
                    v-model="level"
                    step="1"
                    ticks="always"
                    tick-size="5"
                    :min="1"
                    :max="10"
                    thumb-label="always"
                    :tick-labels="labelsLevel"
                    @click="setLevel"
                ></v-slider>
            </v-card-text>
            <v-card-text>
                <v-checkbox
                    v-model="operations[0].status"
                    label="Суммирование"
                    @click="set_operations('sum')"
                ></v-checkbox>
                <v-checkbox
                    v-model="operations[3].status"
                    label="Вычитание"
                    @click="set_operations('sub')"
                >
                </v-checkbox>
                <v-checkbox
                    v-model="operations[2].status"
                    label="Умножение"
                    @click="set_operations('mul')"
                ></v-checkbox>
                <v-checkbox
                    v-model="operations[1].status"
                    label="Деление"      
                    @click="set_operations('div')"      
                ></v-checkbox>
                <v-checkbox
                    v-model="operations[4].status"
                    label="Возведение в степень"
                    @click="set_operations('sqr')"
                ></v-checkbox>
            </v-card-text>
            <v-card-actions class=" justify-center">
                <v-btn to="game">Play</v-btn>
            </v-card-actions>
            </v-card>
</v-container>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex';
    export default {
        name: "hellocard",
        data(){
            return{
                time: 2,
                level: 1,
                labelsTime: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                labelsLevel: [1,2,3,4,5,6,7,8,9,10],
            }
        },
        methods: {
            ...mapMutations(['set_time','set_operations','set_lvl']),
            logger: function(e){
                window.console.log(e);
            },
            clickTime(){
                this.set_time(this.time);
            },
            setLevel(){
                this.set_lvl(this.level)
            }
        },
        computed: {
            ...mapGetters({result: 'get_result',operations: 'get_all_op'}),
            currency(){
                return this.result.totalAnswer==0 ? 0 : 
                Math.floor(this.result.rightAnswer*100/this.result.totalAnswer) 
            }
        }
    };
</script>

<style scoped>

</style>