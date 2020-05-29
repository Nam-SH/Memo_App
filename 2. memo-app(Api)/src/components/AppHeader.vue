<template>
  <div class="app-header">
    <h1>메모 애플리케이션</h1>
    {{ memoCount }}
  </div>
</template>


<script>
  export default {
    name: 'AppHeader',

    // memos의 갯수에 대하여 memos.lenth를 이용하여 직접 참조하면 두 컴포넌트 간의 의존성을 강하게 만들기 때문에 피하는 것이 좋다.
    // 두 컴포넌트는 같은 모델을 공유하기 위해 각각 자기 자신의 모델을 가지고 동기화하는 방향으로 짠다.
    props: {
      memoCount: {
        type: Number,
        default: 0,
      }
    }
  };
</script>


<style scoped>
.app-header {
  overflow: hidden;
  padding: 52px 0 27px;
}
.app-header h1 {
  float: left;
  font-size: 24px;
  text-align: center;
}
</style>