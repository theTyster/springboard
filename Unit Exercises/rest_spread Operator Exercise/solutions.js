const filterOutOdds = (...args) => args.filter(e => e % 2 === 0);


const findMin = (...args) => args.reduce((acc, cv)=> acc < cv? acc: cv, args[0])


let mergeObjects = (...args) => args.reduce((acc, cv) => {
	for (let i in cv){
		acc[i]=cv[i]
	}
	return acc;
},{})


const doubleAndReturn = (arr, ...args) => [...arr, ...args.map((e)=> e*2)];


/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = items =>{
	const ran = Math.random() * items.length;
	items.splice(ran, 1);
	return items;
}


/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => [...array1, ...array2]

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => ({...obj, [key]: val})


/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
	delete obj[key];
	return obj;
}



/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => ({...obj1, ...obj2})



/** Return a new object with a modified key and value. */

const update = (obj, key, val) => ({...obj, [key]:val})
