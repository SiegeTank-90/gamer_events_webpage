import express from "express";

// convert the id from string to object for the _id
import { ObjectId, UUID } from 'mongodb';

import db from '../db/connection.js'; // Import the database connection

// initialize the router will handle routes as the middleware
const router = express.Router();


// wire-up routes to
router.get('/', async function (req, res) {

    res.send("Welcome To Express Server").status(200); // Return the collections
})

// this section will find a single player by their username
router.get('/players/:email/:password', async (req, res) => {
    let collection = await db.collection('users_players') // Get the collection of players from database 
    try {
        let query = { 'email': req.params.email, 'password': req.params.password }; // Create a query to find the user by email and password
        let results = await collection.find(query).toArray(); // Get player by email and password
        if (results.length === 0) {
            res.status(404).send("Player not found"); // If no player found, return 404
        } else {
            res.send(results).status(200); // Return the collections
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});

router.get('/players/:playerName', async (req, res) => {
    let collection = await db.collection('users_players'); // Get the collection of players from database
    try {
        let query = { 'playerName': req.params.playerName }; // Create a query to find the user by playerName
        let results = await collection.find(query).toArray(); // Find the user in the collection
        if (results.length === 0) {
            res.status(404).send("Player not found"); // If no player found, return 404
        } else {
            res.send(results).status(200); // Return the collections
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});

// display all matches the player is currently involved in
router.get('/matches/:playerName', async (req, res) => {
    let collection = await db.collection('matches'); // Get the collection of  matches from database
    let query = { 'PlayerIDs.playerName': { $eq: req.params.playerName } }; // Create a query to find the user by id
    let user = await collection.find(query).toArray(); // Find the user in the collection
    res.send(user).status(200); // Return the matches of the user
});

router.post('/matches', async (req, res) => {
    let ObjectIdentifaction = new ObjectId();
    let stringObjectId = ObjectIdentifaction.toString();
    try {
        console.log("Request Body: ", req.body);
        let newDocument = {
            matchName: req.body.matchName,
            gameName: req.body.gameName,
            storeName: req.body.storeName,
            PlayerIDs: [{ playerName: req.body.PlayerIDs[0].playerName, discordId: req.body.PlayerIDs[0].discordId }
                , { playerName: req.body.PlayerIDs[1].playerName, discordId: req.body.PlayerIDs[1].discordId }
            ],
            matchDate: req.body.matchDate,
            matchStatus: "Pending",
            winner: "",
            uid: stringObjectId
        };
        let collection = await db.collection('matches'); // Get the collection of players in queue from database
        let result = await collection.insertOne(newDocument);
        res.send(result).status(200);  // Insert the new document into the collection
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});

router.put('/matches', async (req, res) => {
 
    let collection = await db.collection('matches'); // Get the collection matches
    let query = { uid: req.body.uid };
    let update = {'$set': {'matchDate': req.body.matchDate},};
    console.log(query);
    console.log(update);
    try {
        let result = await collection.updateOne(query,update);
        console.log(result);
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }

    console.log('completed put')

})

router.delete('/matches', async (req, res) => {
    let collection = await db.collection('matches'); // Get the collection matches
    let query = { uid: req.body.uid }
    
    try {
        let results = await collection.deleteOne(query);

    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
})



// get a list of stores for the player to choose from
router.get('/stores', async (req, res) => {
    let collection = await db.collection('users_stores'); // Get the collection of stores from database
    try {
        let results = await collection.find({}).toArray(); // Find the user in the collection
        res.send(results).status(200); // Return the stores of the user

    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});

// query for matching players in the queue
router.get('/queue/:gameName/:storeName', async (req, res) => {
    let collection = await db.collection('player_queue'); // Get the collection of players in queue from database
    try {
        let query = { 'gameName': req.params.gameName, 'storeName': req.params.storeName }; // Create a query to find the user by id
        let results = await collection.findOne(query); // Find the user in the collection
        console.log("Results: ", results);
        if (!results) {
            res.status(404).send("No matches found for the specified game and store adding to queue"); // If no matches found, return 404
        } else {
            res.send(results).status(200); // Return matching locations for the game and store
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});


// post a new instance of a player to the match queue
router.post('/queue', async (req, res) => {
    try {
        let newDocument = {
            playerName: req.body.playerName,
            gameName: req.body.gameName,
            storeName: req.body.storeName,
            playerId: req.body.playerId,
            discordId: req.body.discordId
        };
        let collection = await db.collection('player_queue'); // Get the collection of players in queue from database
        let result = await collection.insertOne(newDocument);
        res.send(result).status(200);  // Insert the new document into the collection
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});

// remove match from the player match queue
router.delete('/queue', async (req, res) => {
    let collection = await db.collection('player_queue'); // Get the collection player waiting to be matches from database
    let query = { playerId: req.body.playerId }; // Create a query to find the user by id

    try {
        let result = await collection.deleteOne(query); //
        res.send(result).status(204); // Return the newly created document
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});



// get list of games that matches can be made with
router.get('/games', async (req, res) => {
    let collection = await db.collection('games'); // Get the collection of games from database
    try {
        let games = await collection.find({}).toArray(); // Find all games in the collection
        res.status(200).json(games); // Return the games
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});



export default router;


