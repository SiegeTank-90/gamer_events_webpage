import '../styles/schedule.css';





function ScheduleCard({ day, schedule, currentDate }) {
    let isToday = false // not using state here as we don't need to re-render on change
    let AgendaDate = new Date(day); // Convert the date string to a Date object
    
    if (AgendaDate.getDate() == currentDate.getDate()) {
        isToday = true;
    }
    // temp array of days for display purposes
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let ScheduleList = schedule.length > 1
        ? schedule.map((event) => (
            <li className="schedule-event" key={event.event_id}>
                <h4 className="schedule-event title">{event.event_title}</h4>
                <p className="schedule-event time">{event.starttime} - {event.endtime}</p>
            </li>
        ))
        : schedule.length === 1
            ? (
                <li className="schedule-event" key={schedule[0].event_id}>
                    <h4 className="schedule-event title">{schedule[0].event_title}</h4>
                    <p className="schedule-event time">{schedule[0].starttime} - {schedule[0].endtime}  </p>
                    
                </li>
            )
            : null;



    return (
        <div className="schedule-card">
            {/* Check if today for styling*/}
            {isToday ? <div className="schedule-date-active">{AgendaDate.getDate()}, {days[AgendaDate.getDay()]} </div> : <div className="schedule-date-inactive">{AgendaDate.getDate()}, {days[AgendaDate.getDay()]} </div>}
                <div className="schedule-events-wrapper">
                    {/* Map through the events for the day */}
                    {ScheduleList}
                </div>
        </div>
    );
}

export default ScheduleCard;