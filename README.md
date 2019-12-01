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

```

#### 1.3.1 `App.vue`에 `reset.css` 입력

```vue

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

```

#### 1.4.1 `App.vue` 파일의 `script`영역에  `AppHeader`입력

```vue

```

#### 1.4.2 `App.vue`파일의 `template`영역에 `AppHeader`입력

```vue

```





## 2. CRUD - Create



## 3. CRUD - Read



## 4. CRUD - Update



## 5. CRUD - Delete