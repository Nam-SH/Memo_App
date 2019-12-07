<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo" />
    <ul class="memo-list">
      <memo v-for="memo in memos" :key="memo.id" :memo="memo" 
      @deleteMemo="deleteMemo" 
      @updateMemo="updateMemo" 
      :editingId="editingId" 
      @setEditingId='SET_EDITING_ID'
      @resetEditingId='RESET_EDITING_ID' />
    </ul>
  </div>
</template>


<script>
  import MemoForm from "./MemoForm";
  import Memo from "./Memo";
  import axios from 'axios';

  import { mapActions, mapState, mapMutations } from 'vuex'
  import { SET_EDITING_ID, RESET_EDITING_ID } from '../store/mutations-types'


  const memoAPICore = axios.create({
    baseURL: "http://localhost:8000/api/memos"
  })

  export default {
    name: "MemoApp",
    components: {
      Memo,
      MemoForm,
    },
    created() {
      this.fetchMemos()
    },
    methods: {

      ...mapActions([
        'fetchMemos',
        'addMemo',
        'deleteMemo',
        'updateMemo',
      ]),

      ...mapMutations([
        SET_EDITING_ID,
        RESET_EDITING_ID,
      ])

    },
    computed: {
      ...mapState([
        'memos',
        'editingId',
      ])
    },
  }
</script>


<style>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>