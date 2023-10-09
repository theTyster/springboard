				"use strict"; document.addEventListener("DOMContentLoaded", async ()=>{ let [r,g,b]= Array(3).fill(()=>0); let rgb = ()=>`rgb(${r()}, ${g()}, ${b()})`; let sleep = async (s) =>{ await new Promise((r)=>{ setTimeout(()=>{ r(); }, s*1000); }); } r = ()=>205; await sleep(2);


	//1.
	document.getElementById("container")


				.style.backgroundColor = rgb(); [g, b] = [()=>92, ()=>92]; await sleep(2);


	//2.
	document.querySelector("#container")


				.style.backgroundColor = rgb(); await sleep(2); for (let i of


	//3.
	document.querySelectorAll("li.second")


				){ [r,g,b] = [()=>25, ()=>25, ()=>112]; i.style.color = rgb(); await sleep(1); } [r,g,b] = Array(3).fill(()=>203);


	//4.
	document.querySelector("ol .third")


				.style.color = rgb(); await sleep(2);


	//5.
	document.querySelector("#container").innerText = "Hello!";


				await sleep(1);


	//6.
	document.querySelector(".footer").classList.add("main");


				console.log(document.querySelector(".footer").classList); await sleep(2);



	//7.
	document.querySelector(".footer").classList.remove("main");


				console.log(document.querySelector(".footer").classList); await sleep(2); document.querySelector("#container").innerHTML = '<ul> <li class="first">one</li> <li class="second">two</li> <li class="third">three</li> </ul> <ol> <li class="first">one</li> <li class="second">two</li> <li class="third">three</li> </ol>'


	//8.
	let liElem = document.createElement("li");


				console.log(liElem); await sleep(2);


	//9.
	liElem.innerText = "four";


				console.log(liElem); await sleep(2);


  //10.
	document.querySelector("ul").append(liElem);


				await sleep(2);


	//11.
	for (let i of document.querySelectorAll("ol li")){
		i.style.backgroundColor = "green";
		await sleep(1);
	}


	//12. 
	document.querySelector(".footer").remove();


				console.log(document.querySelector(".footer")); })
