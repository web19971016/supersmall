<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :class="{active:isActive}" :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props: {
            link: String,
            activeColor:{
                type:String,
                default:'#FF8198'
            }
        },
        data() {
            return {}
        },
        computed: {
            isActive() {
                return this.$route.path.indexOf(this.link) !== -1;
            },
            activeStyle(){
                return this.isActive? {color:this.activeColor}:{}
            }
        },
        methods: {
            itemClick() {
                if (this.$route.path !== this.link) {
                    this.$router.replace(this.link)
                }
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
        font-weight:bold;
        color: black;
    }

    .tab-bar-item img {
        height: 24px;
        width: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }

</style>