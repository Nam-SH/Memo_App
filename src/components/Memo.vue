<template>
  <li class="memo-item">
    <strong> {{ memo.title }} </strong>
    <p> {{ memo.content }} </p>
    <button type="button"><i class="fas fa-times"></i></button>
  </li>
</template>

<script>
  export default {
    name: "Memo",
    props: {
      memo: {
        type: Object
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

</style>