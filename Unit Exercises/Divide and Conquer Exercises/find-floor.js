const findFloor=(arr, num)=> {

  //This function reduces an array to three items that I have named logarithmic
  //pointers. These three items are used to determine whether the array
  //needs to be halfed again to find floor number in the array.

  // Logarithmic pointers.
  let firstIdx = 0;
  let lastIdx = arr.length -1;
  let middleIdx = Math.floor((lastIdx + firstIdx)/2);

  let sample = [arr[firstIdx], arr[middleIdx], arr[lastIdx]]
  let highest = Math.max(...sample);
  let lowest = Math.min(...sample);

  // Nothing lower than num
  if(num < lowest) return -1;
  // num is highest
  if(num > highest) return highest;

  // The thing we are looking for.
  let floor;

  while (floor===undefined){
    middleIdx = Math.floor((lastIdx+firstIdx)/2);
    sample = [arr[firstIdx], arr[middleIdx], arr[lastIdx]]
    highest = Math.max(...sample);
    lowest = Math.min(...sample);

    // Exact match case
    for (let sampleItem of sample)
      if (sampleItem === num) floor = sampleItem;

    // Array has been reduced to it's smallest form. lowest value is returned.
    if (middleIdx === firstIdx && highest > num) floor = lowest;

    if (arr[middleIdx] > num) lastIdx = middleIdx;
    if (arr[middleIdx] < num) firstIdx = middleIdx;
  }
  return floor
}

module.exports = findFloor
