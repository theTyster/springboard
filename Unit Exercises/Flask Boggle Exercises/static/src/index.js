"use strict";
import axios from 'axios'
import $ from 'jquery'

document.addEventListener("DOMContentLoaded", main)

function main(){
	$('form').on('submit', checkForMatch);
}

let score = 0

async function checkForMatch(e){
	e.preventDefault()

	const data = new FormData($('form')[0]);
	const word = $('input').val();

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
			updateScore(word);
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
