// const person: {
//   name: string
//   age: number
// } = {
//   name: 'Kim',
//   age: 30
// }

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

person.role.push('admin')

let favoriteActivites: string[]
favoriteActivites = ['sports']

console.log(person.name)

for(const hobby of person.hobbies) {
  console.log(hobby)
}