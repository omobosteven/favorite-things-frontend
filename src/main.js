import Vue from 'vue';
import axios from 'axios';
import Cookie from 'js-cookie';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'http://ec2-18-191-69-218.us-east-2.compute.amazonaws.com:8000/'
  : 'http://127.0.0.1:8000/';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

library.add(faCircle, faSquare, faPlusCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

Vue.use(VeeValidate, {
  errorBagName: 'vErrors',
  events: 'blur',
});
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

const setCurrentUserToStore = (obj) => {
  const token = Cookie.get('jwt_token');

  if (token) {
    obj.dispatch('authenticateUser');
  } else {
    obj.dispatch('logoutUser');
  }
};

setCurrentUserToStore(store);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
