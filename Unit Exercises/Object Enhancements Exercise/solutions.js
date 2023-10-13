"use strict";

//1
const createInstructor = (firstName, lastName) => ({firstName,lastName})

//2
let favoriteNumber = 42;

const instructor = {
  firstName: "Colt"
}
instructor[favoriteNumber] = "That is my favorite!"


const instructor = {
  firstName: "Colt",
  sayHi(){
    return "Hi!";
  },
  sayBye(){
    return this.firstName + " says bye!";
  }
}


const createAnimal = (animal, noise, sound) => ({species: animal, [noise](){return sound}})

const dogObj = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
dogObj.bark()  //"Woooof!"

const sheepObj  = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
sheepObj.bleet() //"BAAAAaaaa"

