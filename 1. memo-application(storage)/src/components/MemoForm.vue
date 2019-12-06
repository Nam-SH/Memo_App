<template>
  <div class="memo-form">

    <!-- button의 submit으로 인해 form 엘리먼트에는 submit이벤트가 발생한다. -->
    <!-- submit은 동기 방식으로 브라우저를 리로딩시키는데, 현재는 이 기능이 필요가 없다. -->
    <form @submit.prevent="addMemo">
      <fieldset>
        <div>
          <!-- v-model을 함으로써 data 안의 title과 content의 모델 변수도 함께 갱신이 되도록 한다. -->
          <input class="memo-form__title-form" type="text" placeholder="메모의 제목을 입력해주세여" v-model="title" />
          <hr>
          <textarea class="memo-form__content-form" placeholder="메모의 내용을 입력해주세여" v-model="content" />
          <button type="reset"><i class="fas fa-sync-alt"></i></button>
        </div>
        <button type="Submit">등록!</button>
      </fieldset>
    </form>
  </div>

</template>

<script>

  export default {
    name: "MemoForm",
    data() {
      return {
        title: '',
        content: '',
      }
    },
    methods: {
      resetFields() {
        this.title = this.content = ''
      },
      addMemo() {
        const { title, content } = this

        // 고유 ID를 생성한다. (getTime() 메서드는 표준시에 따라 지정된 날짜의 시간에 해당하는 숫자 값을 반환)
        const id = new Date().getTime()
        if (title === '') return
        if (content === '') return

        // addMemo이벤트를 발생시키고, 부모 컴포넌트인 MemoApp에 { id, title, content }를 넘긴다. 
        this.$emit('addMemo', { id, title, content })

        // 부모 컴포넌트에 데이터를 전송한 후 데이터를 원래 상태로 돌려놓는다.
        this.resetFields()
      }
    }
  }
</script>

<style scoped>

.memo-form {
  margin-bottom: 24px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
}

.memo-form form fieldset div {
  position: relative;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}

.memo-form form fieldset div button[type="reset"] {
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 16px;
  background: none;
}

.memo-form form fieldset button[type="submit"] {
  float: right;
  width: 96px;
  padding: 12px 0;
  border-radius: 4px;
  background-color: #ff5a00;
  color: #fff;
  font-size: 16px;
}

.memo-form form fieldset .memo-form__title-form {
  width: 100%;
  margin-bottom: 12px;
  font-size: 18px;
  line-height: 26px;
}

.memo-form form fieldset .memo-form__content-form {
  width: 100%;
  height: 66px;
  font-size: 14px;
  line-height: 22px;
  vertical-align: top;
}

.memo-form input:focus {
  outline: none;
}

</style>