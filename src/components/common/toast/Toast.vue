<template>
    <div class="toast" v-show=isShow>
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data() {
            return {
                message: '',
                isShow: false
            }
        },
        methods: {
            show(message = '默认文字', duration = 2000) {
                this.isShow = true
                this.message = message
                setTimeout(() => {
                    this.isShow = false
                    this.message = ''
                }, duration)
            }
        }
    }
</script>

<style scoped>
    .toast {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        padding: 5px 8px;
        background-color: rgba(0, 0, 0, .75);
        color: white;

        z-index: 999;
    }
</style>