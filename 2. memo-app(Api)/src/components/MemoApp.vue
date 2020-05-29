<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo" />
    <ul class="memo-list">
      <memo v-for="memo in memos" :key="memo.id" :memo="memo" 
      @deleteMemo="deleteMemo" 
      @updateMemo="updateMemo" />
    </ul>
  </div>
</template>


<script>
  import MemoForm from "./MemoForm";
  import Memo from "./Memo";
  import axios from 'axios';

  const memoAPICore = axios.create({
    baseURL: "http://localhost:8000/api/memos"
  })

  export default {
    name: "MemoApp",
    components: {
      Memo,
      MemoForm,
    },
    data() {
      return {
        memos: [],
      };
    },
    created() {
      memoAPICore.get('/')
        .then(res => {
          console.log('res', res)
          this.memos = res.data
        })
    },
    methods: {

      addMemo (payload) {
        memoAPICore.post('/', payload)
          .then(res => {
            this.memos.push(res.data)

            // 메모의 갯수가 변동되면, change이벤트를 호출한다.
            this.$emit('change', this.memos.length)
          })
          .catch((err) => {
            console.log(`${err}가 발생했어요...ㅎ`)
          })
      },

      deleteMemo (id) {
        const targetIndex = this.memos.findIndex(v => v.id === id)

        // 1. 인자로 받은 메모id를 사용하여 deleteAPI를 호출
        memoAPICore.delete(`${id}`)
          .then(() => {

            // 요청이 정상적으로 처리됬다면 memos배열에서 해당 메모를 삭제한다.
            this.memos.splice(targetIndex, 1)

            // 메모의 갯수가 변동되면, change이벤트를 호출한다.
            this.$emit('change', this.memos.length)
          })
          .catch((err) => {
            console.log(`${err}가 떴습니다...ㅎ`)
          })
      },

      updateMemo (payload) {
        const { id, content } = payload
        const targetIndex = this.memos.findIndex(v => v.id === id)
        const targetMemo = this.memos[targetIndex]
        memoAPICore.put(`/${id}`, { content })
          .then(() => {
            this.memos.splice(targetIndex, 1, { ...targetMemo, content })
          })  
          .catch((err) => {
            console.log(`${err}가 떴습니다...ㅎ`)
          })
      },
    }
  }
</script>


<style>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>