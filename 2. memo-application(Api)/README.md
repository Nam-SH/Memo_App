# memo-application (API)

> NAM-SH's Vue.js project



## 0. 서론

- 해당 프로젝트는 `vue`를 활용해 메모 어플리케이션을 만드는 것이다.
- 카멜케이스(`camelCase`), 파스칼케이스(`PascalCase`), 스네이크 케이스(`snake_case`), 케밥 케이스(`kebab-case`) 중 `convention`인 케밥 케이스(`kebab-case`)를 사용하였다.
- 메모 애플리케이션을 NodeJS 기반의 백엔드 서버에서 제공해주는 RESTful API와 연동하였다.
- Storage Version의 수정된 부분만 작성하였다.



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



## 2. API

### 2.0  사전 준비

#### 2.0.1 API 서버 다운로드

- https://github.com/CanDoVueJS/RESTful-api-server에 접속 후 `git clone`을 하거나, 
- `memo-application`와 같은 위치에 있는 `RESTful-api-server`를 사용한다.
- `cd RESTful-api-server`  =>  클론받은 프로젝트의 디렉토리로 이동한다.
- `npm install`  =>  프로젝트에서 사용할 패키지를 설치한다.
- `npm install -g sequelize-cli`  =>  Sequelize CLI를 전역으로 설치
- `PORT=8000 npm run dev`  =>  서버를 실행한다.
- 서버를 실행 시킨 후 `http://localhost:8000/api/memos`로 접속하면 된다.

#### 2.0.2 `axios` 설치하기

- `npm`을 이용한 `axios` 설치

  ```bash
  $ npm install axios --save
  ```

- `axios` 사용을 위해 `script`부분에 추가

  ```vue
  <Script>
  import axios from 'axios';
  ...    
  </Script>
  ```

  

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
        └─ styles
```

#### 2.1.1 `MemoApp.vue`의 `script`부분의 `addMemo` 수정

```vue
// src/components/MemoApp.vue

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
        
        // API 서버에서 새로 등록된 메모 데이터의 ID를 생성하기 때문에, 
        // 임의의 ID를 클라이언트에서 생성할 필요가 없다.
        // const id = new Date().getTime()

        const { title, content } = this

        if (title === '') return
        if (content === '') return
        this.$emit('addMemo', { title, content })
        this.resetFields()
      }
    }
  }
</script>
```



#### 2.1.2 `MemoForm.vue`의 `script`부분의 `addMemo` 수정

```vue
// src/components/MemoForm.vue

<script>
  import MemoForm from "./MemoForm";
  import Memo from "./Memo";
  import axios from 'axios';

  const memoAPICore = axios.create({
    baseURL: "http://localhost:8000/api/memos"
  })

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
    created() {
      memoAPICore.get('/')
        .then(res => {
          console.log('res', res)
          this.memos = res.data
        })
    },
    methods: {

      addMemo (payload) {
        memoAPICore.post('/', payload)
          .then(res => {
            this.memos.push(res.data)
          })
      },
    }
  }
</script>
```



### 2.2 CRUD - Read (수정할 사항 없음)



### 2.3 CRUD - Delete

#### 2.3.1 `MemoApp.vue`의 `script`부분의 deleteMemo 수정

```vue
// src/components/MemoApp.vue

<script>
  ...
  import axios from 'axios';

  const memoAPICore = axios.create({
    baseURL: "http://localhost:8000/api/memos"
  })

  export default {
    name: "MemoApp",
    components: {
      ...
    },
    data() {
      return {
        memos: [],
      };
    },
    created() {
      ...
    },
    methods: {

      addMemo (payload) {
        ...
      },

      deleteMemo (id) {
        const targetIndex = this.memos.findIndex(v => v.id === id)

        // 1. 인자로 받은 메모id를 사용하여 deleteAPI를 호출
        memoAPICore.delete(`${id}`)
          .then(() => {

            // 요청이 정상적으로 처리됬다면 memos배열에서 해당 메모를 삭제한다.
            this.memos.splice(targetIndex, 1)
          })
          .catch((err) => {
            console.log(`${err}가 떴습니다...ㅎ`)
          })
      },

    }
  }
</script>
```



### 2.4 CRUD - Update

#### 2.4.1 `MemoApp.vue`의 `script`부분의 updateMemo 수정

```vue
// src/components/MemoApp.vue

