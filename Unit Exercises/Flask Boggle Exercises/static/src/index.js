"use strict";
import axios from 'axios'
import $ from 'jquery'

document.addEventListener("DOMContentLoaded", main)

async function main(){
	$('form').on('submit', checkForMatch);
	let timer = 3;

	while (timer >= 0){
		await new Promise(r=>setTimeout(()=>r(), 1000));
		$('#timer').text(timer);
		timer--;
	}
	$('input')[0].disabled= true
}

let score = 0
const guesses = [];

async function checkForMatch(e){
	e.preventDefault()

	const data = new FormData($('form')[0]);
	const guess = $('input').val();

	if (!guesses.includes(guess)){
		guesses.push(guess);
	}
	else{
		alert("You have already guesssed that word.")
		return
	}

	let result = await axios({
		method: 'post',
		url: '/',
		data: data,
	});

	result = result.data.result

	switch(result){
		case 'not-word':
			alert("That word is not in the dictionary.")
			break;
		case 'not-on-board':
			alert("That word is not on the board.")
			break;
		case 'ok':
			updateScore(guess);
			break;
	}
}

function updateScore(word){
	// TODO: Filter out multiple submissions from score.
	// 			 Possibly do this on the back-end to avoid user
	// 			 tampering.

	$('#score').text(score += word.length)
	$("#guessed_words").append(`<p>${word}</p>`)

}
