import { localsName } from 'ejs';
import './Style.css'
import { useNavigate } from 'react-router-dom';

function Dashboard(){
    const navigate = useNavigate();
    function logoutSubmit(){
        localStorage.setItem("login" , false);
        localStorage.setItem("loginStatus", "Logged out Successfully!");
          navigate("/");
    }
    return(
        <div className="form">
            <h3>Dashboard Page</h3>
            <p onClick={logoutSubmit}>logout</p>
           
            

        </div>

    );

}

export default Dashboard;