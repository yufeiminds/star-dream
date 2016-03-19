/**
* Created by yufeili on 16/2/22.
*/

import Vue from 'vue'
import Resource from 'vue-resource'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

Vue.use(Resource);

const store = new EventEmitter();
export default store

var isObject = (value) => {
  return (typeof value == 'object' || value instanceof Object);
}

var isEmpty = (value) => {
  return (value == undefined || value == null);
}

store.$get = (key, defaultValue = undefined, parser = JSON.parse, setDefault = false) => {
  console.log("get", key, defaultValue, setDefault);
  let cache = localStorage.getItem(key);
  if (isEmpty(cache)) {
    if (setDefault == true)
    {
      store.$set(key, defaultValue);
    }
    return defaultValue;
  } else {
    if (parser != undefined) {
      cache = parser(cache);
    }
  }
  if (isObject(cache) && isObject(store[key])) {
    Object.assign(store[key], cache);
  } else {
    store[key] = cache;
  }
  return store[key];
}


store.$set = (key, value, serializer = JSON.stringify, replace) => {
  console.log("set", key, value);
  if (isObject(value) && isObject(store[key])) {
    Object.assign(store[key], value);
  } else {
    store[key] = value;
  }
  if (serializer != undefined)
    value = serializer(store[key]);
  localStorage.setItem(key, value);
}


store.$delete = (key) => {
  if (isObject(store[key])) {
    Object.keys(store[key]).map((k) => {
      store[key][k] = undefined;
    });
  } else {
    store[key] = undefined;
  }
  console.log("deleted", store[key]);
  localStorage.removeItem(key);
}

/*
Store
*/
store.music = store.$get('music', {
  name: "永久に_Elements Garden",
  src: "http://7sbo48.com2.z0.glb.clouddn.com/music/chapter01.mp3",
  switchy: true
}, JSON.parse, true);
store.constrols = store.$get('controls', {
  fullscreen: false,
  theme: 'light'
}, JSON.parse, true);
store.profile = store.$get('profile', {
    name: undefined,
    year: 2016
}, JSON.parse, true);
store.story = store.$get('story', undefined);
store.scene = store.$get('scene', undefined);
store.introduction = store.$get('introduction', false);


var stories;
var initGame = () => {
  $.ajax({
    url: './static/story.json',
    success: (data) => {
      stories = data;
      console.log("laod", stories);
    },
    error: (data) => {
      console.error(data);
    },
    async: false,
    dataType: "json"
  });
}
initGame();

store.getStep = id => {
  return store.$get('_step_' + id, 0);
}

store.setStep = (id, step) => {
  store.$set('_step_' + id, step);
}

store.enterStory = id => {
  var story = stories.find(obj => { return obj.id == id });
  if (isEmpty(story)) {
    store.emit('error', 404, "星球无故事");
  }
  else {
    store.$set('story', story);
  }
  return story;
}

var doCheck = (item) => {
  item = isEmpty(item) ? {} : item;
  item.animation = isEmpty(item.animation) ? {} : item.animation;
  item.animation.enter = isEmpty(item.animation.enter) ? "fadeInDown" : item.animation.enter;
  item.animation.leave = isEmpty(item.animation.leave) ? "fadeOutDown" : item.animation.leave;
  return item;
}

store.enterScene = (step, storyId = undefined) => {
  if (storyId != undefined) {
    store.enterStory(storyId);
  }
  if (isEmpty(store.story)) {
    store.emit('error', 404, "星球无故事");
    return undefined;
  }
  let scene = store.story.scene[step];
  if (isEmpty(scene)) {
    store.emit('error', 404, "星球无场景");
    return undefined;
  }
  scene.title = doCheck(scene.title);
  scene.sub = doCheck(scene.sub);
  scene.content = doCheck(scene.content);
  store.$set('scene', scene);
  return scene;
}

store.finishStory = () => {
  store.story = undefined;
  store.scene = undefined;
}
