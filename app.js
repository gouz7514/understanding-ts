// const person: {
//   name: string
//   age: number
// } = {
//   name: 'Kim',
//   age: 30
// }
var person = {
    name: 'Kim',
    age: 30,
    hobbies: ['Sports', 'Cooking']
};
var favoriteActivites;
favoriteActivites = ['sports'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
}
