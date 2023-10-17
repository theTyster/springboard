const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const watermelon = document.querySelector(".watermelon-img");
const orange  = document.querySelector(".orange-img");

const clickInput = event =>{
	orange.style.opacity = 1;
	watermelon.style.opacity = 1;
	input.focus();
	if(window.visualViewport.width < 600)
		input.style.top = "-180px";
	else
		input.style.top = "-400px";

	input.style.minWidth = "200px";
	document.addEventListener("click", unclickAnywhere, {once:true});
}

//document.addEventListener("click", (e)=> console.log(e));

const dontUnclick = ["fruit-search flex-items", "orange-img flex-items", "watermelon-img flex-items", "suggestions"]

const unclickAnywhere = event =>{
	if(dontUnclick.every(elem=> event.target.className !== elem)){
		orange.style.opacity = 0;
		watermelon.style.opacity = 0;
		input.blur();
		input.style.minWidth = "0";
		input.style.top = "0";
		input.addEventListener("click", clickInput, {once:true});
	}
	else {
		document.addEventListener("click", unclickAnywhere, {once:true});
	}
	console.log(event);
}

function search(str) {
	let results = [];

	// TODO

	return results;
}

function searchHandler(e) {

}

function showSuggestions(results, inputVal) {

	// TODO
}

function useSuggestion(e) {
	// TODO
}

input.addEventListener("click", clickInput, {once:true});
input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
