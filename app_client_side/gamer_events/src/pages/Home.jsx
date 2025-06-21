"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router';
import NewMatchDialog from '../components/new_match.jsx';
import Banner from '../components/banner.jsx';
import ScheduleGallery from '../components/schedule_gallery.jsx';
import '../styles/App.css';
import '../styles/home.css';
import NewTimeDialog from '../components/update_time.jsx';
//import data from '../../data.json';

// Note useful future feature that displays in the user is currently in the player queue for a match

export default function HomePage() {
    { /* This is the main dashboard page where users can see their events and settings */ }
    { /* using temp data from data.json */ }
    {/*  let schedule = data.users[0].schedule; */ }
    const [NewMatchPopUp, setNewMatchPopUpOpen] = useState(false);
    const [UpdateTimePopUp, setUpdateTimePopUp] = useState({isOpen: false, currObject:{}});
    const [games, setGames] = useState([]);
    const [stores, setStores] = useState([]);
    const [match, setMatch] = useState([]);
    const [player, setPlayer] = useState({});
    const params = useParams();

    // These 4 fetch requests are seperated so that they can be updated independently.
    useEffect(() => {
        // Fetch games when the component mounts
        async function fetchGames() {
            const responseGames = await fetch('http://localhost:5050/games');
            const gamesData = await responseGames.json();
            setGames(gamesData);
            // Handle the games data as needed

        }
        fetchGames();
    }, []);

    useEffect(() => {
        // Fetch Stores when the component mounts
        async function fetchStores() {
            const responseStores = await fetch('http://localhost:5050/stores');
            const storesData = await responseStores.json();
            setStores(storesData);
            // Handle the games data as needed

        }
        fetchStores();
    }, []);

    useEffect(() => {
        // Fetch Stores when the component mounts
        async function fetchMatch() {
   
            const responseStores = await fetch(`http://localhost:5050/matches/${params.PlayerName}`);
            const matchData = await responseStores.json();
            console.log(typeof matchData[0]._id)
            setMatch(matchData);
            // Handle the games data as needed

        }
        fetchMatch();
    },[NewMatchPopUp, UpdateTimePopUp]);
    useEffect(() => {
        // Fetch Player data when the component mounts
        async function fetchPlayer() {
            const responsePlayer = await fetch(`http://localhost:5050/players/${params.PlayerName}`);
            const playerData = await responsePlayer.json();
            setPlayer(playerData[0]);
            // Handle the player data as needed
        }
        fetchPlayer();
    }, []);



    // Uncomment the following lines to see the fetched data in the console
    // console.log("Games: ", games);
    // console.log("Stores: ", stores);
    // console.log("Match: ", match);
    // console.log("NewMatchPopUp: ", NewMatchPopUp);

    return (
        <div className="App">
            <>
                <NewMatchDialog player={player} games={games} stores={stores} open={NewMatchPopUp} onClose={() => setNewMatchPopUpOpen(false)} />
                <NewTimeDialog open={UpdateTimePopUp} onClose={() =>setUpdateTimePopUp({isOpen:false})} />

                <div className="App-frame">
                    <div className="home-wrapper">
                        <Banner />
                        <div className='dashboard-wrapper'>
                            <div className='vertical-menu-wrapper'>
                                <div className='vertical-menu'>
                                    <div className='vertical-menu-item'>
                                        <h3 className='vetrical-menu-item' onClick={() => setNewMatchPopUpOpen(true)}>New Match </h3>
                                    </div>
                                    <div className='vertical-menu-item'>
                                        <Link to="/"><h3 className='vertical-menu-item-text'>Logout</h3> </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='vertical-content'>
                                <div className="schedule-visual-wrapper">
                                    <ScheduleGallery matches={match} setUpdateTimes={setUpdateTimePopUp} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}