<template>
    <div class="container">
        <toolbar></toolbar>
        <div v-if="hasProfile" class="game">
            <div class="profile col-md-2 animated fadeInLeft" v-if="debug">
                <hr>
                <p class="row">
                    <i class="glyphicon glyphicon-user pull-left"> </i>
                    <span>个人信息<span>
                </p>
                <hr>

                <p class="row">
                    <span class="pull-left">姓名</span>
                    <span class="pull-right">{{ profile.name }}</span>
                </p>

                <hr>
                <p class="row">
                    <i class="glyphicon glyphicon-calendar pull-left"> </i>
                    <span>年代</span>
                </p>
                <hr>

                <p class="attribute row">
                    <span class="pull-left">纪年法</span>
                    <span class="pull-right">格里高利历</span>
                </p>
                <p class="attribute row">
                    <span class="pull-left">年份</span>
                    <span class="pull-right">{{ profile.year }}</span>
                </p>
                <hr>

                <div class="row">
                    <div class="box">
                        <i class="glyphicon glyphicon-edit"> </i>
                        <p>编辑</p>
                    </div>
                    <div class="box">
                        <i class="glyphicon glyphicon-phone"> </i>
                        <p>连线</p>
                    </div>
                </div>
            </div>
            <div class="main col-md-10 animated fadeInRight">
                <h1>开发进度</h1>
                <p>该作品是交互设计习作第一版设计稿</p>
                <p>初次接触学习相关知识，认知偏误之处请在 issue 中指正，thx，:)</p>
                <p>在业余时间会逐步完成后面的功能</p>
                <hr>
                <h2>TODO</h2>
                <ul>
                    <li>故事板中输入交互功能</li>
                    <li>故事板编辑和离线</li>
                    <li>连线功能</li>
                </ul>
            </div>
        </div>
        <div v-else class="game">
            <h1>序章 · 终</h1>
            <p>欢迎来到 「 蓝色空间 」 旅行中心</p>
            <form @submit.prevent="storeProfile" @keyup.enter="storeProfile">
                <label for="name">接下来，为您的新身份取个名字吧</label>
                <input type="text" id="name" v-model="profile.name" placeholder="角色姓名">
                <label for="year">您希望旅行到哪个年代</label>
                <input type="number" id="year" v-model="profile.year" placeholder="年代" number>
            </form>
            <div class="bottom">
                <i :class="animation.continue" class="glyphicon glyphicon-menu-down animated infinite animation-2s"> </i>
                <p>按回车键<Enter>继续</p>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import store from '../store'
    import Toolbar from './Toolbar.vue'

    export default {

        name: 'Game',

        components: {
            Toolbar
        },

        data () {
            var profile = store.profile;
            return {
                profile: profile,
                hasProfile: profile.name != undefined,
                animation: {
                    continue: "bounce"
                },
                debug: true
            }
        },

        methods: {
            storeProfile () {
                store.$set('profile', this.profile);
                this.hasProfile = !this.hasProfile;
                console.log(this.profile, store.profile);
            }
        },

        ready () {
            if (!store.$get('introduction')) {
                this.$router.go({
                  name: 'story',
                  params: {
                    storyId: 'introduction'
                  }
                });
            }
        }
    }
</script>

<style lang="stylus">
    .game
        form
            margin 0 auto
            text-align center
            width 80%
            label
                margin 6vh 0 5vh 0
                font-size 1.6em
            input
                width 100%
                font-size 2em
                display block
                border none
                border-bottom rgba(80, 80, 80, 0.7) solid 1px
                background inherit
                &:focus
                    outline none
                    border-bottom rgba(80, 80, 80, 1) solid 1px
        .profile
            color inherit
        .main
            line-height 2
            ul li
                margin 1em 2em 1em 2em
                padding 1em
                border 1px solid #222
                list-style none
                text-align left
                font-size 1.6em
                &:hover
                    padding-left 36%
                    transition all .5s
        .box
            width 100%
            font-size 1.6em
            padding .5em
            margin 1em 0 1em 0
            border 1px solid #222
            border-radius 5px
            box-shadow .1px .2px .3px #222
            &:hover
                box-shadow .1px .2px .3px #222 inset


    .bounce-transition {
      display: inline-block; /* 否则 scale 动画不起作用 */
    }
    .bounce-enter {
      animation: bounceIn .5s;
    }
    .bounce-leave {
      animation: bounceOut .5s;
    }
</style>
