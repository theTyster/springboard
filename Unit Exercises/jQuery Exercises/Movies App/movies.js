"use strict";

$("button").on("click", (e)=>{
	e.preventDefault();
	const $title = $("input").eq(0).val();
	const $rating = $("input").eq(1).val();

	$("body").first().append(`<p>${$title} | ${$rating}</p>`);
	$("body").first().append("<button class='delete'>Delete</button>");
})

$("body").on("click", ".delete", (e)=>{
$(e.target.previousElementSibling).remove()
$(e.target).remove();
});
