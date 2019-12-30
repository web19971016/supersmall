<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control class="tab-control" ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="tabClick"
                     v-show="isTabFixed"></tab-control>

        <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
                @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <home-recommend :recommends="recommends"></home-recommend>
            <home-feature></home-feature>
            <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <!--        组件不能直接监听点击事件，必须要加.native原生修饰符来监听组件根元素的原生事件-->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";

    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommend from "./childComps/HomeRecommend";
    import HomeFeature from "./childComps/HomeFeature";

    import {getHomeMultidata, getHomeGoods} from "network/home";
    import {itemListenerMixin,backTopMixin} from "common/mixin";


    export default {
        name: "Home",
        components: {
            NavBar,
            TabControl,
            GoodsList,
            Scroll,

            HomeSwiper,
            HomeRecommend,
            HomeFeature,
        },
        //混入方法，监听image加载刷新
        mixins:[itemListenerMixin,backTopMixin],
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0

            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            this.getHomeMultidata();
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
        },
        mounted(){
            //自动点击一次
            this.tabClick(0)
        },
        activated() {
            //每当进入页面开始监听
            console.log('进入Home');
            this.$bus.$on('imageLoad',this.itemImgListener)
            this.$refs.scroll.scrollTo(0,this.saveY,0)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            console.log('离开Home');
            this.saveY = this.$refs.scroll.getScrollY()
            //每当页面离开时关闭监听
            this.$bus.$off('imageLoad',this.itemImgListener)
        },
        methods: {
            /**
             * 事件监听相关方法
             */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
            },

            //显示返回顶部的按钮
            contentScroll(position) {
                //1.判断backTop是否显示
                this.listenerShowBackTop(position)

                //2.决定tabContrlo是否吸顶（position：fixed）
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            //上拉加载更多
            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            //监听轮播图的图片加载完成
            swiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
                console.log(this.tabOffsetTop);
            },

            /**
             * 网络请求相关方法
             */
            getHomeMultidata() {
                getHomeMultidata()
                    .then(res => {
                        this.banners = res.data.banner.list;
                        this.recommends = res.data.recommend.list;
                    })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page)
                    .then(res => {
                        this.goods[type].list.push(...res.data.list)
                        this.goods[type].page += 1

                        //完成加载后结束加载
                        this.$refs.scroll.finishPullUp()
                    })
            }
        }
    }
</script>

<style scoped>
    #home {
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #f6f6f6;
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*z-index: 99;*/
    }

    .content {
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }

    /*.content{*/
    /*    height: calc(100% - 93px);*/
    /*    overflow: hidden;*/
    /*    margin-top: 44px;*/
    /*}*/
</style>