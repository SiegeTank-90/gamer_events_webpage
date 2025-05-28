import { useState } from 'react';
import ScheduleCard from './schedule_card.jsx';




function ScheduleGallery({ schedule }) {
    let currentDate = new Date();
    // temp array
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let ScheduleByDate = schedule.sort((a, b) => {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;     
     }) 
     // Each dayAg or DaysAgenda is an object with the events of the day
    
    return (
        <div className="schedule-gallery">
            <h3 className="schedule-gallery-header">{months[currentDate.getMonth()]} Events</h3>
            <div className="schedule-gallery-body">                
                {ScheduleByDate.map((daysAgenda) => (
                    <ScheduleCard  day={daysAgenda.date} schedule={daysAgenda.events} currentDate={currentDate} />
                ))}
            </div>

        </div>
    );
}

export default ScheduleGallery;