# memo-application(Vuex)

> NAM-SH's Vue.js project



## 0. 서론

- 해당 프로젝트는 `vue`를 활용해 메모 어플리케이션을 만드는 것이다.
- 카멜케이스(`camelCase`), 파스칼케이스(`PascalCase`), 스네이크 케이스(`snake_case`), 케밥 케이스(`kebab-case`) 중 `convention`인 케밥 케이스(`kebab-case`)를 사용하였다.
- 이전 까지의 구조에서는 새로운 기능을 추가할때 아래와 같은 문제점이 발생하였다.
  - 여러 개의 컴포넌트가 같은 상태(데이터)에 의존한다. 이런 경우 지나치게 중첩된 컴포넌트를 통과하는 props는 점점 늘어날 것이고 장황해질 것이다.
  - 서로 다른 컴포넌트의 액션이 동일한 상태를 변경 또는 반영해야 할 수 있다.
- 위와 같은 문제를 해결하기 위해 Vuex라는 라이브러리를 사용한다.
- 해당 코드는 memo-application (API)에서 수정된 부분만 작성하였다.



## 1. Vuex 설치 및 기본세팅

### 1.1 Vuex 라이브러리 설치

```bash
$ npm install vuex --save
```

### 1.2 store 디렉터리 구조

```
└─src
    │  App.vue
    │  main.js
    │  
    ├─store
    │      actions.js
    │      getters.js
    │      index.js
    │      mutations-types.js
    │      mutations.js
    │      states.js
```

### 1.3 `store/index.js` 작성

```js
// src/store/index.js

import Vue from 'vue'

// 애플리케이션 내에서 Vuex 라이브러리를 사용할 수 있도록 등록해준다.
import Vuex from 'vuex'

import state from './states.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

// Vuex를 사용하기 위해 Vue.use(Vuex)를 먼저 호출한다.
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
```

### 1.4 store을 main.js에 삽입

```js


import Vue from 'vue'
import App from './App.vue'

// 1. 앞서 정의한 store를 가져와 import한다.
// ('./store') 까지만 적어주면그 디렉터리 내에 있는 index.js 파일을 찾아서 불러온다.
import store from './store'

new Vue({
  el: '#app',

  // 2. Vue 인스턴스에 store 옵션으로 등록한다.
  store,
  render: h => h(App)
})
```



## 2. Vuex에 데이터 저장한 후 노출 기능 구현하기

```js
// src/main.js

// 스토어에 저장할 데이터는 MemoApp컴포넌트에 정의된 memos를 상태를 정의한다.
export default {
  memos: [],
}
```

```js
// src/store/mutations-types.js

export const FETCH_MEMOS = 'FETCH_MEMOS'
```

```js
// src/store/mutations.js

import { 
  FETCH_MEMOS
} from './mutations-types'

export default {
  [FETCH_MEMOS] (state, payload) {
    state.memos = payload
  },
```

```js
// src/store/actions.js

// 1. 사용하려는 axios 라이브러리를 가져온다.
import axios from 'axios'
import { 
  FETCH_MEMOS
} from './mutations-types'

// 2. 앞서 MemoApp 컴포넌트에서 사용하던 axios 인스턴스를 동일하게 가져온다.
const memoAPICore = axios.create({
  baseURL: "http://localhost:8000/api/memos"
})

// 3. 사용할 함수를 'fetchMemos'라는 이름의 함수로 정의한다.
export function fetchMemos ({ commit }) {
    
  // 4. MemoApp의 created 훅에서 실행되는 함수를 가져온다.
  memoAPICore.get('/')
    .then(res => {
      
      // 5. API 호출 결과의 데이터와 함께 FETCH_MEMOS라는 이름의 mutation의 커밋을 한다.
      commit(FETCH_MEMOS, res.data)
    })
}
```

```vue
// src/components/MemoApp.vue

<script>
  ...,
  // 1. mapActions 헬퍼 함수를 가져온다.
  import { mapActions, mapState } from 'vuex'

  export default {
    name: "MemoApp",
    ...,
    created() {
      this.fetchMemos()
    },
    methods: {
      // 2. mapActions 헬퍼 함수에 사용할 actions 함수를 주입한다.
      ...mapActions([
        'fetchMemos'
      ]),
    },
    computed: {
      ...mapState([ 'memos', 'editingId' ])
    }
  }
</script>
```



