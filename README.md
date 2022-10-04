# understanding-ts

### 220922
- 타입스크립트는 타입을 추론할 수 있다 ([정적 타이핑](https://poiemaweb.com/typescript-typing))
- 타입스크립트 타입은 컴파일 중에 확인되는 반면, 자바스크립트 타입은 런타임 중에 확인된다
```
Q : 자바스크립트 타입 (예. typeof 'Max' => 'string')과 타입스크립트 타입 (예. const name: string = '...')의 차이?
A : 타입스크립트 타입은 컴파일 중에 확인되는 반면, 자바스크립트 타입은 런타임 중에 확인된다
```

### 220923
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

### 220924
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

### 220927
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

### 220929
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

### 221004
#### 함수 타입
함수의 매개변수와 반환값에 관련된 함수를 설명하는 함수<br/>
```typescript
function add(n1: number, n2: number) {
  return n1 + n2
}

// 이렇게 combineValues라는 변수가 2개의 number 파라미터를 받아 number를 반환하는 함수임을 나타낸다
let combineValues: (a: number, b: number) => number
```