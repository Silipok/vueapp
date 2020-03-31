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
                    @click="setOperations('sum')"
                ></v-checkbox>
                <v-checkbox
                    v-model="operations[3].status"
                    label="Вычитание"
                    @click="setOperations('sub')"
                >
                </v-checkbox>
                <v-checkbox
                    v-model="operations[2].status"
                    label="Умножение"
                    @click="setOperations('mul')"
                ></v-checkbox>
                <v-checkbox
                    v-model="operations[1].status"
                    label="Деление"      
                    @click="setOperations('div')"      
                ></v-checkbox>
                <v-checkbox
                    v-model="operations[4].status"
                    label="Возведение в степень"
                    @click="setOperations('sqr')"
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
            ...mapMutations(['setTime','setOperations','setLvl']),
            logger: function(e){
                window.console.log(e);
            },
            clickTime(){
                this.setTime(this.time);
            },
            setLevel(){
                this.setLvl(this.level)
            }
        },
        computed: {
            ...mapGetters({result: 'getResult',operations: 'getAllOp'}),
            currency(){
                return this.result.totalAnswer==0 ? 0 : 
                Math.floor(this.result.rightAnswer*100/this.result.totalAnswer) 
            }
        }
    };
</script>

<style scoped>

</style>