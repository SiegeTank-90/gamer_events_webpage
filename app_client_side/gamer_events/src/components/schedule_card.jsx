import '../styles/schedule.css';





function ScheduleCard({ day, schedule, currentDate, setUpdateTimes }) {
    let isToday = false // not using state here as we don't need to re-render on change

    if (day.getDate() == currentDate.getDate()) {
        isToday = true;
    }
    // temp array of days for display purposes
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    async function deleteThisMatch(e) {
        setUpdateTimes({ isOpen:false }); // refreshes useEffect to reload with deleted matches

        const DeleteResponse = await fetch(`http://localhost:5050/matches`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: schedule.uid
            })
        })
    }

    async function updateThisMatch(e) {
        setUpdateTimes({ isOpen: true, currObject: schedule });
    }




    return (
        <div className="schedule-card">
            {/* Check if today for styling*/}
            {isToday ? <div className="schedule-date-active">{days[day.getDay()] + "," + months[day.getMonth()] + " " + day.getDate()} </div> : <div className="schedule-date-inactive">{days[day.getDay()] + "," + months[day.getMonth()] + " " + day.getDate()} </div>}
            <div className="schedule-events-wrapper">
                <li className="schedule-event" key={schedule.id}>
                    <h4 className="schedule-event title">{schedule.matchName}</h4>
                    <p className="schedule-event detail">GAME:{schedule.gameName}</p>
                    <p className="schedule-event detail">STATUS:{schedule.matchStatus}</p>
                    <h4 className="schedule-event subtitle">Players</h4>

                    <p className="schedule-event detail">HOME: {schedule.PlayerIDs[0].discordId}</p>
                    <p className="schedule-event detail">AWAY: {schedule.PlayerIDs[1].discordId}</p>
                    <button onClick={deleteThisMatch} className="schedule-event button">Delete Match</button>
                    <button onClick={updateThisMatch} className='schedule-event button'>Update Time</button>


                </li>
            </div>
        </div>
    );
}

export default ScheduleCard;