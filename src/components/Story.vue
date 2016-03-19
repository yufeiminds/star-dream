<template>
    <div>
        <toolbar></toolbar>
        <div class="container">
            <div class="story" @click="next">
                <h1 v-if="scene.title" :class="[animation.title]" class="animated">{{scene.title.text}}</h1>
                <h2 v-if="scene.sub" :class="[animation.sub]" class="animated">{{scene.sub.text}}</h2>
                <div v-if="scene.content">
                  <p :class="[animation.content]" class="animated">{{{scene.content.text}}}</p>
                </div>
            </div>
            <div class="bottom" @click="next">
                <div class="next">
                    <p>点击<kbd>空格键</kbd>继续</p>
                    <span>
                        <i class="glyphicon glyphicon-hand-up infinite bounce"> </i>
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

        name: 'Story',

        components: {
            Toolbar
        },

        data () {
            return {
              profile: store.profile,
              story: store.story,
              scene: store.scene,
              animation: {
                title: "",
                sub: "",
                content: ""
              }
            }
        },

        route: {
            data ({ to }) {
                var storyId = to.params.storyId;
                var step;
                if (to.params.step == undefined) {
                  step = store.getStep(storyId);
                } else {
                  step = Number.parseInt(to.params.step);
                }
                store.enterScene(step, storyId);

                if (store.scene != undefined && store.scene.music != undefined) {
                  store.$set('music', store.scene.music);
                }

                return {
                    storyId: storyId,
                    step: step,
                    story: store.story,
                    scene: store.scene
                }
            }
        },

        methods: {
            go (step) {
              var vm = this;
              ['title', 'sub', 'content'].map((key) => {
                vm.animation[key] = store.scene[key].animation.leave;
                // vm.animation[key] = 'no-visable'
              });
              setTimeout(() => {
                vm.step = step;
                store.enterScene(step);
                store.setStep(this.storyId, step);
                console.log("point", this.scene);
                ['title', 'sub', 'content'].map((key) => {
                  // vm.animation[key] = store.scene[key].animation.enter
                  vm.animation[key] = 'visable'
                });
              }, 1000);
            },
            prev () {
                this.go(this.step - 1);
            },
            next () {
                //console.log(this.profile.name == undefined, this.step, this.story.scene.length);
                if (store.profile.name == undefined && (this.step + 1) >= store.story.scene.length) {
                    store.$set('introduction', true);
                    this.$router.go({ name: 'game' });
                } else {
                    this.go(this.step + 1);
                }
            }
        },

        ready () {
            var vm = this;
            document.addEventListener('keyup', function(e) {
              if (e.keyCode == 32) { // Space
                vm.next();
              } else if (e.keyCode == 17) { // Backspace
                vm.prev();
              }
            }, false);
        }
    }
</script>

<style lang="stylus">
    animate()
        -webkit-animation-name arguments
        animation-name arguments

    .rotate
        animate rotateIn

    .rotate-leave
        animate rotateOut

    .fade
        animate fadeIn

    .fade-leave
        animate fadeOut

    .bounce-enter
        animate bounce
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;

    .story
        padding-top 20vh
        text-align center
        line-height 2
        h1
            font-size 5em

    .next
        text-align center

    .no-visible
        visibility hidden

    .visible
        visibility visible
</style>
