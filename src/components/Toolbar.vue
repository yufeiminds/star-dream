<template>
    <div class="container">
        <div class="toolbar">
            <div class="left">
                <p class="lead">BGM: {{music.name}}</p>
            </div>
            <div class="right">
                <ul>
                    <li class="icon button">
                        <span>
                            <a v-link="{ name: 'main' }">
                                <i class="glyphicon glyphicon-home" aria-label="返回主页"> </i>
                            </a>
                        </span>
                    </li>
                    <li @click="changeMusic({ switchy: !music.switchy });" class="icon button">
                        <span v-if="music.switchy">
                            <i class="glyphicon glyphicon-music" aria-label="关闭音乐"> </i>
                        </span>
                        <span v-else>
                            <i class="glyphicon glyphicon-music disable" aria-label="开启音乐"> </i>
                        </span>
                    </li>
                    <li class="icon button">
                        <span v-if="!controls.fullscreen">
                            <i class="glyphicon glyphicon-fullscreen" aria-label="全屏" @click="fullscreen(true)"> </i>
                        </span>
                        <span v-else>
                            <i class="glyphicon glyphicon-fullscreen disable" aria-label="取消全屏" @click="fullscreen(false)"> </i>
                        </span>
                    </li>
                    <li class="icon button">
                        <span v-if="controls.theme == 'light'" @click="changeTheme('dark')">
                            <i class="glyphicon glyphicon-eye-open" aria-label="夜间模式"> </i>
                        </span>
                        <span v-if="controls.theme == 'dark'" @click="changeTheme('light')">
                            <i class="glyphicon glyphicon-eye-close disable" aria-label="日间模式"> </i>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import store from '../store'

    export default {

        name: 'Main',

        components: {},

        data () {
            return {
                music: store.music,
                controls: store.controls,
                store: store
            }
        },

        methods: {
          changeTheme (theme) {
            store.$set('controls', { theme: theme });
          },
          changeMusic (music) {
            store.$set('music', music);
          },
          fullscreen (status = true) {
            function errorHandler() {}
            document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);

            let isFullScreen = !(!document.fullscreenElement &&
              !document.mozFullScreenElement && !document.webkitFullscreenElement);

            console.log("load", this.controls, status, isFullScreen);

            if (status && !isFullScreen) {

              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
              } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
              } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              } else {
              console.log("asd");
              }
            }
            if (!status && isFullScreen) {
              if (document.cancelFullScreen) {
                document.cancelFullScreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
              }
            }

            store.$set('controls', { fullscreen: status });
          }
        },

        ready () {
        }
    }
</script>

<style lang="stylus">
    @keyframes spinAround
        from
            transform: rotate(0deg)
        to
            transform: rotate(360deg)

    animate()
        -webkit-animation-name arguments
        animation-name arguments

    .toolbar
        padding-top 20px
        font-size 24px
        div
            display inline-block
        .right
            float right
        .left
            float left
        ul
            list-style: none
            li
                display inline-block
                margin: 6px
</style>
