import logo from '../images/logo.png';
import banner from '../images/banner.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';


export default function LoginPage() {
  let navigate = useNavigate();
  const [isFailedLogin, setisFailedLogin] = useState(false); // State to track if the login failed


  async function handleLogin(e) {

    e.preventDefault(); // Prevent the default form submission behavior
    const form = e.target;
    const formData = new FormData(form); // Create a FormData object from the form
    let email = formData.get("email"); // Get the email from the form data
    let password = formData.get("password"); // Get the password from the form data
    // unencrypted password/email for testing purposes
    console.log("Email: ", email);
    console.log("Password: ", password);
    const response = await fetch(`http://localhost:5050/players/${email}/${password}`);
    console.log("Response: ", response);
    if (!response.ok) {
      console.error("Login failed: ", response.statusText);
      setisFailedLogin(true); // Set the failed login state to true
    } else {

      const playerData = await response.json(); // Get the player data from the response
      setisFailedLogin(false); // Reset the failed login state
      navigate(`/dashboard/${playerData[0].playerName}`); // Redirect to the dashboard page

    }
  }


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
            <form method="post" onSubmit={handleLogin} className="login-form">
              <label className="login-form-label">USERNAME</label>
              <input type="text" name='email' placeholder="Email" required />
              <label className="login-form-label">PASSWORD</label>
              <input type="password" name='password' placeholder="Password" required />
              <button type="submit">Login</button> {/* This button should redirect to the dashboard page TBD::Login Functionality*/}
              {isFailedLogin && <p className="login-error">Login failed. Please try again.</p>} {/* Show error message if login fails */}
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}