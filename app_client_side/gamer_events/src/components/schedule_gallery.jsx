import { useState } from 'react';
import ScheduleCard from './schedule_card.jsx';




function ScheduleGallery({ matches, setUpdateTimes }) {
    let currentDate = new Date();
    let OrderMatches = [];
    // temp array

    for (let i = 0; i < matches.length; i++) {
        // Convert matchdate to Date object
        OrderMatches.push(new Date(matches[i].matchDate));
    }

    OrderMatches = OrderMatches.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }
        return 0;


    })

    // Each dayAg or DaysAgenda is an object with the events of the day
    return (
        <div className="schedule-gallery">
            <h3 className="schedule-gallery-header">Upcoming Events</h3>
            <div className="schedule-gallery-body">
                {
                    matches.map((daysAgenda, i) => (
                        <ScheduleCard schedule={daysAgenda} day={OrderMatches[i]} currentDate={currentDate} setUpdateTimes={setUpdateTimes} />
                    ))
                }
            </div>

        </div>
    );
}

export default ScheduleGallery;