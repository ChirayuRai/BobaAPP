/************************************\
 TODO

 Add authorization flow
 Create a related db that handles usernames and only gets information for a specific user
 
\************************************/
const express = require("express");
const app = express();
// db is a seperate file which says which database to connect to 
const pool = require("./db");
// beginString is a placeholder for tracking api
var beginString = "/track-boba/api/v1";
app.use(express.json()); // => req.body

// ROUTES //

//get all items
app.get(beginString + "/all-items", async(req, res) => {
	try {
		const allBoba = await pool.query("SELECT * FROM track_boba");

		res.json(allBoba.rows);
	} catch (err) {
		console.error(err.message);
	}
});

//get count of all items where *blank* = *blank*
app.get(beginString + "/all-items/count/where/:key/:value", async(req, res) => {
	try {
		const specificBoba = await pool.query("SELECT COUNT(*) FROM track_boba WHERE " + 
		String(req.params.key) + " = \'" + String(req.params.value) + "\'");

		res.json(specificBoba.rows);
	} catch (err) {
		console.error(err.message);
	}
});

//get count of all items 
app.get(beginString + "/all-items/count/", async(req, res) => {
	try {
		const specificBoba = await pool.query("SELECT COUNT(*) FROM track_boba");

		res.json(specificBoba.rows);
	} catch (err) {
		console.error(err.message);
	}
});

//get all items where *blank* = *blank*
app.get(beginString + "/all-items/where/:key/:value", async(req, res) => {
	try {
		const specificBoba = await pool.query("SELECT * FROM track_boba WHERE " + 
		String(req.params.key) + " = \'" + String(req.params.value) + "\'");

		res.json(specificBoba.rows);
	} catch (err) {
		console.error(err.message);
	}
});


//create an item
app.post(beginString + "/create-item", async (req, res) => {
	try {
		const { store } = req.body;
		const { tea_type } = req.body;
		const { topping_type } = req.body;
		const { cost } = req.body;
		
		const newItem = await pool.query(
			"INSERT INTO track_boba (store, tea_type, topping_type, cost, ts) VALUES ($1, $2, $3, $4, current_timestamp) RETURNING *",
			[store, tea_type, topping_type, cost]
		);

		res.json(newItem.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//delete an item where *blank* = *blank* (will probably use primary key)
app.delete(beginString + "/delete/:key/:value", async(req, res) => {
	try {
		const deleteBoba = await pool.query("DELETE FROM track_boba WHERE " + 
		String(req.params.key) + " = \'" + String(req.params.value) + "\'");

		res.json("Row was succesfully deleted!)");
	} catch (err) {
		console.error(err.message);
	}
});

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});
