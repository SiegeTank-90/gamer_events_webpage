import '../styles/banner.css';
import logo from '../images/logo.png';
import banner from '../images/banner.png';

function Banner() {
    return (
        <div style={{ backgroundImage: `url(${banner})` }} className="banner-container">
            <div className="banner-title-wrapper">
                <img src={logo} className="banner-logo-image"/>
                <h1 className="banner-title">GameFinder</h1>
            </div>
        </div>
    )
}

export default Banner;
