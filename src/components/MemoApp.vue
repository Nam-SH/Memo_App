<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo" />

    <ul class="memo-list">
      <memo v-for="memo in memos" :key="memo.id" :memo="memo" @deleteMemo="deleteMemo" @updateMemo="updateMemo" />
    </ul>

  </div>
</template>


<script>
  import MemoForm from "./MemoForm";
  import Memo from "./Memo";

  export default {
    name: "MemoApp",
    components: {
      MemoForm,
      Memo,
    },
    date() {
      return {
        memos: [],
      };
    },
    created() {
      // 세션이나 쿠키 같이 데이터를 저장하는 장소 중의 하나이다. 
      // 로컬스토리지는 일정한 기간이 지나면 삭제되는 세션과는 달리 데이터의 만료기간이 없이 계속 저장됩니다. 데이터의 값은 항상 문자로 저장해야 하고, 간편하게 불러올 수 있다.
      // JSON.parse() 메서드는 JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성한다. 
      this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
    },
    methods: {
      addMemo (payload) {
        this.memos.push(payload)
        this.storeMemo()
      },
      storeMemo() {
        // JSON.stringify() 메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환합니다. 
        const memosToString = JSON.stringify(this.memos)
        localStorage.setItem('memos', memosToString)
      },
      deleteMemo(id) {
        const targetIndex = this.memos.findIndex(v => v.id === id)
        console.log(targetIndex)

        // splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경합니다.
        // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        // deleteCount가 0 이하라면 어떤 요소도 제거하지 않습니다. 이 때는 최소한 하나의 새로운 요소를 지정해야 합니다.
        this.memos.splice(targetIndex, 1)
        this.storeMemo()
      },
      updateMemo (payload) {
        // payload: 수정 후 데이터 
        const { id, content } = payload
        // console.log(payload)

        //  target에 기존데이터를 입력한다.
        const targetIndex = this.memos.findIndex(v => v.id === id)

        // findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다
        const targetMemo = this.memos[targetIndex]
        // console.log('before => targetMemo: ', targetMemo)
        this.memos.splice(targetIndex, 1, { ...targetMemo, content })
        console.log('memos', this.memos)
        this.storeMemo()
      }
    }
  }
</script>


<style>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>