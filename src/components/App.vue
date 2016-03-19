<template>
    <div class="theme {{controls.theme}}">
        <!-- main view -->
        <router-view
                class="view"
                keep-alive
                transition
                transition-mode="out-in">
        </router-view>
        <audio v-if="music.switchy" :src="music.src" autoplay loop>
            <p>请使用HTML5浏览器，比如Chrome、Safari、Firefox、IE10+</p>
        </audio>
    <div>
</template>

<script type="text/babel">
    import store from '../store'

    export default {
        name: 'App',

        components: {},

        data () {
            return {
                music: store.music,
                controls: store.controls
            }
        },

        methods: {
        },

        computed: {
        },

        ready () {
        }
    }
</script>

<style lang="stylus">
    html, body
        margin 0
        padding 0
        height 100%

    #wrapper
        height 100%
        min-height 100%
        position relative

    #footer
        width 100%
        position absolute
        left 0
        bottom 0

    a, .button
        color inherit
        &:hover
            text-decoration none
            color rgba(80, 80, 80, 0.7)

    .h1, .h2, h1, h2
        font-family Lora,Georgia,"Xin Gothic",KaiTi,"Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif
        font-weight 300

    .h3, .h4, body, h3, h4, h5, h6
        font-family Lora,Georgia,"Xin Gothic","Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif
        font-weight 300

    p
        font-family Lora,Georgia,"Xin Gothic","Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif
        font-size 1.4em

    .theme
        left 0
        right 0
        width 100%
        height 100%
        min-height 100%
        text-align center
        position relative
        transition background 1s, color 1s

    .dark
        color whitesmoke
        background-color #262626

    .grey
        color black
        background-color whitesmoke

    .light
        color black
        background-color white

    .animation-1s
        -webkit-animation-duration: 1s;
        animation-duration: 1s;

    .animation-2s
        -webkit-animation-duration: 2s;
        animation-duration: 2s;

    .delay-05
        -webkit-animation-delay: .5s;
        animation-delay: .5s;

    .delay-10
        -webkit-animation-delay: 1s;
        animation-delay: 1s;

    .delay-15
        -webkit-animation-delay: 1.5s;
        animation-delay: 1.5s;

    .v-transition {}

    .v-enter
        animation fadeIn .6s

    .v-leave
        animation fadeOut .6s

    .icon
        transition background 0.2s, color 0.2s
        color inherit
        &:hover, .disable
            color rgba(80, 80, 80, 0.7)
        &:hover
            animation: spinAround 2s linear infinite;

    .bottom
        width 100%
        position absolute
        bottom 10vh
        left 0
</style>
