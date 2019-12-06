<template>
  <div class="memo-app">

    <!-- v-on 디렉티브를 이용해서, addMemo 이벤트 콜백함수로 연결한다. -->
    <memo-form @addMemo="addMemo" />
  
    <ul class="memo-list">
      <!-- v-for을 활용해 memo의 수만큼 Memo컴포넌트를 렌더한다. -->
      <memo v-for="memo in memos" :key="memo.id" :memo="memo" @deleteMemo="deleteMemo"  @updateMemo="updateMemo" />
    </ul>

  </div>
</template>


<script>
  import MemoForm from "./MemoForm";
  import Memo from "./Memo";

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

    // 일반적으로 훅의 실행타이밍이 가장 빠른 created에서 데이터를 받아온다.
    created() {
      // localStorage: 세션이나 쿠키 같이 데이터를 저장하는 장소 중의 하나이다. 
      // 로컬스토리지는 일정한 기간이 지나면 삭제되는 세션과는 달리 데이터의 만료기간이 없이 계속 저장된다. 
      // 데이터의 값은 항상 문자로 저장해야 하고, 간편하게 불러올 수 있다.
      // JSON.parse() 메서드는 JSON 문자열의 구문을 분석하고, 그 결과에서 JS 값이나 객체를 생성한다. 
      // 기존에 추가된 localStorage에 데이터가 있으면 memos에 넣고, 아니면 빈 배열로 초기화
      this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
    },
    methods: {
      // MemoForm으로 받은 { id, title, content }가 payload에 저장되어 있다.
      addMemo (payload) {
        this.memos.push(payload)
        this.storeMemo()
      },
      
      storeMemo() {
        // JSON.stringify() 메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환한다. 
        const memosToString = JSON.stringify(this.memos)
        localStorage.setItem('memos', memosToString)
      },

      deleteMemo(id) {
        // Memo로 부터 받은 삭제할 memo_id를 받는다.
        // findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환한다
        const targetIndex = this.memos.findIndex(v => v.id === id)
        console.log('deleteMemo => targetIndex:', targetIndex)

        // splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.
        // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        // deleteCount가 0 이하라면 어떤 요소도 제거하지 않는다. 이 때는 최소한 하나의 새로운 요소를 지정해야 한다.
        // 여기서 deleteCount의 값이 1이므로, targetIndex를 포함해 1개를 삭제만 함
        this.memos.splice(targetIndex, 1)
        this.storeMemo()
      },

      updateMemo (payload) {
        // payload: 수정 후 데이터 
        const { id, content } = payload
        // console.log(payload)

        //  target에 기존데이터를 입력한다.
        const targetIndex = this.memos.findIndex(v => v.id === id)

        // findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환한다
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