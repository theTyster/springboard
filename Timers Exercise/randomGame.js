"use strict";

let main = () => {

	let num = undefined;
	let counter = 0;

	let timer = setInterval(()=>{
		num = Math.random();
		counter++;

	if (num > .75){
		clearInterval(timer);
		console.log(counter)
	}

	}, 1000)

}

main();
