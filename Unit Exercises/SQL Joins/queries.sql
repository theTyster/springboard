-- 1. Join the two tables so that every column and record appears, regardless of if there is not an owner_id .
SELECT * 
FROM owners 
JOIN vehicles ON owners.id = vehicles.owner_id;

-- 2. Count the number of cars for each owner. Display the owners first_name , last_name and count of vehicles. The first_name should be ordered in ascending order.
SELECT owners.first_name, owners.last_name, COUNT (vehihcles.owner_id)
FROM owners JOIN vehicles ON owners.id = vehicles.owner_id 
GROUP BY first_name, last_name
ORDER BY COUNT ASC;

-- 3. Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name , last_name, average price and count of vehicles. The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000. 
SELECT owners.first_name, owners.last_name, (AVG(vehicles.price)::INTEGER) AS avg_price, COUNT(vehicles.owner_id) AS number_vehicles
FROM owners 
JOIN vehicles ON owners.id = vehicles.owner_id 
GROUP BY first_name, last_name 
HAVING AVG(vehicles.price) > 10000
ORDER BY COUNT DESC; 
