// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

import 'scripts'
import 'styles'

// Vue.js 
import Vue from 'vue/dist/vue.esm';
import draggable from 'vuedraggable';
import Rails from '@rails/ujs';
import store from 'stores/list';
import { mapGetters, mapActions } from 'vuex';
import List from 'components/list';
import Newlist from 'components/newlist';

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector('#board');
  if (el) {
    new Vue({
        el,
        store,
        computed: {
          lists: {
            get() {
              return this.$store.state.lists;
            },
            set(value) {
              this.$store.commit('UPDATE_LISTS', value);
            },
          }
        },
        components: { List, Newlist,draggable },
        methods: {
          ...mapActions(["loadList", "moveList"]),
        },
          beforeMount() {
            this.loadList();
          
         }
      });
  }
})

