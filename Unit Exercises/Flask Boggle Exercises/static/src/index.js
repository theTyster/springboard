"use strict";
import axios from "axios"
import $ from "jquery"

document.addEventListener("DOMContentLoaded", main)

//GLOBAL VARIABLES
let score = 5
const guesses = ['test','test','test','test',];

async function main(){
	$("form").on("submit", checkForMatch);
	let timer = 3;

	while (timer >= 0){
		await new Promise(r=>setTimeout(()=>r(), 1000));
		$("#timer").text(timer);
		timer--;
	}
	$("input")[0].disabled= true

	let stats = await axios({
		method: "post",
		url: "/",
		headers:{
			'Content-Type': 'application/json'
			},
		data: JSON.stringify({
			type: 'game over',
			score,
			guesses,
		})
	})
	stats = stats.data
	for (let key in stats){
		console.log(key, stats[key])
		$('#stats_body').append(`<tr><td>${key}</td><td>${stats[key].score}</td><td>${stats[key].guesses}</td><tr>`)
	}

}

async function checkForMatch(e){
	e.preventDefault()

	const data = new FormData($("form")[0]);
	const guess = $("input").val();

	if (!guesses.includes(guess)){
		guesses.push(guess);
	}
	else{
		alert("You have already guesssed that word.");
		$("input").val("");
		return
	}

	let result = await axios({
		method: "post",
		url: "/",
		data: data,
	});

	result = result.data.result

	switch(result){
		case "not-word":
			alert("That word is not in the dictionary.")
			$("input").val("")
			break;
		case "not-on-board":
			alert("That word is not on the board.")
			$("input").val("")
			break;
		case "ok":
			$("#score").text(score += word.length)
			$("#guessed_words").append(`<p>${word}</p>`)
			$("input").val("")
			break;
	}
}
