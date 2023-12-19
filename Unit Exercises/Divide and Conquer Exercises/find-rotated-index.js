const findRotatedIndex = (arr, num)=>{
  let firstIdx, lastIdx, middleIdx, search;

  if(arr[0]>num){
    firstIdx = Math.ceil(arr.length/2);
    lastIdx = arr.length -1;
  }
  if(arr[0]<num){
    firstIdx = 0;
    lastIdx = Math.ceil(arr.length/2)-1;
  }

  while(search===undefined){
    middleIdx = Math.floor((lastIdx + firstIdx)/2);

    if(arr[middleIdx] === num){search = middleIdx}
    else if(arr[middleIdx -1] === num){search = middleIdx -1}
    else if(arr[middleIdx +1] === num){search = middleIdx +1}
    else if(arr[middleIdx]<num && arr[middleIdx -1]>num){search = -1}
    else if(arr[middleIdx]>num && arr[middleIdx +1]<num){search = -1}
    else if(arr[middleIdx]>num && arr[middleIdx -1]>num){search = -1}
    else if(arr[middleIdx]<num && arr[middleIdx +1]<num){search = -1}
    else if(arr[middleIdx]<num){firstIdx = middleIdx}
    else if(arr[middleIdx]>num){lastIdx = middleIdx}
  }
  return search;
}

module.exports = findRotatedIndex
