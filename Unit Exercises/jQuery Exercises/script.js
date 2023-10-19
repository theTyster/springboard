"use strict";

$(document).on("DOMContentLoaded", ()=> console.log("Time to party... something something jQuery.🎉"))

$("article img").addClass("image-center");

$("p").eq(-1).remove();

$("h1").css("font-size", Math.random() * 100);

$("<li>My assignment told me to do this.</li>").appendTo("ol");

$("aside").html("<p> Sorry about whoever made the list. It was dumb.</p>");

let getColor = ()=>{
	let color = (Array.from($("input")).reduce((acc,cv)=>{
		acc += (cv.value+", ");
		return acc;
	}, "rgb("));
	color = color.replace(/, $/, ")");
	return color;
}

$("input").on("keyup", ()=>$("body").css("background", getColor));

$("img").on("click", function(){
	$(this).remove();
})