<script>
  ...
  import axios from 'axios';

  const memoAPICore = axios.create({
    baseURL: "http://localhost:8000/api/memos"
  })

  export default {
    name: "MemoApp",
    components: {
      ...
    },
    data() {
      return {
        memos: [],
      };
    },
    created() {
      ...
    },
    methods: {

      addMemo (payload) {
        ...
      },

      deleteMemo (id) {
        ...
      },

      updateMemo (payload) {
        const { id, content } = payload
        const targetIndex = this.memos.findIndex(v => v.id === id)
        const targetMemo = this.memos[targetIndex]
        memoAPICore.put(`/${id}`, { content })
          .then(() => {
            this.memos.splice(targetIndex, 1, { ...targetMemo, content })
          })
          .catch((err) => {
            console.log(`${err}가 떴습니다...ㅎ`)
          })
      },
    }
  }
</script>
```

#### 

### 2.5 댓글 수 추가

- `MemoForm`과 `Memo` 컴포넌트들을 감싸고 있는 `MemoApp` 컴포넌트가 가지고 있는 `memos`에 대한 정보, 이 메모 개수에 대한 데이터를 루트 컴포넌트인 `App` 컴포넌트에 보낸 뒤, 이 데이터를 `AppHeader`컴포넌트에 전해줘야 한다.

##### 2.5.1  `App.vue`의 `template`부분에 `change`이벤트 추가

```vue
// src/App.vue

<template>

  <div id="app">
    <app-header :memo-count="memoCount" />

    <!-- change이벤트가 발생하면 updateMemoCount이벤트를 호출한다. -->
    <memo-app @change="updateMemoCount" />
  </div>

</template>
```

##### 2.5.2 `App.vue`의 `script`부분에 `memoCount`의 데이터와 메서드 추가

```vue
// src/App.vue

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

```

##### 2.5.3 `MemoApp`의 `script` 부분

```vue
// src/components/MemoApp.vue

<script>
  ...
  import axios from 'axios';

  const memoAPICore = axios.create({
    baseURL: "http://localhost:8000/api/memos"
  })

  export default {
    name: "MemoApp",
    components: {
      ...
    },
    data() {
      return {
        memos: [],
      };
    },
    created() {
      ...
    },
    methods: {

      addMemo (payload) {
        memoAPICore.post('/', payload)
          .then(res => {
            this.memos.push(res.data)

            // 메모의 갯수가 변동되면, change이벤트를 호출한다.
            this.$emit('change', this.memos.length)
          })
          .catch((err) => {
            console.log(`${err}가 발생했어요...ㅎ`)
          })
      },

      deleteMemo (id) {
        const targetIndex = this.memos.findIndex(v => v.id === id)

        // 1. 인자로 받은 메모id를 사용하여 deleteAPI를 호출
        memoAPICore.delete(`${id}`)
          .then(() => {

            // 요청이 정상적으로 처리됬다면 memos배열에서 해당 메모를 삭제한다.
            this.memos.splice(targetIndex, 1)

            // 메모의 갯수가 변동되면, change이벤트를 호출한다.
            this.$emit('change', this.memos.length)
          })
          .catch((err) => {
            console.log(`${err}가 떴습니다...ㅎ`)
          })
      },

      updateMemo (payload) {
        ...
      },
    }
  }
</script>
```

##### 2.5.4 `AppHeader`의 `template`부분

```vue
// src/components/AppHeader.vue

<template>
  <div class="app-header">
    <h1>메모 애플리케이션</h1>
    {{ memoCount }}
  </div>
</template>
```

##### 2.5.5 `AppHeader`의 `script`부분

```vue
// src/components/AppHeader.vue

<script>
  export default {
    name: 'AppHeader',

    // memos의 갯수에 대하여 memos.lenth를 이용하여 직접 참조하면 두 컴포넌트 간의 의존성을 강하게 
    // 만들기 때문에 피하는 것이 좋다.
    // 두 컴포넌트는 같은 모델을 공유하기 위해 각각 자기 자신의 모델을 가지고 동기화하는 방향으로 짠다.
    props: {
      memoCount: {
        type: Number,
        default: 0,
      }
    }
  };
</script>
```



## 3. 결과 모습

### 3.1 CURD - Read부분 (Request Method => GET)

![1  API_Read](https://user-images.githubusercontent.com/50367487/70326453-f93e3580-1877-11ea-8db8-b8035e165ad4.PNG)



### 3.2 CURD - Create부분 (Request Method => POST)

![2  API_Create](https://user-images.githubusercontent.com/50367487/70326454-f93e3580-1877-11ea-8233-518f51bfdb54.PNG)



### 3.3 CURD - Update부분 (Request Method => PUT)

![3  API_Update](https://user-images.githubusercontent.com/50367487/70326455-f9d6cc00-1877-11ea-8f57-1c4cc172f61e.PNG)



### 3.4 CURD - Delete부분 (Request Method => DELETE)

![4  API_Delete](https://user-images.githubusercontent.com/50367487/70326456-f9d6cc00-1877-11ea-8a62-45ef0e954212.PNG)