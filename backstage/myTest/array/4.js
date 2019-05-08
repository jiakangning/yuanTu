function euniqF (arr) {
  return [...(new Set([...arr]))]
}
const arr = [1, 3, 2,4324,4,6,4,5,5]
let res = euniqF(arr)
console.log(res)