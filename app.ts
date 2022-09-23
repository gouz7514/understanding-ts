// const person: {
//   name: string
//   age: number
// } = {
//   name: 'Kim',
//   age: 30
// }

const person = {
  name: 'Kim',
  age: 30,
  hobbies: ['Sports', 'Cooking']
}

let favoriteActivites: string[]
favoriteActivites = ['sports']

console.log(person.name)

for(const hobby of person.hobbies) {
  console.log(hobby)
}