/**
 * Created by Yufei Li on 15/12/17.
 */

import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

import App from './components/App.vue'
import Main from './components/Main.vue'
import Game from './components/Game.vue'
import Story from './components/Story.vue'
import NotFound from './components/404.vue'

Vue.use(Resource);
Vue.use(Router);

var router = new Router({
    // HTML5 History have some issue at here
    //history: true,
    //root: '#!',
    //saveScrollPosition: true,
    linkActiveClass: 'active'
});

router.map({
    '/': {
        name: 'main',
        component: Main
    },
    '/game': {
        name: 'game',
        component: Game
    },
    '/story/:storyId': {
        name: 'story',
        component: Story
    },
    '/story/:storyId/:step': {
        component: Story
    },
    '/not_found': {
        name: 'not_found',
        component: NotFound
    }
});

router.beforeEach(function () {
    window.scrollTo(0, 0)
});

router.redirect({
    '*': '/not_found'
});

router.start(App, '#app');
