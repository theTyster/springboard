const findFloor=(arr, num)=> {
  let firstIdx = 0;
  let lastIdx = arr.length;
  let middleIdx = Math.floor((lastIdx-firstIdx)/2);
  let floor;

  const sample = [arr[firstIdx], arr[middleIdx], arr[lastIdx], ]

  while (floor===undefined){

  }
}

console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 5)); // 2
//console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 20)); // 19
//console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 0)); // -1
module.exports = findFloor
