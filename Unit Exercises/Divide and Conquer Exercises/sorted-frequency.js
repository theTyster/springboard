const sortedFrequency = (arr, num)=>{
  let lastIdx = arr.length - 1;
  let firstIdx = 0;
  let numCount;

  while(!numCount){
  let middleIdx = Math.floor((lastIdx + firstIdx)/2);

    // num is not in the array
    if(arr[lastIdx]<num) return (-1);

    // middleIdx is to high move lastIdx down
    if(arr[middleIdx]>num) lastIdx = middleIdx-1;
    // middleIdx is to low move firstIdx up 
    if(arr[middleIdx]<num) firstIdx = middleIdx+1

    if(arr[middleIdx]===num){
      if(arr[middleIdx]-1 === num) firstIdx = middleIdx-1

    }

  }
}

module.exports = sortedFrequency
