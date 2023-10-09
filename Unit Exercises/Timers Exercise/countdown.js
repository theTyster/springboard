const countdown = (n)=>{
	const timer =	setInterval(()=>{
		console.log(n--);
		if (n === 0){
			console.log("DONE!")
			clearTimeout(timer);
		}

	}, 1000);
}
countdown(10);
