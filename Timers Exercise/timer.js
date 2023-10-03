const countdown = (n)=>{
	const decrement = (n)=>{
		if (n === 0)
			console.log("DONE!")
		else
			console.log(--n)
	}
	setTimeout(decrement, 1000)
}
