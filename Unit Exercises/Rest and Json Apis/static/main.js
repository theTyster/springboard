"use strict";

// Utilities
const sel = param => document.querySelector(param);
const make = elem => document.createElement(elem);
const flavor = sel('#cupcake-flavor');
const size = sel('#cupcake-size');
const rating = sel('#cupcake-rating');
const image = sel('#cupcake-rating');
const form = sel('form');
const cupcakesList = sel('#cupcakes-list')


const main = async ()=>{

	// GET THE CUPCAKES
const	cupcakes = await axios({
		method: 'GET',
		url: '/api/cupcakes',
	})

	console.log(cupcakes.data)

	// BUILD THE LIST OF CUPCAKES
	const ol = make('ol');
	
	for (const cupcake of cupcakes.data.cupcakes){
		const li = make('li');
		li.innerHTML = `<p>Flavor: ${cupcake.flavor}</p><p>Size: ${cupcake.size}</p><p>Rating:${cupcake.rating}</p><p>Image:${cupcake.image}</p><br>`
		ol.appendChild(li);
	}

	cupcakesList.appendChild(ol);

	// ATTACH FORM EVENT LISTENER
	form.addEventListener('submit', formSubmit);
}


	const formSubmit = async e =>{
		e.preventDefault();

		// DATA SHAPE
		const data = {
			'flavor': flavor.value,
			'size': size.value,
			'rating': rating.value,
			'image': image.value
		}

		console.log('Sent Data:',data);

		// SEND DATA
		const result = await axios({
			method: 'POST',
			url: '/api/cupcakes',
			data: data
		});
		
		// LOG RESPONSE
		console.log('Response Data:', result);
		window.location.reload()
	}


document.addEventListener("DOMContentLoaded", main);
