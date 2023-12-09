//Finds the first or last occurence of a number in an array.
const binSearchBoundary = (arr, search, {findFirst=true}={}) =>{

  //first and last idx are used for calculating the middle Idx.
  //that's all.
  let lastIdx = arr.length - 1;
  let firstIdx = 0;

  let boundary;

  let adjacent = (-1);
  if(!findFirst) adjacent = (+1);

  while(boundary === undefined){
    // Middle range is used for checking values.
    let middleIdx = Math.floor((lastIdx + firstIdx)/2);

    // search is not in the array.
    if(arr.at(-1)<search) {
      return (-1);
    }


    // middleIdx is higher than search, move lastIdx
    // to the left of the middleIdx.
    if(arr[middleIdx]>search) lastIdx = middleIdx-1;

    // middleIdx is lower than search, move firstIdx
    // to the right of the middleIdx.
    if(arr[middleIdx]<search) firstIdx = middleIdx+1

    // if middleIdx matches, ...
    if(arr[middleIdx]===search){

      // check right or left of it to see if it is a boundary.
      // If not, move index pointers to the middleIdx.
      if(
          arr[middleIdx + adjacent] !== search //||
        ){boundary = middleIdx}
      else
        (adjacent<0)?
          lastIdx = middleIdx :
          firstIdx = middleIdx
    }
  }
  return boundary;
}

const sortedFrequency = (arr, num)=>{
  const firstNumIdx = binSearchBoundary(arr, num);
  const lastNumIdx = binSearchBoundary(arr, num, {findFirst:false})

  return (firstNumIdx === -1 && lastNumIdx === -1)?(-1) :
         (lastNumIdx - firstNumIdx)+1;
}

module.exports = sortedFrequency
