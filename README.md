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