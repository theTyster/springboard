import axios from "axios"
import $ from "jquery"

class BoggleGame{
	constructor(){
		this.score = 0;
		this.guesses = [];
	}

	get guessFormData(){
		return new FormData($("form")[0]);
	}

	get guess(){
		return $("input").val();
	}

	set guess(string){
		if(typeof(string) === "string") $("input").val(string);
		else throw TypeError;
	}

	async requestGuessResults(){
			try{
				const request = await axios({
					method: "post",
					url: "/",
					data: this.guessFormData,
				});
				return request.data.result;
			}
			catch(e){
				console.error(`Submitting guess resulted in an error: ${e}`)
				return undefined;
			}
	}

	async displayGuessResults(){
		const guessResults = await this.requestGuessResults();
		switch(guessResults){
			case "not-word":
				alert("That word is not in the dictionary.");
				$("#guessed_words").append(`<p style="color:red;">${this.guess}</p>`);
				this.guess = "";
				break;
			case "not-on-board":
				alert("That word is not on the board.");
				$("#guessed_words").append(`<p style="color:red;">${this.guess}</p>`);
				this.guess = "";
				break;
			case "ok":
				$("#score").text(this.score += this.guess.length);
				$("#guessed_words").append(`<p style="color:green;">${this.guess}</p>`);
				this.guess = "";
				break;
		}
	}

	async requestStats(){
		try{
			const request = await axios({
				method: "post",
				url: "/",
				headers:{
					'Content-Type': 'application/json'
					},
				data: JSON.stringify({
					type: 'game over',
					score: this.score,
					guesses: this.guesses,
				})
			});
			return request.data
		}
		catch(e){
			console.error(`Unable to connect to Database. ${e}`)
			return undefined;
		}
	}

	async displayStats(){
		const stats = await this.requestStats();
		for (let key in stats){
			$('#stats_body').append(
				`<tr>
					<td>${key}</td>
					<td>${stats[key].score}</td>
					<td>${stats[key].guesses}</td>
				<tr>`
			)
		}
	}

	async startTimer(){
		let timer = 60;
		while (timer >= 0){
			await new Promise(r=>setTimeout(()=>r(), 1000));
			$("#timer").text(timer);
			timer--;
		}
		//TIMER DISABLES INPUT AFTER COMPLETION 
		//AND DISPLAYS STATS RESULTS
		$("input")[0].disabled= true
		await this.displayStats();

	}

	addNewGuess(){
		if (!this.guesses.includes(this.guess)){
			this.guesses.push(this.guess);
		}
		else{
			alert("You have already guesssed that word.");
			$("input").val("");
			return
		}
	}

	async startGame(){
		this.startTimer();
	}

	async submitGuess(){
		this.addNewGuess();
		this.displayGuessResults();
	}

}

export default BoggleGame;
