const countZeroes = arr => {
  let lastIdx = arr.length - 1;
  let firstIdx = 0;
  let zeroCount;

  // SEARCH FOR THE POINT OF DIVERGENCE BETWEEN 0'S AND 1'S 
  while(zeroCount===undefined){
  let middleIdx = Math.floor((lastIdx + firstIdx)/2);

    //ALL VALUES ARE EQUAL
    if(arr[firstIdx] === arr[lastIdx]){
      if (arr[middleIdx] === 0) zeroCount = arr.length;
      if (arr[middleIdx] === 1) zeroCount = 0;
    }

    // FOUND THE POINT OF DIVERGENCE
    if(arr[middleIdx] + arr[middleIdx +1] === 1){
      zeroCount = (arr.length - middleIdx)-1;
    }
    // MIDDLE VALUE IS ADJACENT TO A 1 MOVE firstIdx UP THE ARRAY
    else if(arr[middleIdx] + arr[middleIdx +1] === 2){firstIdx = middleIdx}
    // MIDDLE VALUE IS ADJACENT TO A 0 MOVE lastIdx DOWN THE ARRAY
    else if(arr[middleIdx] + arr[middleIdx +1] === 0)lastIdx = middleIdx
  }
  return zeroCount;

}

module.exports = countZeroes
