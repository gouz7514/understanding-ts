# 타입스크립트 컴파일러 
- `tsc` : 여러 파일을 한번에 컴파일
- `tsc -w` : 여러 파일을 한번에 watch

### tsconfig 파보기
`tsconfig.json` 을 사용해 여러 컴파일 옵션을 설정할 수 있다 ([typescriptlang - tsconfig](https://www.typescriptlang.org/tsconfig))

- `exclude` : 컴파일에서 제외
- `include` : 컴파일에 포함

#### compilerOptions
타입스크립트 코드가 컴파일되는 방식을 관리한다

- `target` : 컴파일된 코드가 어떤 버전의 자바스크립트를 지원할지 결정한다
- `lib` : dom으로 작업을 수행하는 항목들, 즉 기본 객체, 기능, 타입스크립트 노드를 지정하게 해주는 옵션
  - lib가 설정되어 있지 않으면 기본 설정은 target에 따라 달라진다.

> TypeScript includes a default set of type definitions for built-in JS APIs (like Math), as well as type definitions for things found in browser environments (like document). TypeScript also includes APIs for newer JS features matching the target you specify; for example the definition for Map is available if target is ES6 or newer.

- `allowJs` : 타입스크립트가 자바스크립트 파일을 컴파일할 수 있도록 한다. 즉, 자바스크립트 파일을 import 해서 사용할 수 있다. 이 옵션은 타입스크립트를 사용하지 않고 일부 기능의 장점을 취하고자 할때 유용하다.
- `sourceMap` : sourcemap file들을 생성한다. 이 파일들은 생성된 자바스크립트 파일이 작동할 때, 디버거와 다른 툴들이 원래의 타입스크립트 파일을 표시할 수 있도록 한다. 
- `outDir` : 컴파일된 js 파일들이 저장되는 디렉토리를 지정할 수 있다. (output)
- `rootDir` : 컴파일될 파일들의 경로 (input). 해당 디렉토리 구조를 그대로 복사한다.
- `removeComments` : 컴파일 시 주석이 제거된다. 용량 줄일 때 도움될 수 있음
- `noEmitOnError` : 에러 발생 시 자바스크립트로 컴파일하지 않는다. 하나의 파일에 에러가 있다면 모든 파일이 컴파일되지 않는다.

**strict options**
- `noImplicitAny` : 타입 선언이 되어 있지 않으면 any로 fallback. 변수의 경우는 괜찮으나 함수의 경우는 에러 발생한다
- 
```typescript
// noImplicitAny : false -> 에러 발생 x
let logged

function sendAnalytics(data) {
  console.log(data)
  logged = true
}

sendAnalytics('The data')
```

```typescript
// noImpliCitAny : true -> 에러 발생
let logged

function sendAnalytics(data) { // 여기서 타입 선언이 되어 있지 않아 에러 발생
  console.log(data)
  logged = true
}

sendAnalytics('The data')
```

- `strictNullChecks` : true이면 요소가 null, undefined 타입일 경우 타입 에러 발생 가능
```typescript
// strictNullChecks: true
// const button = document.querySelector('button')
// button이 null일 수도 있기 때문에 에러 발생

// 이를 해결하기 위해 ! 를 사용
// !는 타입스크립트가 개발자에게 이 요소가 존재하거나 연산이 null이 아닌 값을 반환한다는 걸 알 수 있게 해준다
const button = document.querySelector('button')!

button.addEventListener('click', () => {
  console.log('Clicked!')
})
```

- `strictBindCallApply` : call, bind, apply가 올바른 파라미터와 쓰이는지 체크

**코드 품질 옵션**
- `noUnusedLocals`, `noUnusedParameters` : 사용하지 않은 지역 변수, 파라미터의 경우 warning 발생시킴
- `noImplicitReturns` : 결과를 return하지 않는 함수가 존재하면 warning