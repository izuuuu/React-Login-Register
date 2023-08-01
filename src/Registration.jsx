import { type } from '@testing-library/user-event/dist/type';
import './Style.css';
import { useState, useEffect } from 'react';

function Registration(){
    const [userName, setUserName]= useState("");
    const [pass1, setpass1]= useState("");
    const [pass2, setpass2]= useState("");
    const [fullName, setfullName]= useState("");
    const [address1, setaddress]= useState("");
    const [contactD, setcontact]= useState("");
    const [error, setError]= useState("");
    const [msg, setMsg]= useState("");

    useEffect(() => {
        setTimeout(function(){
            setMsg("");
        }, 15000);
    }, [msg] );

    const handleInputChange = (e, type) => {
        switch(type){
            case "userName" :
                setError("");
                setUserName(e.target.value);
                if(e.target.value ===""){
                    setUserName("Username cannot be blank");
                }
                break;

                case "pass1" :
                setError("");
                setpass1(e.target.value);
                if(e.target.value ===""){
                    setError("Password cannot be blank");
                }
                break;
                case "pass2" :
                setError("");
                setpass2(e.target.value);
                if(e.target.value ===""){
                    setError("Confirm Password cannot be blank");
                }
                else if(e.target.value !== pass1){
                    setError("Confirm password does not match");
                }
                
                break;
                default:

                case "fullName" :
                setError("");
                setfullName(e.target.value);
                if(e.target.value ===""){
                    setError("Full Name cannot be blank");
                }
                break;
                case "address1" :
                setError("");
                setaddress(e.target.value);
                if(e.target.value ===""){
                    setError("Address cannot be blank");
                }
                break;
                case "contactD" :
                setError("");
                setcontact(e.target.value);
                if(e.target.value ===""){
                    setError("Contact Details cannot be blank");
                }
                break;
            
                
        }
    }

    function handleSubmit(){
        if(userName !== "" && pass1 !== "" && pass2 !== "" && fullName !== "" && address1 !== "" && contactD !== ""){
        var url = "http://localhost/react/registration.php";
                var headers = {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                };
                var Data ={
                    userName: userName,
                    pass1: pass1,
                    pass2: pass2,
                     fullName: fullName,
                     address1: address1,
                     contactD: contactD 
                    
                }
                fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(Data)
                }).then((response) => response.json())
                .then((response) => {
                    setMsg(response[0].result);
                }).catch((err)=> {
                    setError(err);
                    console.log(err);
                });
                setUserName();
                setpass1();
                setpass2();
                setfullName();
                setaddress();
                setcontact();
            }  
            else{
                setError("All fields are required");
            }          
      
}

function checkUserName(){
    
    var url = "http://localhost/react/checkuser.php";
            var headers = {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            };
            var Data ={
                userName: userName 
                
            }
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
            }).then((response) => response.json())
            .then((response) => {
                setError(response[0].result);
            }).catch((err)=> {
                setError(err);
                console.log(err);
            });
           
               
  
}



    function checkPassword(){
        if (pass1.length <8){
            setError("Password cannot be less than 8 characters");
        }
    }

    return(
        <>
        <div className='form'>
            <p>
                {
                    msg !== "" ?
                    <span className="success">{msg}</span> :
                    <span className="error">{error}</span>
                }
            </p>
            <label>Username</label>
            <input 
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => handleInputChange(e, "userName")}
            />
             <label>Password</label>
            <input 
                type="password"
                name="pass1"
                value={pass1}
                onChange={(e) => handleInputChange(e, "pass1")}
                onBlur={checkPassword}
            />
             <label>Confirm Password</label>
            <input 
                type="password"
                name="pass2"
                value={pass2}
                onChange={(e) => handleInputChange(e, "pass2")}
            />
             <label>Full Name</label>
            <input 
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => handleInputChange(e, "fullName")}
            />
             <label>Address</label>
            <input 
                type="text"
                name="address1"
                value={address1}
                onChange={(e) => handleInputChange(e, "address1")}
            />
             <label>Contact Details</label>
            <input 
                type="text"
                name="contactD"
                value={contactD}
                onChange={(e) => handleInputChange(e, "contactD")}
            />
             <label></label>
            <input 
                type="submit"
                defaultValue="Submit"
                className='button'
                onClick={handleSubmit}
            />
        </div>
        </>
    );
}

export default Registration;