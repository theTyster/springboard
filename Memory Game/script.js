document.addEventListener("DOMContentLoaded", ()=>{

  //UTILS
  const newElem = (elem)=>document.createElement(elem);
  const select = (elem)=> document.querySelector(elem);
  const selectAll = (elem)=> document.querySelectorAll(elem);
  const shuffle = (array)=>{
    let count = array.length;
    while(count){
      let ran = Math.floor(Math.random() * count--);
      [array[ran], array[count]] = [array[count], array[ran]]
    }
    return array;
  }

  //PAGE TAGS
  const page = {
    gameContainer: select("#game"),
  }

  //Objects/Arrays
  const covers = [
    "cards/Adventure_Time:_Marceline_and_the_Scream_Queens_Issue_1_item_0_full.jpg",
    "cards/Adventure_Time:_Summer_Special_2013_Issue_1_item_4_full.jpg",
    "cards/Adventure_Time:_The_Flip_Side_Issue_4_item_3_full.jpg",
    "cards/Issue_10_item_5_full.jpg",
    "cards/Issue_2_item_1_full.jpg",
    "cards/Issue_2_item_2_full.jpg",
    "cards/Issue_2_item_4_full.jpg",
    "cards/Issue_4_item_1_full.jpg",
    "cards/Adventure_Time:_Marceline_and_the_Scream_Queens_Issue_1_item_0_full.jpg",
    "cards/Adventure_Time:_Summer_Special_2013_Issue_1_item_4_full.jpg",
    "cards/Adventure_Time:_The_Flip_Side_Issue_4_item_3_full.jpg",
    "cards/Issue_10_item_5_full.jpg",
    "cards/Issue_2_item_1_full.jpg",
    "cards/Issue_2_item_2_full.jpg",
    "cards/Issue_2_item_4_full.jpg",
    "cards/Issue_4_item_1_full.jpg",
  ];

  // TODO: Implement this function!
  function handleCardClick(event) {
    console.log("you just clicked", event.target);
  }

  const createDivsForCovers = function(coverArray) {
    for (let cover of coverArray) {
      console.log(cover)

      let img = newElem("img");
      img.src = cover;

      // call a function handleCardClick when a div is clicked on
      img.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      page.gameContainer.append(img);
    }
  }

let shuffledCovers = shuffle(covers);

createDivsForCovers(shuffledCovers);
})
