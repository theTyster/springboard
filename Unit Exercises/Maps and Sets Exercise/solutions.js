"use strict";


///////////////////////////////////////////////////////

new Set([1,1,2,2,3,4]);
//Set(4) {1,2,3,4}

///////////////////////////////////////////////////////

[...new Set("referee")].join("");
//'ref'

///////////////////////////////////////////////////////

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

m.entries()
// [Map Entries] {[[1,2,3], true], [[1,2,3], false]};

///////////////////////////////////////////////////////

const hasDuplicate = arr => !(new Set(arr).size === arr.length)

///////////////////////////////////////////////////////

let vowelCount = str => {
	return str.toLowerCase().split("").reduce((acc, cv) => {
		if("aeiou".includes(cv)){
			console.log(cv)
			if(acc.has(cv)){
				acc.set(cv, acc.get(cv)+1);
				console.log(acc);
				return acc;
			}
			else{
				acc.set(cv, 1);
				return acc;
			}
		}
		return acc;
	}, new Map())
}

///////////////////////////////////////////////////////
