import logo from '../images/logo.png';
import banner from '../images/banner.png';
import { Link } from 'react-router';


function LoginPage() {
  return (
    <div className="App">
      <div className="App-frame">
        <div className="login-content-wrapper">
          <div className="login-bannerimagewrapper">
            <img src={banner} className="login-bannerimagewrapper-image" alt="banner" />
          </div>

          <div className="login-container">
            <div className="login-logoimagewrapper">
              <img src={logo} className="login-logoimagewrapper-image" alt="logo" />
            </div>
            <h2 className='login-brandName'>GameFinder</h2>
            <form className="login-form">
              <label className="login-form-label">USERNAME</label>
              <input type="text" placeholder="Username" required />
              <label className="login-form-label">PASSWORD</label>
              <input type="password" placeholder="Password" required />
              <Link to="/dashboard"> <button type="submit">Login</button> </Link>
            </form>
          </div>
          {/*Link Are Currently Disabled but demo'd as functioning as the feature isn't implemented yet 
        This will throw an ESLINT Warnning until resovlved*/}
          <div className="login-container">
            <a className='login-Links'>Sign Up?</a>
          </div>

          <div className="login-container">
            <a className='login-Links'>Forgot Username/Password?</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
