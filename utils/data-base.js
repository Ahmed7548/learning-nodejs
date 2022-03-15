const mongodb = require("mongodb");

const { MongoClient } = mongodb;

const client = new MongoClient(
	"mongodb+srv://Ahmed:ahmed%401234567@cluster0.8sjle.mongodb.net/shop?retryWrites=true&writeConcern=majority"
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
