
import ReactDom from 'react-dom';
import '../styles/models.css'


export default function NewMatchDialog({ player, games, stores, open, onClose }) {
    if (open === false) {
        return null; // If the dialog is not open, return null to render nothing
    }

    async function HandleFindMatch(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        const form = e.target;
        const formData = new FormData(form); // Create a FormData object from the form
        let gameName = formData.get("selectedgame"); // Get the game name from the form data
        let storeName = formData.get("selectedlocation"); // Get the store name from the form data

        //logging for testing
        // console.log("Game Name: ", gameName);
        // console.log("Store Name: ", storeName);

        // query the server to find a match
        const QuertyResponse = await fetch(`http://localhost:5050/queue/${gameName}/${storeName}`);
        if (!QuertyResponse.ok) {
            console.log("No match found, adding to queue...");
            try {
                const PostResponse = await fetch(`http://localhost:5050/queue/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        playerName: player.playerName,
                        gameName: gameName,
                        storeName: storeName,
                        playerId: player._id,
                        discordId: player.DiscordId,
                    }),
                });

                if (PostResponse.ok) {
                    console.log("A player has been added to the match queue.");
                } else {
                    console.error("Error posting:", PostResponse.statusText);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            const opponentData = await QuertyResponse.json(); // Get the opponent data from the response

            try {
                const PostResponse = await fetch(`http://localhost:5050/matches`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        matchName: `${player.playerName} vs ${opponentData.playerName}`,
                        gameName: gameName,
                        storeName: storeName,
                        PlayerIDs: [
                            { playerName: player.playerName, discordId: player.DiscordId },
                            { playerName: opponentData.playerName, discordId: opponentData.discordId }
                        ],
                        matchDate: new Date().toISOString(),

                    }),
                });

                if (PostResponse.ok) {
                    console.log("A new match has been added to the match record");
                } else {
                    console.error("Error posting:", PostResponse.statusText);
                }
                const DeleteResponse = await fetch(`http://localhost:5050/queue`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        playerId: opponentData.playerId
                    })
                })


            } catch (error) {
                console.error("Error:", error);
            }


        }
        onClose(); // Close the dialog after handling the match finding
    }




    return ReactDom.createPortal(
        <>
            <div className='newMatchModelOverlay'> </div>
            <div className="newMatchModel">
                <form method="post" onSubmit={HandleFindMatch} className='newMatchModelForm'>
                    <select className='newMatchModelSelect' name="selectedgame" required>
                        <option value="" disabled >Select Game</option>
                        {games.map((game) => (
                            <option value={game.gameName}>{game.gameName}</option>
                        ))}
                    </select>
                    <select className='newMatchModelSelect' name="selectedlocation" required>
                        <option value="" disabled >Select A Store</option>
                        {stores.map((store) => (
                            <option value={store.storeName}  >{store.storeName}</option>
                        ))}
                    </select>

                    <button type="submit" className='newMatchModelButton'>Find Match</button>
                </form>
            </div>
        </>,
        document.getElementById('portal-root')

    )


}