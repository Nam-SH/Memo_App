# memo-application

> NAM-SH's Vue.js project



## 0. 서론

- 해당 프로젝트는 `vue`를 활용해 메모 어플리케이션을 만다는 것이다.
- `Bootstrap`과 `css`를 활용해 디자인을 구성하였다.
- 카멜케이스(`camelCase`), 파스칼케이스(`PascalCase`), 스네이크 케이스(`snake_case`), 케밥 케이스(`kebab-case`) 중 `convention`인 케밥 케이스(`kebab-case`)를 사용하였다.
- 해당 메모 어플리케이션은 Storage를 사용하지 않고 API서버를 사용했으며, Storage의 수정된 부분만 작성하였다.



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

