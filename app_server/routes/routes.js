import express from "express";

// convert the id from string to object for the _id
import { ObjectId } from 'mongodb';

import db from '../db/connection.js'; // Import the database connection

// initialize the router will handle routes as the middleware
const router = express.Router();


// wire-up routes to
router.get('/', function (req, res) {
    res.send("Welcome to the Express Server!").status(200);
})

// this section will find a single player by their username
router.get('/dashboard', async (req, res) => {
    let collection = await db.collection('users_players') // Get the collection of players from database 
    try {
        let query = { email: req.param.username, password: req.param.password}; //  Create a query to find the user by username/password
        if (await collection.findOne(query)) {

            res.send(collection.findOne(query).status(200);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});

// display all matches the player is currently involved in
router.get('/:id/matches', async (req, res) => {
    let collection = await db.collection('matches'); // Get the collection of  matches from database
    try {
        let query = { "PlayerIDs.user_oid": req.param.playerId }; // Create a query to find the user by id
        let user = await collection.find(query); // Find the user in the collection
        if (user) {
            res.status(200).json(user.matches); // Return the matches of the user
        } else {
            res.status(404).send("No Matches Found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});


// get a list of stores for the player to choose from
router.get('/:id/stores', async (req, res) => {
    let collection = await db.collection('users_stores'); // Get the collection of stores from database
    try {
        let query = {"OpenTable": true }; // Create a query to find the user by id
        let stores = await collection.find(query).toArray(); // Find the user in the collection
        if (stores.length > 0) {
            res.status(200).json(stores); // Return the stores of the user
        } else {
            res.status(404).send("No Stores Found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});

// verify if the store has an open tables 
// post a new instance of a player to the match queue
router.post('/queue', async (req, res) => {
    try {
        let newDocument = {
          playerName: req.body.playerName,
          gameName: req.body.gameName,
          storeName: req.body.storeName,
          playerId: req.body.playerId 
        };
        let collection = await db.collection('player_queue'); // Get the collection of players in queue from database
        let result = await collection.insertOne(newDocument); 
        res.send(result).status(204);  // Insert the new document into the collection
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});

// remove self from the player match queue
router.delete('/queue', async (req, res) => {
    let collection = await db.collection('player_queue'); // Get the collection player waiting to be matches from database
    let query = { player_queue: req.param.playerId  }; // Create a query to find the user by id
    try {
        res.status(201).json(result.ops[0]); // Return the newly created document
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
        if (games.length > 0) {
            res.status(200).json(games); // Return the games
        } else {
            res.status(404).send("No Games Found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("invalid request");
    }
});



export default router;


