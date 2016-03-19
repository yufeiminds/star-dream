<template>
    <div>
        <toolbar></toolbar>
        <div class="container">
            <div class="start">
                <div v-if="!help">
                    <h1 :class="animation.title" class="animated">星梦</h1>
                    <h2 :class="animation.sub" class="animated">一个关于宇宙的故事板</h2>
                    <div class="start-group">
                        <span v-link="{ name: 'game' }">
                                <i class="glyphicon glyphicon-play icon button" aria-label="开始游戏"> </i>
                                <p>开始游戏</p>
                        </span>
                        <span @click="help = true">
                            <i class="glyphicon glyphicon-question-sign icon button" aria-label="帮助"> </i>
                            <p>帮助</p>
                        </span>
                    </div>
                </div>
                <div v-else :class="animation.content" class="help animated">
                    <p>
                        <strong>这真的是个游戏吗？</strong>
                        严格来说，并不是，它并没有常见游戏的目标激励，也没有什么特定的玩法。
                        就像你在副标题那里看到的一样，是的，它是一个「 故事板 」，用来听别人的故事，讲自己的故事。
                    </p>
                    <p>
                        在游戏中，你会扮演一个时空旅行者，在不同的时间，不同的场景，看到不同的故事，并谱写自己的故事。
                        每一个人的故事都可以向全世界的人分享。点击「 连线 」可以和远方的小伙伴进行文字通讯。
                    </p>
                    <p>
                        这个作品的最主要目的是提供一种沉浸式的阅读体验，干净一点的界面，再加上简单的操作，
                        一系列相互独立的短故事通过一条主线串联起来，
                        每天用几分钟阅读一个故事，也不失为一个排解压力的良策。
                    </p>
                    <p>
                        它也是我的前端设计习作，为了练习Vue.js这个前端框架而建立，关于这个作品，
                        你可以点击下方那个
                        <i class="glyphicon glyphicon-globe icon button" aria-label="我的博客"> </i>
                        按钮，在我的博客上看到我对这个世界的一些不成熟的思考。
                    </p>
                    <p>
                        至于它的其他用途，<del>在线聊天</del>?，<del>制作PPT</del>?，当我没说，嘿嘿，点击
                        <i class="glyphicon glyphicon-arrow-left" aria-label="返回"> </i>
                        返回吧。
                    </p>
                    <p>
                        <label>快捷键说明：</label>
                        <i class="glyphicon glyphicon-fullscreen" aria-label="全屏"> </i> 全屏 (F)
                        <i class="glyphicon glyphicon-music" aria-label="音乐"> </i> 音乐 (S)
                        <i class="glyphicon glyphicon-eye-open" aria-label="切换主题"> </i> 切换主题 (T)
                        <i class="glyphicon glyphicon glyphicon-hand-up" aria-label="继续阅读"> </i> 继续阅读 (Space)
                    </p>
                </div>
                <div class="bottom">
                    <span>
                        <a href="http://blog.thxminds.com" target="_blank">
                            <i class="glyphicon glyphicon-globe icon button" aria-label="我的博客"> </i>
                        </a>
                    </span>
                    <span>
                        <a href="mailto:yufeiminds@163.com" target="_blank">
                            <i class="glyphicon glyphicon-envelope icon button" aria-label="我的邮箱"> </i>
                        </a>
                    </span>
                    <span v-show="help" @click="help = false">
                        <i class="glyphicon glyphicon-arrow-left icon button" aria-label="返回"> </i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import store from '../store'
    import Toolbar from './Toolbar.vue'

    export default {

        name: 'Main',

        components: {
            Toolbar
        },

        data () {
            return {
                help: false,
                animation: {
                    title: "flip",
                    sub: "fadeInUp",
                    content: "lightSpeedIn"
                }
            }
        },

        ready () {

        }
    }
</script>

<style lang="stylus">
    animate()
        -webkit-animation-name arguments
        animation-name arguments

    .rotate-enter
        animate rotateIn

    .rotate-leave
        animate rotateOut

    .start
        margin-top 10vh
        font-size 24px
        h1
            font-size 3em
        .icon
            font-size 36px
        p
            font-size 1em
            font-family Lora,Georgia,"Xin Gothic",KaiTi,"Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif
        .start-group
            span
                display inline-block
            .icon.button
                margin 10vh 10vw 0 10vw
        .bottom
            span
                display inline-block
                margin 5vh 5vw 0 5vw
</style>
