<template>

  <div id="app">
    <app-header :memo-count="memoCount" />

    <!-- change이벤트가 발생하면 updateMemoCount이벤트를 호출한다. -->
    <memo-app @change="updateMemoCount" />
  </div>

</template>


<script>
import AppHeader from './components/AppHeader';
import MemoApp from './components/MemoApp';

export default {
  name: 'app',
  data () {
    return {
      memoCount: 0,
    }
  },
  components: { 
    AppHeader,
    MemoApp
  },
  methods: {

    // MemoApp에서 change이벤트가 발생되면 updateMemoCount가 실행된다.
    updateMemoCount (count) {
      this.memoCount = count
    }
  },
}
</script>


<style>

@import "./styles/reset.css";

#app {
  width: 560px;
  margin: 0 auto;
}

</style>