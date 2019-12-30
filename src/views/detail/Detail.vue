<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <goods-list ref="recommend" :goods="recommends"></goods-list>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <!--    返回顶部按钮    -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";
    import GoodsList from "components/content/goods/GoodsList";

    import {getDetail,getRecommend,Goods,Shop,GoodsParams} from "network/detail";
    import {itemListenerMixin,backTopMixin} from "common/mixin";
    import {debounce} from "common/utils";
    import {mapActions} from 'vuex'

    export default {
        name: "Detail",
        components:{
            DetailShopInfo,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
            GoodsList,
        },
        mixins:[itemListenerMixin,backTopMixin],
        data(){
            return{
                topImages:[],
                iid:null,
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                themeTopY:[],
                getThemeTopY:null,
                currentIndex:0
            }
        },
        created() {
            //1.获取商品id
            this.iid = this.$route.query.iid

            //2.请求商品详情数据
            getDetail(this.iid).then(res => {
                    const data = res.result
                    //1.轮播图数据
                    this.topImages = data.itemInfo.topImages;

                    //2.详情页商品数据
                    this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

                    //3.详情页店铺数据
                    this.shop = new Shop(data.shopInfo);

                    //4.商品的详情数据
                    this.detailInfo = data.detailInfo;

                    //5.获取参数信息
                    this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)

                    //7.评论信息
                    if (data.rate.cRate !==0){
                        this.commentInfo = data.rate.list[0]
                    }
                })

            //3.请求商品推荐数据
            getRecommend().then( res => {
                this.recommends = res.data.list
            })

            //4.为getThemeTopY做防抖
            this.getThemeTopY = debounce(()=>{
                this.themeTopY.push(0);
                this.themeTopY.push(this.$refs.param.$el.offsetTop);
                this.themeTopY.push(this.$refs.comment.$el.offsetTop);
                this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
                this.themeTopY.push(Number.MAX_VALUE);

                console.log(this.themeTopY);
            },100)
        },
        methods:{
            //将vuex中的actions方法映射到methods中
            ...mapActions(['addCart']),

            imageLoad(){
                this.newRefresh()
                //每次刷新后就调用getThemeTopY方法获取offsetTop的距离
                this.getThemeTopY()
            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0,-this.themeTopY[index],300)
            },
            contentScroll(position){
                //是否显示返回顶部按钮
                this.listenerShowBackTop(position)

                const positionY = -position.y

                let length = this.themeTopY.length
                for (let i = 0; i<length-1; i++){
                    if (this.currentIndex !==i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
            },
            addToCart(){
                //1.获取购物车需要展示的商品信息
                const product = {}
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;

                //2.添加商品到购物车
                this.addCart(product).then(res =>{
                    this.$toast.show(res)
                })

            }
        },
        destroyed() {
            this.$bus.$off('imageLoad',this.itemImgListener)
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: white;
        height: 100vh;
    }

    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: white;
    }

    .content{
        height: calc(100% - 44px - 49px);
    }

</style>