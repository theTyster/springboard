"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
	let select = (item)=> document.querySelector(item);

	//Page Tags
	let page = {
		form: select("form"),
		input: select("input"),
		formButton: select(".form-button"),
		list: select("ul"),
		listItems: select("ul>li"),
	}

	let newEl = (tag)=> document.createElement(tag);
	let itemNumber = 0;

	//creates elements and adds to the dom
	let createTodoItem = (item)=>{
		// Creates the item in the DOM
		let li = newEl("li");
		let deleteBtn = newEl("button");
		let completeBtn = newEl("button");

		//Saves the item in memory
		localStorage.setItem(`item${itemNumber}`, page.input.value);
		li.dataset.itemNo = itemNumber++;

		li.innerText = item;
		deleteBtn.innerText = "delete";
		completeBtn.innerText = "complete";

		page.list.append(li);
		li.append(completeBtn);
		li.append(deleteBtn);
	}

	// checks localstorage
	for (let i in {...localStorage}){
		createTodoItem(localStorage.getItem(i))
	}


	page.formButton.addEventListener("click", (e)=>{
		e.preventDefault(); // prevents page from refreshing.


		createTodoItem(page.input.value)

	})


	page.list.addEventListener("click", (e)=>{
		let num = e.target.parentElement.dataset.ItemNo
		switch(e.target.innerText){
			case("delete"):{
				e.target.parentElement.remove()
				localStorage.removeItem(`item${num}`)
				break;
			}
			case("complete"):{
				e.target.parentElement.style.textDecoration === "line-through" ? e.target.parentElement.style.textDecoration = "none": e.target.parentElement.style.textDecoration = "line-through";
				break;
			}
		}
	})

})