## 3. Vuex에 메모 데이터 추가하기

```js
// src/store/mutations-types.js

...,
export const ADD_MEMO = 'ADD_MEMO'
```

```js
// src/store/mutations.js

import { 
  FETCH_MEMOS, 
  ADD_MEMO
} from './mutations-types'

export default {
  [ADD_MEMO] (state, payload) {
    state.memos.push(payload)
  }
}
```

```js
// src/store/actions.js

import { 
  ...,
  ADD_MEMO
} from './mutations-types'


// 1. MemoApp 메소드의 코드를 그대로 옯겨온다.
export function addMemo ({ commit }, payload) {
    
  // 2. ADD_MEMO 변이를 호출하고 API를 통해 받아온 메모 데이터를 넘겨준다.
  memoAPICore.post('/', payload)
    .then(res => {
      commit(ADD_MEMO, res.data)
    })
    .catch((err) => {
      console.log(`${err}가 발생했어요...ㅎ`)
    })
}
```

```vue
// src/components/MemoApp.vue

<script>
  import MemoForm from "./MemoForm";
  import Memo from "./Memo";
  import axios from 'axios';

  import { mapActions, mapState, mapMutations } from 'vuex'
  import { SET_EDITING_ID, RESET_EDITING_ID } from '../store/mutations-types'

  export default {
    name: "MemoApp",
    ...,
    methods: {
      ...mapActions([
        'fetchMemos',
        'addMemo',
      ])
    }
  }
</script>
```



## 4. Vuex에 메모 데이터 삭제 기능 구현하기

```js
// src/store/mutations-types.js

...,
export const DELETE_MEMO = 'DELETE_MEMO'
```

```js
// src/store/mutations.js

import { 
  ...,
  DELETE_MEMO
} from './mutations-types'

export default {
  ...,
  [DELETE_MEMO] (state, id) {
    const targetIndex = state.memos.findIndex(v => v.id === id)
    state.memos.splice(targetIndex, 1)
  },
}
```

```js
// src/store/actions.js

import { 
  ..., 
  DELETE_MEMO
} from './mutations-types'

export function deleteMemo ({ commit }, id) {
  memoAPICore.delete(`/${id}`)
    .then(() => {
      commit(DELETE_MEMO, id)
    })
    .catch((err) => {
      console.log(`${err}가 떴습니다...ㅎ`)
    })
}
```

```vue
// src/components/MemoApp.vue

<script>
  ...,
  import { mapActions, mapState } from 'vuex'

  export default {
    name: "MemoApp",
    ...,
    methods: {
      ...mapActions([
        'fetchMemos',
        'addMemo',
        'deleteMemo'
      ])
    }
  }
</script>
```



## 5. Vuex에 데이터 수정 기능 구현하기

```js
// src/store/mutations-types.js

...,
export const UPDATE_MEMO = 'UPDATE_MEMO'
```

```js
// src/store/mutations.js


export default {
  ...,
  [UPDATE_MEMO] (state, payload) {
    const { id, content } = payload
    const targetIndex = state.memos.findIndex(v => v.id === id)
    const targetMemo = state.memos[targetIndex]
    state.memos.splice(targetIndex, 1, { ...targetMemo, content })
  }
}
```

```js
// src/store/actions.js

import { 
  FETCH_MEMOS, 
  ADD_MEMO, 
  DELETE_MEMO, 
  UPDATE_MEMO 
} from './mutations-types'

...,
export function updateMemo ({ commit }, payload) {
  const { id, content } = payload
  memoAPICore.put(`/${id}`, { content })
    .then(() => {
      commit(UPDATE_MEMO, payload)
    })
    .catch((err) => {
      console.log(`${err}가 떴습니다...ㅎ`)
  })
}
```

```vue
// src/components/MemoApp.vue

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'

  export default {
    name: "MemoApp",
    ...,
    methods: {
      ...mapActions([
        'fetchMemos',
        'addMemo',
        'deleteMemo',
        'updateMemo',
      ])
  }
</script>
```



## 6. 메모의 개수 구현하기

```js
// src/store/states.js

export default {
  ...
  editingId: 0
}
```

