const findRotationCount = (arr)=>{

  //This function reduces an array to three items that I have named logarithmic
  //pointers. These three items are used to determine whether the array
  //needs to be halfed again to find the boundary of the rotation.

  // Logarithmic pointers.
  let firstIdx = 0;
  let lastIdx = arr.length - 1;
  let middleIdx = Math.floor((lastIdx + firstIdx)/2);

  // The thing we are looking for.
  let boundary;

  // Reduces the array to 3 items finds the lowest and highest.
  const sample = [arr[firstIdx], arr[middleIdx], arr[lastIdx]];
  let lowest = arr.indexOf(Math.min(...sample));
  let highest = arr.indexOf(Math.max(...sample));

  // Unrotated array case
  if (firstIdx === lowest && lastIdx === highest) return (0);
  // Inverted Array case
  if (firstIdx === highest && lastIdx === lowest) return arr.length;


  while(boundary === undefined){
    middleIdx = Math.floor((lastIdx + firstIdx)/2);

    // The lowest value in the sample is only 2 away from the highest value. In
    // this scenario all three pointers are right next to each other in the
    // array. 
    // The index of the lowest value is equal to the number of times the array
    // has been rotated.
    if (lowest-2 === highest) boundary = lowest;

    // Compares the log pointers to the highest and lowest values in the sample.
    // Moves the first or last pointer to the middle position depending on which
    // value is the lower or higher value of the array.  Effectively halfing the
    // array everytime there is not a match.
    if (firstIdx === highest && middleIdx === lowest) lastIdx = middleIdx;
    if (firstIdx === lowest && middleIdx === highest) lastIdx = middleIdx;
    if (lastIdx === highest && middleIdx === lowest) firstIdx = middleIdx;
    if (lastIdx === lowest && middleIdx === highest) firstIdx = middleIdx;
  }
  return boundary;
}

module.exports = findRotationCount

