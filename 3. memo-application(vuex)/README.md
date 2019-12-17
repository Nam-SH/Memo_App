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

```

```

### 1.4 store을 main.js에 삽입

```

```



## 2. Vuex에 데이터 저장한 후 노출 기능 구현하기



## 3. Vuex에 메모 데이터 추가하기



## 4. Vuex에 메모 데이터 삭제 기능 구현하기



## 5. Vuex에 데이터 수정 기능 구현하기



## 6. 메모의 개수 구현하기



## 7. 수정버튼 focus 및 blur 구현하기