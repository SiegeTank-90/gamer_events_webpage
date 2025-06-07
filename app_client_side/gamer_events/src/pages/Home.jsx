import Banner from '../components/banner.jsx';
import ScheduleGallery from '../components/schedule_gallery.jsx';
import '../styles/App.css';
import '../styles/home.css';
//import data from '../../data.json';
import { Link } from 'react-router';

function HomePage() {
    { /* This is the main dashboard page where users can see their events and settings */ }
    { /* using temp data from data.json */ }
  {/*  let schedule = data.users[0].schedule; */}

    return (
        <div className="App">
            <div className="App-frame">
                <div className="home-wrapper">
                    <Banner />
                    <div className='dashboard-wrapper'>
                        <div className='vertical-menu-wrapper'>
                            <div className='vertical-menu'>
                                <div className='vertical-menu-item'>
                                    <h3 className='vertical-menu-item-text'>New Match</h3>
                                </div>
                                <div className='vertical-menu-item'>
                                    <h3 className='vertical-menu-item-text'>Delete Match</h3>
                                </div>
                                <div className='vertical-menu-item'>
                                    <Link to="/"><h3 className='vertical-menu-item-text'>Logout</h3> </Link>
                                </div>
                            </div>
                        </div>
                        <div className='vertical-content'>
                            <div className="schedule-visual-wrapper">
                               {/* <ScheduleGallery schedule={schedule} />*/}
                            </div>
                            <div className="schedule-settings-wrapper"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage;
