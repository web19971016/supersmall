<template>
    <div>
        <div class="icon-selector" :class="{'selector-active': isCheck}">
            <img src="~assets/img/common/checkbtn.svg" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
        props:{
            isCheck:{
                type:Boolean,
                default:true
            }
        }
    }
</script>

<style scoped>
    .icon-selector {
        position: relative;
        margin: 0;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid #ccc;
        cursor: pointer;
        display: flex;
        background-color: white;
        -webkit-tap-highlight-color:transparent;
    }
    .selector-active {
        background-color: #ff8198;
        border-color: #ff8198;
    }
</style>