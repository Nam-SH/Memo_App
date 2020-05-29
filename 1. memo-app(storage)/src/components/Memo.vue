<template>
  <li class="memo-item">
    <strong> {{ memo.title }} </strong>

    <!-- 감싸준 p태그에 더블클릭에 대한 이벤트를 추가해준다. -->
    <p @dblclick="handleDblClick"> 

      <!-- 문단이 보이는 영역과 인풋 영역에 v-if와 v-else를 이용하여 조건문을 추가한다.   -->
      <template v-if="!isEditing"> {{ memo.content }} </template>  

      <!-- ref를 사용하여 기본 엘리먼트에 접근한다.. -->
      <!-- enter를 입력했을 경우, 수정이 되게 한다. -->
      <!-- 해당 이벤트에서 blur 이벤트가 발생함다면, handleBlur함수를 실행시킨다. -->
      <input v-else type="text" :value="memo.content" 
              @blur="handleBlur" @keydown.enter="updateMemo" />
    </p>

    <!-- 클릭이벤트 리스너로  deleteMemo 함수를 등록한다. -->
    <button type="button" @click="deleteMemo"><i class="fas fa-times"></i></button>
  </li>
</template>


<script>
  export default {
    // beforeUpdate () {
    //   console.log("beforeUpdate => ", this.$refs.content)
    // }, //=> undefined
    // updated () {
    //     console.log("Updated => ", this.$refs.content)
    // },
    name: "Memo",
    data () {
      // 현재 메모에 대한 수정 상태에 대한 데이터를 저장한다.
      return {
        isEditing : false
      }
    },

    // MemoApp에서 v-for을 통해 memo를 받았으니, 사용을 위해 props에 등록한다.
    props: {
      memo: {
        type: Object
      }
    },
    methods: {
      deleteMemo () {
        if (!window.confirm('삭제하실?')) return

        // Memo컴포넌트는 직접적인 삭제를 하지 않고, 삭제의 책임을 부모 컴포넌트(MemoApp)에 위임하되, 
        // 인자로 삭제하려는 고유ID를넘긴다.
        const id = this.memo.id
        this.$emit('deleteMemo', id)
      },

      handleDblClick () {
        // 더블 클릭했을 경우 수정상태를 true로 바꾼다.
        this.isEditing = true

        // console.log('this.$refs.content', this.$refs.content) //=> undefined
        
        // 데이터의 변화에 따라 DOM이 재렌더링 된 이후인 updated에서는 대상 DOM이 감지됨
        // nextTick(): 다음 DOM 업데이트 사이클 이후 실행하는 콜백을 연기합니다. DOM 업데이트를 기다리기 위해 일부 데이터를 변경한 직후 사용해야 합니다.
        this.$nextTick(() => {
          // 메모 수정용 인풋 영역이 활성화되면, 인풋 영역세 자동으로 포커스가 잡혀서 사용자가 바로 수정할 메모를 입력할 수 있도록
          // focus 이벤트를 추가한다.
          // ref를 통해 자식 컴포넌트에 직접 접근한다.
          this.$refs.content.focus()
        })
      },

      updateMemo(e) {
        const id = this.memo.id
        // console.log(e)
        const content = e.target.value.trim()
        if (content === '') return
        this.$emit('updateMemo', { id, content })
        this.isEditing = false
      },

      // blur 이벤트가 발생하면 인풋 창이 사라지고 메모의 내용 또한 바뀌지 않은 것을 확인 할 수 있다.
      handleBlur () {
        this.isEditing = false;
      },
    }
  }
</script>


<style>
.memo-item {
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  padding: 24px;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  list-style: none;
}

.memo-item button {
  background: none;
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  color: #e5e5e5;
  border: 0;
}

.memo-item strong {
  display: block;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: normal;
  word-break: break-all;
}

.memo-item p {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: #666;
}

.memo-item p input[type="text"] {
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  border: 1px solid #999;
}
</style>