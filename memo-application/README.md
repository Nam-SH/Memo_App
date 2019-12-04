# memo-application

> NAM-SH's Vue.js project



## 0. 서론

- 해당 프로젝트는 `vue`를 활용해 메모 어플리케이션을 만다는 것이다.
- `Bootstrap`과 `css`를 활용해 디자인을 구성하였다.
- 카멜케이스(`camelCase`), 파스칼케이스(`PascalCase`), 스네이크 케이스(`snake_case`), 케밥 케이스(`kebab-case`) 중 `convention`인 케밥 케이스(`kebab-case`)를 사용하였다.





## 1. 프로젝트 생성

### 1.1 컴포넌트 구조

![image](https://user-images.githubusercontent.com/50367487/69913110-02de2c80-1477-11ea-8531-7dd631115c06.png)



### 1.2 프로젝트 구성

```bash
# 1. 환경 구축
$ vue init webpack-simple memo-application

# 2. 파일 이동 및 필요모듈 설치
$ cd memo-application
$ cd npm install 	# or npm i <필요 모듈>

# 3. 서버 실행
$ cd npm run dev
```



### 1.3 `reset.css` 생성

```
# 파일구조
└─memo-application
    │  README.md
    │  ...               
    └─src
        │  App.vue
        │  ...
        ├─ components
        │      ...
        └─ styles
                reset.css
```

```css
// src/styles/reset.css

@import "https://use.fontawesome.com/releases/v5.6.3/css/all.css";
body {
  background-color: #f5f5f5;
}

html, body, div, input, fieldset, form, h1, p, textarea, button {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

textarea {
  border: none;
  resize: none;
}

li {
  list-style: none;
}
```

#### 1.3.1 `App.vue`의 ` style`에  `reset.css` 입력

```vue
// src/App.vue

...
<style>
@import "./styles/reset.css";

#app {
  width: 560px;
  margin: 0 auto;
}

</style>
```



### 1.4 헤더 컴포넌트 생성(`AppHeader`)

```
# 파일구조
└─memo-application
    │  README.md
    │  ...
    │                      
    └─ src
        │  App.vue
        │  ... 
        ├─ components
        │      AppHeader.vue
        │      ...
        └─ styles
```

```vue
// src/components/AppHeader.vue

<template>
  <div class="app-header">
    <h1>메모 애플리케이션</h1>
  </div>
</template>


<script>
  export default {
    name: 'AppHeader',
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
```

#### 1.4.1 `App.vue` 파일의 `script`영역에  `AppHeader`입력

```vue
// src/App.vue

<script>
import AppHeader from './components/AppHeader';
...

export default {
  name: 'app',
  components: { 
    AppHeader,
    ...
  }
}
</script>
```

#### 1.4.2 `App.vue`파일의 `template`영역에 `AppHeader`입력

```vue
// src/App.vue

<template>

  <div id="app">
    <app-header/>
    ...
  </div>

</template>
```



### 1.5  중간결과

![image](https://user-images.githubusercontent.com/50367487/69928022-aa05a700-14fd-11ea-8399-84975d15d37c.png)



## 2. LocalStorage

### 2.1 CRUD - Create

```
// 파일 구조

└─memo-application
    │  README.md
    │  ...
    │                      
    └─src
        │  App.vue
        │  ...
        ├─ components
        │      AppHeader.vue
        │      Memo.vue
        │      MemoApp.vue
        │      MemoForm.vue
        │      
        └─styles
```

- `MemoForm`에 메모 데이터를 추가하는 기능을 넣는다.
- `Memo`에 메모 데이터 수정 및 삭제 기능을 넣고, 메모리스트를 보여주는 기능을 넣는다.
- `MemoForm`과 `Memo`를 `single file component`로 컴포넌트를 생성한 뒤 `MemoApp`에 컴포넌트로 등록해준다.

#### 2.1.1 `MemoApp.vue`의 `template`부분

```vue
// src/components/MemoApp.vue

<template>
  <div class="memo-app">
    <!-- v-on 디렉티브를 이용해서, addMemo 이벤트 콜백함수로 연결한다. -->
    <memo-form @addMemo="addMemo" />
    ...
  </div>
</template>
```

#### 2.1.2 `MemoApp.vue`의 `script`부분

```vue
// src/components/MemoForm.vue

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
  }
</script>
```

#### 2.1.3 `MemoForm.vue`의 `script`부분

```vue
// src/components/MemoForm.vue

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

        // 고유 ID를 생성한다. 
        // (getTime() 메서드는 표준시에 따라 지정된 날짜의 시간에 해당하는 숫자 값을 반환)
        const id = new Date().getTime()
        if (title === '') return
        if (content === '') return

        // addMemo이벤트를 발생시키고, 부모 컴포넌트인 MemoApp에 { id, title, content }를 넘긴다.(emit)
        this.$emit('addMemo', { id, title, content })

        // 부모 컴포넌트에 데이터를 전송한 후 데이터를 원래 상태로 돌려놓는다.
        this.resetFields()
      }
    }
  }
</script>
```

##### 2.1.3.1 `MemoForm.vue`의 `style`

```vue
// src/components/MemoForm.vue

<!-- scoped옵션을 사용해서 해당 컴포넌트에만 스타일이 적용될 수 있도록 하였다. -->

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
```



### 2.2. CRUD - Read

#### 2.2.1 `Memo.vue`의 `template`와 `script` 부분

```vue
// src/components/Memo.vue

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

    // MemoApp에서 v-for을 통해 memo를 받았으니, 사용을 위해 props에 등록한다.
    props: {
      memo: {
        type: Object
      }
    },
  }
</script>
```

##### 2.2.1.1 `Memo.vue`의 `style`부분

```vue
// src/components/Memo.vue

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
```



#### 2.2.2 `MemoApp.vue`의 `template`부분

```vue
// src/components/MemoApp.vue

<template>
  <div class="memo-app">

    <!-- v-on 디렉티브를 이용해서, addMemo 이벤트 콜백함수로 연결한다. -->
    <memo-form @addMemo="addMemo" />
  
    <ul class="memo-list">
      <!-- v-for을 활용해 memo의 수만큼 Memo컴포넌트를 렌더한다. -->
      <memo v-for="memo in memos" :key="memo.id" :memo="memo" />
    </ul>

  </div>
</template>
```

##### 2.2.2.1 `MemoApp.vue`의 `style`부분

```vue
// src/components/MemoApp.vue

<style>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>
```



### 2.3. CRUD - Delete

#### 2.3.1 `MemoApp.vue`의 `template`부분

```vue
// src/components/Memo.vue

<template>
  <li class="memo-item">
    <strong> {{ memo.title }} </strong>
    <p> {{ memo.content }} </p>
      
    <!-- 클릭이벤트 리스너로  deleteMemo 함수를 등록한다. -->
    <button type="button" @click="deleteMemo"><i class="fas fa-times"></i></button>
  </li>
</template>
```

#### 2.3.2  `Memo.vue`의 `style`부분

```vue
// src/components/Memo.vue


<script>
  export default {
    name: "Memo",
    // MemoApp에서 v-for을 통해 memo를 받았으니, 사용을 위해 props에 등록한다.
    props: {
      memo: {
        type: Object
      }
    },
    methods: {
      deleteMemo () {
        // Memo컴포넌트는 직접적인 삭제를 하지 않고, 삭제의 책임을 부모 컴포넌트(MemoApp)에 위임하되, 
        // 인자로 삭제하려는 고유ID를 넘긴다.
        const id = this.memo.id
        this.$emit('deleteMemo', id)
      },
    }
  }
</script>
```

#### 2.3.3 `MemoApp.vue`의 `template`부분

```vue
// src/components/MemoApp.vue

<template>
  <div class="memo-app">

    <!-- v-on 디렉티브를 이용해서, addMemo 이벤트 콜백함수로 연결한다. -->
    <memo-form @addMemo="addMemo" />
  
    <ul class="memo-list">
      <!-- v-for을 활용해 memo의 수만큼 Memo컴포넌트를 렌더한다. -->
      <memo v-for="memo in memos" :key="memo.id" :memo="memo" @deleteMemo="deleteMemo" />
    </ul>

  </div>
</template>
```

#### 2.3.4 `MemoApp.vue`의 `script`부분

```vue
// src/components/MemoApp.vue

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
      ...
    },
    created() {
      ...
    },
    methods: {
      addMemo (payload) {
        ...
      },
      storeMemo() {
        ...
      },
      deleteMemo(id) {
        // findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환한다
        const targetIndex = this.memos.findIndex(v => v.id === id)
        console.log('deleteMemo => targetIndex:', targetIndex)

        // splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경함
        // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        // deleteCount가 0 이하면 어떤 요소도 제거하지 않음. 이 때는 최소한 하나의 새로운 요소를 지정해야 함
        // 여기서 deleteCount의 값이 1이므로, targetIndex를 포함해 1개를 삭제만 함
        this.memos.splice(targetIndex, 1)
        this.storeMemo()
      },
    }
  }
</script>
```



### 2.4. CRUD - Update

#### 2.4.1 `MemoApp.vue`의 `template`부분

```vue
// src/components/MemoApp.vue

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
```

#### 2.4.2 `MemoApp.vue`의 `script`부분

```vue
// src/components/MemoApp.vue

<script>
  export default {
    // beforeUpdate () { console.log("beforeUpdate => ", this.$refs.content) }, //=> undefined
    // updated () { console.log("Updated => ", this.$refs.content) },
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
          ...
      },

      handleDblClick () {
        // 더블 클릭했을 경우 수정상태를 true로 바꾼다.
        this.isEditing = true

        // console.log('this.$refs.content', this.$refs.content) //=> undefined
        
        // 데이터의 변화에 따라 DOM이 재렌더링 된 이후인 updated에서는 대상 DOM이 감지됨
        // nextTick(): 다음 DOM 업데이트 사이클 이후 실행하는 콜백을 연기합니다. DOM 업데이트를 
        // 기다리기 위해 일부 데이터를 변경한 직후 사용해야 합니다.
        this.$nextTick(() => {
          // 메모 수정용 인풋 영역이 활성화되면, 인풋 영역에 자동으로 포커스가 잡혀서 사용자가 바로 수정할 
          // 수 있도록, focus 이벤트를 추가한다.
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

      // blur 이벤트가 발생하면, 인풋 창이 사라지고 메모의 내용 또한 바뀌지 않은 것을 확인 할 수 있다.
      handleBlur () {
        this.isEditing = false;
      },
    }
  }
</script>
```





## 3. 서버와 API 연동