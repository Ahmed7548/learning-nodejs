const mongodb = require("mongodb");
require("dotenv").config()

let mongoConnectin = process.env.mongodbConnection 

const { MongoClient } = mongodb;

const client = new MongoClient(
	`${mongoConnectin}`
	);


let _db;

const mongoConnect = (newClient) => async (cb) => {
	try {
		const client = await newClient.connect();
		_db = await client.db();
		cb();
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const getDb = _=> {
	if (_db) {
		return _db;
	}
	throw " No database found! ";
};

module.exports = { mongoConnect: mongoConnect(client), getDb };
