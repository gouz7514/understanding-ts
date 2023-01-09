# understanding-ts

- 타입스크립트는 타입을 추론할 수 있다 ([정적 타이핑](https://poiemaweb.com/typescript-typing))
- 타입스크립트 타입은 컴파일 중에 확인되는 반면, 자바스크립트 타입은 런타임 중에 확인된다
```
Q : 자바스크립트 타입 (예. typeof 'Max' => 'string')과 타입스크립트 타입 (예. const name: string = '...')의 차이?
A : 타입스크립트 타입은 컴파일 중에 확인되는 반면, 자바스크립트 타입은 런타임 중에 확인된다
```

#### object
모든 js 객체는 모두 객체 타입이지만 ts에서는 더 구체적인 객체도 있다

```typescript
const person = {
  name: 'Kim',
  age: 30
}

console.log(person.name)
```
![typescript object](https://user-images.githubusercontent.com/41367134/191870296-bfcfb5fb-9239-45c7-947c-88aad14be128.png)

위와 같이 person에 커서를 올리면, 이 내용들이 person에 저장된 데이터의 타입이라고 추론하는 것을 볼 수 있다.<br/>
이 내용은 자바스크립트 객체(key : value)가 아닌 타입스크립트가 추론한 **객체 타입**이다. 즉 key : type 쌍이다.

![typescript object 인식](https://user-images.githubusercontent.com/41367134/191870726-ce5c1f9b-2609-4bbd-9121-e8742c7ace29.png)

위와 같이 person의 type에 object라는 타입을 인식시키면 타입스크립트는 어떠한 정보도 주지 않는 객체가 있다고 이해한다. 따라서, 존재하는 키값이지만 에러 발생

객체에 대한 정보가 없으므로, 어떤 타입의 속성도 지원하지 않으므로 보다 구체적인 객체 타입을 지정해서 추론된 모든 것을 자동으로 입력하도록 지정해야 한다.
```typescript
const person: {
  name: string
  age: number
} = {
  name: 'Kim',
  age: 30
}

console.log(person.name)
```

#### array
배열 타입은 유연할 수도, strict 할 수도 있다
```typescript
const person = {
  name: 'Kim',
  age: 30,
  hobbies: ['Sports', 'Cooking']
}
```
위와 같이 hobbies를 지정하면 문자열들로 이루어진 배열 타입 `string[]`으로 인식함<br/>
자동으로 hobbies 내의 문자열들도 `string`타입으로 인식한다

#### tuple
길이와 타입이 고정된 배열

```typescript
const person : {
  name: string
  age: number
  hobbies: string[]
  role: [number, string]
} = {
  name: 'Kim',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author']
}
```

위와 같이 role 이라는 튜플을 정의해 명시적으로 첫번째는 number, 두번째는 string만 오도록 할 수 있다.<br/>
but, push는 에러 컴파일 안됨

#### enum
열거형으로 이름이 있는 상수들의 집합을 정의할 수 있다
```typescript
// app.ts
enum Role { ADMIN, READ_ONLY, AUTHOR }
```

```javascript
// app.js
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
```

시작 숫자를 0으로 시작하지 않으려는 경우 식별자에 등호 추가해서 가능
```typescript
enum Role { ADMIN = 5, READ_ONLY, AUTHOR }
```

이렇게 생성된 사용자 정의 enum을 참조해서 사용할 수 있다

#### any
어떤 값이 종류의 데이터가 어디에 저장될지 전혀 알 수 없는 경우에 대비하거나 런타임 검사를 수행하는 경우 런타임 도중 이처럼 특정 값에 수행하고자 하는 작업의 범위를 좁히기 위해 사용

#### union
서로 다른 두 종류의 값을 사용해야 하는 경우 유니언 타입을 사용해 두 타입중 하나를 사용해도 괜찮다는 것을 알릴 수 있다<br/>
but, 타입스크립트는 유니언 타입만 이해할뿐 유니언 타입 내에 무엇이 있는지는 분석하지 못한다

### 리터럴 타입
[리터럴 타입 - Gitbook](https://typescript-kr.github.io/pages/literal-types.html)<br />
유니언 타입의 구체적인 하위 타입

```typescript
// app.ts
function combine(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-text') { // resultConversion에 특정 문자열만 허용
  let result
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2
  } else {
    result = input1.toString() + input2.toString()
  }

  return result
}
```

### 타입 알리어스
복잡한 타입 정의나 원하는 타입 이름을 새롭게 정의해놓고 코드 어디서나 사용 가능

undefined와 void는 명확하게 구분해야 한다.<br/>
undefined는 하나의 유효한 타입<br/>
함수가 아무것도 반환하지 않는다면 void를 사용해야 한다

```typescript
// 아무것도 반환하지 않는 함수
function printResult(num: number) {
  console.log('Result : ' + num)
}
```

값을 반환하지 않는 함수를 사용하는 경우에는 void를 표준으로 사용하며, void를 명시적으로 지정할 수 있지만 타입스크립트는 이 코드를 추론할 수 있다

#### 함수 타입
함수의 매개변수와 반환값에 관련된 함수를 설명하는 함수<br/>
```typescript
function add(n1: number, n2: number) {
  return n1 + n2
}

// 이렇게 combineValues라는 변수가 2개의 number 파라미터를 받아 number를 반환하는 함수임을 나타낸다
let combineValues: (a: number, b: number) => number
```

#### 콜백
```typescript
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2
  cb(result)
}

addAndHandle(10, 20, (result) => {
  console.log(result)
})
```

callback 타입에 void를 지정함으로써 기본적으로 여기서 반환할 수 있는 모든 결과를 무시한다. 즉, callback 함수가 return 타입으로 아무 작업도 수행하지 않을 것이라고 입력

#### unknown
- 추가적인 검사를 통해 어떤 작업을 수행할지 명시할 수 있다.
- any의 문제점을 보완할 수 있다.
- 할 수 없는 작업을 알 수 있또록 타임 검사를 수행할 수 있다.

#### never
항상 오류를 출력하거나 리턴 값을 내보내지 않음<br/>
아무것도 반환하지 않는 것이 아닌 never를 반환하며 반환 값을 생성하지 않는다

```typescript
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code }
}
```

- `tsc` : 여러 파일을 한번에 컴파일
- `tsc -w` : 여러 파일을 한번에 watch

`tsconfig.json` 을 사용해 여러 컴파일 옵션을 설정할 수 있다 ([typescriptlang - tsconfig](https://www.typescriptlang.org/tsconfig))

- `exclude` : 컴파일에서 제외
- `include` : 컴파일에 포함

#### tsconfig 파보기
- `lib` : dom으로 작업을 수행하는 항목들, 즉 기본 객체, 기능, 타입스크립트 노드를 지정하게 해주는 옵션

> TypeScript includes a default set of type definitions for built-in JS APIs (like Math), as well as type definitions for things found in browser environments (like document). TypeScript also includes APIs for newer JS features matching the target you specify; for example the definition for Map is available if target is ES6 or newer.

즉, lib 설정을 통해 JS 내 API 들에 대해서 접근 가능하다

- `sourceMap` : true로 설정 시 `.js.map` 파일들이 생성된다. 이 파일들은 입력 파일에 자바스크립트 파일을 연결하는 최신 브라우저와 개발자 도구 간의 다리

> Enables the generation of sourcemap files. These files allow debuggers and other tools to display the original TypeScript source code when actually working with the emitted JavaScript files. Source map files are emitted as .js.map (or .jsx.map) files next to the corresponding .js output file.

- `outDir` : 컴파일된 js 파일들이 저장되는 디렉토리를 지정할 수 있다. (output)
- `rootDir` : 컴파일될 파일들의 경로 (input). 해당 디렉토리 구조를 그대로 복사한다.
- `removeComments` : 컴파일 시 주석이 제거된다. 용량 줄일 때 도움될 수 있음
- `noEmitOnError` : 에러 발생 시 자바스크립트로 컴파일하지 않는다
- `noImplicitAny` : 타입 선언이 되어 있지 않으면 any로 fallback. 변수의 경우는 괜찮으나 함수의 경우는 에러 발생한다
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
// noImpliCitAnhy : true -> 에러 발생
let logged

function sendAnalytics(data) { // 여기서 타입 선언이 되어 있지 않아 에러 발생
  console.log(data)
  logged = true
}

sendAnalytics('The data')
```

- `strictNullChecks` : true이면 요소가 null, undefined 타입일 경우 타입 에러 발생 가능
- `strictBindCallApply` : call, bind, apply가 올바른 파라미터와 쓰이는지 체크
- `noUnusedLocals`, `noUnusedParameters` : 사용하지 않은 지역 변수, 파라미터의 경우 warning 발생시킴
- `noImplicitReturns` : 결과를 return하지 않는 함수가 존재하면 warning

### class와 interface
객체 지향 프로그래밍에서는 프로그램을 수많은 '객체(object)' 라는 단위로 나누고 사용한다. class는 object의 청사진이 되는 개념으로, 클래스를 사용해 객체의 형태, 포함해야 하는 데이터, 어떤 메소드가 필요한지 정의할 수 있다.

즉, 객체는 클래스의 인스턴스이다.

```typescript
class Department {
  name: string

  constructor(n: string) {
    this.name = n
  }
}

const accounting = new Department('accounting')
```

#### 제어자
생성자(constructor) 생성을 통해 클래스와 연결시키며 객체에 대한 초기화 작업을 수행할 수 있다.

메소드를 통해 인스턴스의 데이터를 수정할 수 있는데 이 방식 외에 직접 수정을 방지해야 한다. 즉, 클래스 외부에서 필드에 접근하는 것을 허용해서는 안된다

```typescript
class Department {
  name: string
  private employees: string[] = []

  constructor(n: string) {
    this.name = n
  }
}


const accounting = new Department('accounting')
accounting.employees[0] = 'Kim' // 에러 발생
```
위와 같이 선언하면 클래스 외부에서 employees 필드에 접근할 수 없다

또한, 생성자 선언 부분을 축약해서 사용할 수 있다
```typescript
class Department {
  // private id: string
  // name: string
  
  constructor (private id: string, public name: string) {}
}
```

### 상속
`extends` 키워드를 사용해서 상위 클래스를 상속, 새로운 클래스를 선언 가능<br />
다른 클래스로부터 상속받는 클래스에 고유 생성자를 추가할 때마다 상속하는 클래스로 super를 추가하고 이를 함수처럼 실행해야 한다. 여기서 super는 기본 클래스의 생성자를 호출한다

```typescript
class Department {
  constructor(private id: string, public name: string) {}
}

class ITDepartment extends Department {
  admins: string[]
  
  constructor(id: string, admins: string[]) {
    super(id, 'IT') // 여기서 super는 Department의 파라미터인 id, name을 취한다
    this.admins = admins // 이후 다른 속성 할당 가능
  }
}
```

`super` 를 선언해 부모 클래스의 속성을 상속받은 뒤 다른 속성 할당 가능

- 기본 클래스의 메소드를 오버라이드할 수 있다
- 속성에 대한 접근을 `protected` 로 지정해야 상속받은 클래스에서 접근할 수 있다

#### 게터와 세터
비공개로 설정할 필요가 있는 속성을 private로 설정한 후, 이 속성에 접근하여 값을 읽거나, 쓰기 위한 Getter, Setter 함수를 사용하여 속성을 정의할 수 있다.

getter를 호출할 때는 메소드로서 호출 가능<br />
setter를 호출할 때는 값처럼 접근 해야 함