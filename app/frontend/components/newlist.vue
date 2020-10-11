<template>
  <div class="container">
    <button v-if="!creatingList" class="new_button" @click="newList"><i class="fas fa-plus"></i>&nbsp;&nbsp;新增列表</button>
    <input v-if="creatingList" type="text" class="list_name" placeholder="列表標題">
    <button v-if="creatingList" class="button create_button" @click="createList">建立</button>
    <button v-if="creatingList" class="button cancel_button" @click="creatingList = false">取消</button>
  </div>
</template>

<script>
export default {
  name: 'Newlist',
  data: function() {
    return {
    creatingList: false,
    }
  },
  methods :{
    newList(event){
      event.preventDefault();
      this.creatingList = true;
    },
    createList(evennt){
      event.preventDefault();
      this.creatingList = false;

      let data = new FormData();
      data.append
    },
  },
}
</script>

<style lang = "scss" scoped>
.container {
  @apply .text-black .bg-orange-400 .px-3 .py-2 .mx-2 .w-64 .h-32 .rounded .flex-none;
}
.new_button {
  @apply .font-bold .w-full .text-left .mb-1;

  &:focus {
      @apply .outline-none;
  }
}

.list_name {
  @apply .rounded .w-full .px-3 .py-2 .mb-3 .text-black .bg-orange-200;

  &:focus {
    @apply .outline-none;
  }
}  

.button {
  @apply .px-3 .py-1 .rounded .font-bold .text-sm;

  &:focus {
      @apply .outline-none;
  }
}

.create_button {
  @apply .bg-orange-500;

  &:hover {
    @apply .bg-orange-600;
  }
}

.cancel_button {
    @apply .bg-red-500 .ml-1;
    &:hover {
    @apply .bg-red-600;
    }
}
</style>  