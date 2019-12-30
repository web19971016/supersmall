<template>
    <div class="cart">
        <!--        导航-->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!--        商品列表-->
        <scroll class="content" ref="scroll">
            <cart-list></cart-list>
        </scroll>

        <!--        底部bar-->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import Scroll from "components/common/scroll/Scroll";

    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";

    import {mapGetters} from 'vuex'

    export default {
        name: "ShoppingCar",
        components: {
            NavBar,
            Scroll,

            CartList,
            CartBottomBar
        },
        computed: {
            //mapGetters是vuex内部将store中的getter映射到局部计算属性中
            ...mapGetters(['cartLength'])
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
    .cart {
        height: 100vh;
    }

    .nav-bar {
        background-color: var(--color-tint);
        color: white;
    }

    .content {
        height: calc(100% - 44px - 49px - 40px);
        overflow: hidden;
    }
</style>