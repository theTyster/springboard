"use strict";
import $ from "jquery"
import BoggleGame from './boggle.js'


document.addEventListener("DOMContentLoaded", main)


async function main(){
	const bog = new BoggleGame();

	$("form").on("submit", async (e)=>{
		e.preventDefault();
		bog.submitGuess();
	});
	await bog.startGame();
}

