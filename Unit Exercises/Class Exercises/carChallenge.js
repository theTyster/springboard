"use strict";

class Vehicle {
	constructor(make, model, year){
		this.make = make;
		this.model = model;
		this.year = year;
	}
	honk(){
		return "Beep";
	}
	toString(){
		return `This vehicle is a ${this.year} ${this.make} ${this.model}.`;
	}
}

class Car extends Vehicle{
	constructor(make, model, year){
		super(make, model, year);
		this.numWheels = 4;
	}
}

class Motorcycle extends Vehicle{
	constructor(make, model, year){
		super(make, model, year);
		this.numWheels = 2;
	}
	revEngine(){
		return "VROOM!!!"
	}
}

class Garage{
	constructor(capacity){
		this.vehicles = []
		this.capacity = capacity;
	}
	add(vehicle){
		//adds a vehicle if it is an instance of the Vehicle Class
		if (vehicle instanceof Vehicle){
			if(this.vehicles.length < this.capacity){
				this.vehicles.push(vehicle);
				return "Vehicle added!"
			}
			else return "Sorry, we're full."
		}
		else return "Only vehicles are allowed in here!";
	}
}
