<template>
  <li class="memo-item">
    <strong> {{ memo.title }} </strong>

    <p @dblclick="handleDblClick"> 
      <template v-if="!isEditing"> {{ memo.content }} </template>  
      <input v-else type="text" ref="content" :value="memo.content" @blur="handleBlur" @keydown.enter="updateMemo"/>
    </p>
    <button type="button" @click="deleteMemo"><i class="fas fa-times"></i></button>
  </li>
</template>


<script>
  export default {
    name: "Memo",
    data () {
      return {
        isEditing : false
      }
    },
    props: {
      memo: {
        type: Object
      }
    },
    methods: {
      
      deleteMemo () {
        const id = this.memo.id
        this.$emit('deleteMemo', id)
      },

      handleDblClick () {
        this.isEditing = true

        //  this.$refs.content가 update된 후에 실행이 되게끔 조작함
        this.$nextTick(() => {
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

      // input태그를 마우스로 클릭하여 입력상태로 만든것을 포커스(focus)를 얻었다고 한다. 그리고 입력상태를 떠난것을 포커스가 벗어났다고(blur) 한다.
      // 즉 blur은 엘리먼트의 포커스가 해제되었을때 발생한다.
      // focus가 해제되었을 경우에 수정이 안되게끔 설정한다.
      handleBlur () {
        this.isEditing = false;
      }
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