```js
// src/store/mutations-types.js

...
export const SET_EDITING_ID = 'SET_EDITING_ID';

export const RESET_EDITING_ID = 'RESET_EDITING_ID';
```

```js
// src/store/mutations.js

export default {
  ...
    
  [SET_EDITING_ID] (state, id) {
    state.editingId = id
  },

  [RESET_EDITING_ID] (state) {
    // 수정 중인 데이터가 없는 경우는 임의의 초기화값 0으로 설정한다.
    state.editingId = 0
  }
}
```

```vue
// src/components/Memo.vue

<script>
export default {
  name: "Memo",
  props: {
    ...
    // 1. 부모 컴포넌트로부터 내려받은 editingId에 대한 props를 추가한다.
    editingId: {
      type: Number
    }
  },
    
  // 2. 부모로부터 내려받은 props를 통해 현재의 메모가 수정 중인 여부를 computed를 통해 계산한다.
  computed: {
    isEditing () {
      return this.memo.id === this.editingId
    }
  },
  methods: {
    deleteMemo () {
      const id = this.memo.id
      this.$emit('deleteMemo', id)
    },
    handleDblClick () {
      this.$emit('setEditingId', this.memo.id)
      this.$nextTick(() => {
        this.$refs.content.focus()
      })
    },
    handleBlur () {
      this.$emit('resetEditingId')
    },
    updateMemo (e) {
      const id = this.memo.id
      const content = e.target.value.trim()
      if (content === '') return
      this.$emit('updateMemo', { id, content })
      this.$refs.content.blur()
    }
  }
  }
</script>
```

```vue
// src/components/MemoApp.vue

<template>
  <div class="memo-app">
    ...
    <ul class="memo-list">
      <memo v-for="memo in memos"
            ...
            :editingId="editingId"  />
    </ul>
  </div>
</template>


<script>
  ...

  export default {
    name: "MemoApp",
    ...
    computed: {
      // 1. editingId 값을 mapState를 통해 컴포넌트에 등록한다.
      ...mapState([ 'memos', 'editingId' ])
    },
  }
</script>
```

```vue
// src/components/Memo.vue

<script>
export default {
  name: "Memo",
  ...,
  methods: {
    ...
    // 1. 컴포넌트 내의 isEditing 데이터를 수정하는 코드를 삭제한다.
    handleDblClick () {
      this.$emit('setEditingId', this.memo.id)
      this.$nextTick(() => {
        this.$refs.content.focus()
      })
    },
        
    // 2. 컴포넌트 내의 isEditing 데이터를 수정하는 코드를 삭제한다.
    // 3. blur 이벤트가 발생될 때, ID값을 초기화시켜주는 부모의 이벤트 리스너를 실행한다.
    handleBlur () {
      this.$emit('resetEditingId')
    },
    updateMemo (e) {
      const id = this.memo.id
      const content = e.target.value.trim()
      if (content === '') return
        
      // 4. 컴포넌트 내의 isEditing 데이터를 수정하는 코드를 삭제한다.
      this.$emit('updateMemo', { id, content })
      // 5. 수정완료 후, 인풋에서 포커스를 제거한다.
      this.$refs.content.blur()
    }
  }
  }
</script>
```

```vue
// src/components/MemoApp.vue

<template>
  <div class="memo-app">
    ...
    <ul class="memo-list">
      <!-- 2. 자식 컴포넌트인 메모 컴포넌트에 mapMutations 헬퍼 함수로 매핑된 각각의 함수를 이벤트 리스너로 			  등록한다. -->
      <memo v-for="memo in memos"
           ...
            @setEditingId="SET_EDITING_ID"
            @resetEditingId="RESET_EDITING_ID"
            />
    </ul>
  </div>
</template>


<script>
  ...,
  import { SET_EDITING_ID, RESET_EDITING_ID } from '../store/mutations-types'

  export default {
    name: "MemoApp",
    ...,
    methods: {
      ...,
      // 1. mapMutations 헬퍼 함수를 통해 수정 중인 ID값을 설정/해제하는 변이 함수를 컴포넌트에 매핑한다.
      ...mapMutations([
        SET_EDITING_ID,
        RESET_EDITING_ID,
      ])
    }
  }
</script>
```

