import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css'
import { json } from 'react-router-dom';


function Login(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect( () => {
        let login = localStorage.getItem("login");
        if(login){
            navigate("/dashboard");
        }
        let loginStatus = localStorage.getItem("loginStatus");
        if(loginStatus){
            setError(loginStatus);
            setTimeout(function(){
                localStorage.clear();
                window.location.reload();
            }, 3000)
            
        }
        setTimeout(function() {
            setMsg("");
        }, 5000);
    },[msg] );

    const handleInputChange = (e, type) => {
        switch(type){
            case "user":
                setError("");
                setUser(e.target.value);
                if(e.target.value === ""){
                    setError("UserName cannot be blank");
                }
                break;
            case "pass":
                setError("");
                setPass(e.target.value);
                if(e.target.value === ""){
                    setError("Password cannot be blank");
                }
                break;
            default:
        }
    }
    function loginSubmit(){
        if(user !== "" && pass!= ""){
            var url = "http://localhost/react/login.php";
            var headers = {
                "Accept": "application/json",
                "Content-type": "application/json"
            };
            var Data ={
                user : user,
                pass : pass
            };
            fetch(url, {
                method: "POST", 
                headers: headers,
                body: json.stringify(Data)
            }).then((response) => response.json())
            .then((response) => {
                if(response[0].result === "Invalid Username" || response[0].result === "Invalid Password"){
                     setError(response[0].result);
                }
                else{
                    setMsg(response[0].result);
                    setTimeout(function(){
                       localStorage.setItem("login", true);
                        navigate("/dashboard");
                    }, 5000)
                }
               
            }).catch((err)=> {
                setError(err);
                console.log(err);
            })
        }
        else{
            setError("Please fill both fields");
        }
    }
    return(
        <div className="form">
            <p>
                {
                    error !== "" ?
                    <span className="error">{error}</span> :
                    <span className="success">{msg}</span>
                }
            </p>
            <label>Username</label>
            <input 
                type="text"
                value={user}
                onChange={(e) => handleInputChange(e, "user")}
            />
             <label>Password</label>
            <input 
                type="password"
                value={pass}
                onChange={(e) => handleInputChange(e, "pass")}
            />
             <label></label>
            <input 
                type="submit"
                defaultValue="Login"
                className="button"
                onClick={loginSubmit}
            />
            

        </div>

    );

}

export default Login;