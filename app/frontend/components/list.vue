<template>
  <div class="list" >
    <header>
      <h2 class="header">{{ list.name }}</h2>
      <a href="#" @click="deleteList">
        <i class="far fa-trash-alt"></i>
      </a>
    </header>

    <div class="deck">
      <draggable v-model="cards" ghost-class="ghost" group="list" @change="cardMoved">
        <Card v-for="card in cards" :card="card" :key="card.id"></Card>
      </draggable>      
    </div>    

     <div class="input-area">
       <button v-if="!editing" class="button bg-orange-400 hover:bg-orange-500 w-full text-left" @click="newCard"><i class="fas fa-plus"></i> &nbsp;新增卡片</button>

       <textarea v-if="editing" class="content" v-model="content"></textarea>  
       <button v-if="editing" class="button bg-orange-500 hover:bg-orange-600" @click="createCard">建立卡片</button>
       <button v-if="editing" class="button rounded-lg bg-orange-400 text-orange-600 text-xl  " @click="editing = false" ><i class="fas fa-times hover:text-orange-700 "></i></button>
    </div>
  </div>

</template>

<script>
  import Rails from '@rails/ujs';
  import Card from 'components/card';
  import draggable from 'vuedraggable';

  export default {
    name: 'List',
    props: ["list"],
    components: { Card, draggable },
    data: function() {
      return {
        content: '',
        cards: this.list.cards,
        editing: false,
      }
    },

    methods: {
      deleteList(event){
        event.preventDefault();
        if(confirm('確認刪除列表？')) {
          this.$store.dispatch("removeList", this.list.id);
        }
      },

      cardMoved(event) {
        let evt = event.added || event.moved;
        if (evt) {
          let el = evt.element;
          let card_id = el.id;

          let data = new FormData();
          data.append("card[list_id]", this.list.id);
          data.append("card[postition]", evt.newIndex + 1 );

          Rails.ajax({
            url:`/cards/${card_id}/move` ,
            type: 'PUT',
            data,
            dataType:'json',
            success: resp => {
              console.log(resp);
            },
            error: err => {
              console.log(err);
            },
          })
        }
      },

      newCard(event) {
        this.editing = true;
      },

      createCard(event) {
        event.preventDefault();

        let data = new FormData();
        data.append("card[name]", this.content);
        data.append("card[list_id]", this.list.id);

        Rails.ajax({
          url: '/cards',
          type: 'POST',
          data,
          dataType: 'json',
          success: resp => {
            this.cards.push(resp);
            this.content = "";
            this.editing = false;
          },
          error: err => {
            console.log(err);
          }
        });
      }
    },
    beforeMount() {
      Rails.ajax({
        url: '/lists.json',
        type: 'GET',
        dataType: 'json',
        success: resp => {
          console.log(resp);
        },
        error: err => {
          console.log(err);
        },
      });
    }
  }
</script>



<style lang="scss" scoped>
  header {
   @apply .flex .justify-between .items-center;
  }

  .ghost{
    @apply .border-2 .border-orange-600 .border-dashed .bg-orange-500;
  }

  .list {
    @apply  .bg-orange-400 .mx-3 .w-64 .rounded .px-3 .py-3 .h-full .flex-none ;

    .header {
      @apply .font-bold;    
    }    

    .deck {
      @apply .mt-2;
    } 

    .input-area {
      @apply .mt-1 ;

      .content {
        @apply .w-full .p-2 .rounded-md .bg-orange-100 .font-semibold .text-sm;
        &:focus {
          @apply .outline-none;
        }
      }

      .button {
        @apply .mt-2 ;
        &:focus {
          @apply .outline-none;
        }

      } 
    }
  }
</style>