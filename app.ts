// const person: {
//   name: string
//   age: number
// } = {
//   name: 'Kim',
//   age: 30
// }

// const person : {
//   name: string
//   age: number
//   hobbies: string[]
//   role: [number, string]
// } = {
//   name: 'Kim',
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author']
// }

// const ADMIN = 0
// const READ_ONLY = 1
// const AUTHOR = 2

enum Role { ADMIN = 5, READ_ONLY, AUTHOR }

const person = {
  name: 'Kim',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
}

let favoriteActivites: string[]
favoriteActivites = ['sports']

console.log(person.name)

for(const hobby of person.hobbies) {
  console.log(hobby)
}

if (person.role === Role.ADMIN) {
  console.log('is admin')
}