<template>
        <div class="bottom-bar">
        <div class="check-all">
            <check-button class="check-btn" @click.native="checkAll" :is-check="isCheckedAll"></check-button>
            <span>全选</span>
        </div>
        <div class="total">
            合计:{{totalPrice}}
        </div>
        <div class="calculate" @click="toCalculate">
            去计算({{checkedLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";

    import { mapGetters } from 'vuex'

    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            ...mapGetters(['cartList']),

            totalPrice(){
                return '￥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue,item)=>{
                    return preValue + item.price*item.count
                },0).toFixed(2)
            },
            checkedLength(){
                return this.cartList.filter(item => item.checked).length
            },
            isCheckedAll(){
                if (this.cartList.length ===0 ) return false
                return !this.cartList.find(item => !item.checked)
            }

        },
        methods:{
            checkAll(){
               if (this.isCheckedAll){//当全部选中时，变为全部不选中
                   this.cartList.forEach(item => item.checked = false)
               }else {//部分或全部未选中时
                   this.cartList.forEach(item => item.checked = true)
               }
            },
            toCalculate(){
                const isCheck = this.cartList.find(item => item.checked)
                if (isCheck){

                }else {
                    this.$toast.show('还没选中任何商品')
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        height: 40px;
        background-color: #eee;
        position: relative;
        display: flex;
        line-height: 40px;
    }

    .check-all{
        display: flex;
        align-items: center;
        width: 70px;
    }
    .check-all .check-btn{
        margin:0 10px;
        line-height: 20px;
    }

    .total{
        flex: 1;
        text-align: center;
    }

    .calculate{
        width: 90px;
        text-align: center;
        background-color: #ef6812;
        color: white;
    }
</style>