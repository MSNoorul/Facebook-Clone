
const date1 = new Date('2019/02/10')
const date2 = new Date('2019')
const mill = Math.abs(date2 - date1);
let diff = (mill /(1000 *60*60*24));
console.log(Math.ceil(diff));