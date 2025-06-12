const array = [1, 2, 3, 4, 5];

// const dup = [];

// let count = 0;

// for (let i = 0; i < array.length; i++) {
//   if (array[i] == array[i + 1]) {
//     dup.push(array[i]);
//     count++;
//   }
// }

// console.log(count);
// console.log(dup);

// let n = 3;

// for (let j = 0; j < n; j++) {
//   let temp = array[0];

//   for (let i = 0; i < array.length; i++) {
//     array[i] = array[i + 1];
//   }

//   array[array.length - 1] = temp;
// }

// console.log(array);

// let sort = array.sort();

// console.log(sort[sort.length - 2]);

// let rev = [];

// for (let i = array.length - 1; i >= 0; i--) {
//   rev.push(array[i]);
// }

// console.log(rev);

// let name = "Hello";

// let n = "a";

// let rev = [];

// let count = 0;

// for (let i = name.length - 1; i >= 0; i--) {
//   rev = rev + name[i];

//   if (name[i] == n) {
//     ++count;
//   }
// }

// console.log(rev);

// console.log(count);

// let array = [1, 2, 3, 4, 5, 2, 3, 4, 1, 5];

// let sum = array.reduce((a, b) => a + b);

// console.log("Sum of the array elements:", sum);

// for (let i = 0; i < array.length; i++) {
//   for (let j = i + 1; j < array.length; j++) {
//     if (array[i] > array[j]) {
//       array[i] = array[i] + array[j];
//       array[j] = array[i] - array[j];
//       array[i] = array[i] - array[j];
//     }
//   }
// }

// console.log(array);

const double = array.map((num) => num * 2);
console.log(double);
const square = array.map((num) => num * num);
console.log(square);
