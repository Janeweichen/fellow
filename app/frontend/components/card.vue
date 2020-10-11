<template>
  <div>
    <div class="card" @click = "editing = true">
      {{ card.name }}
    </div>

    <div v-if="editing" class="dialog">
      <div class="inner">
        <a href="#" class="closeButton" @click="close">
          <i class="fas fa-times"></i>
        </a>
        <textarea class="content" rows="4" v-model="card_name"></textarea>
        <button class="updateButton" @click="update">更新</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
  name: 'Card',
  data: function() {
    return {
      card_name: this.card.name,
      editing: false
    }
  },
  props: ['card'],
  methods: {
    // ...mapActions(["updateCard"]),
    close(event) {
      event.preventDefault();
      this.editing = false;
    },

    update(event) {
      event.preventDefault();
      this.$store.dispatch("updateCard", { id: this.card.id, name: this.card_name });
      this.editing = false;
      
    }
  }  
}
</script>

<style  lang="scss" scoped>
.card {
  @apply .bg-orange-200 .mb-4 .rounded-lg .px-2 .py-2 .cursor-pointer;
}

.dialog {
  background-color: rgba(0, 0, 0, 0.7);
  @apply  .mb-5 .fixed .w-full .h-full .top-0 .left-0 .flex .items-center .justify-center;

  .inner {
    @apply  .bg-gray-300 .flex .flex-col .px-6 .py-2;
    width: 700px;

    .closeButton {
      @apply .text-gray-800 .text-right;
    }

    .content {
      @apply  .text-black .border .border-gray-500 .mt-2 .px-2 .py-2;

      &:focus {
        @apply .outline-none;
      }
    }

    .updateButton {
      @apply .bg-gray-500 .px-2 .py-2 .mt-3 .mb-2 .rounded;

      &:focus {
        @apply .outline-none;
      }
    }
  }
}
</style>