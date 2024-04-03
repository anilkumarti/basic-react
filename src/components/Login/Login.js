import React, { useReducer, useState,useContext} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../Input";
 const emailReducer=(state,action)=>{
  if(action.type==="USER_INPUT")
  {
    return { value: action.val, isValid: action.val.includes('@')}
  }

  if(action.type==="INPUT_BLUR")
  {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '',isValid: false}
 }

const passReducer=(state,action)=>
{   if(action.type==="USER_INPUT")
{
  return { value: action.val, isValid: action.val.trim().length > 6}
}
if(action.type==="INPUT_BLUR")
{
  return {value: state.value, isValid: state.value.trim().length>6}
}
  return {value: '',isValid: false}
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [enteredCollege, setEnteredCollege] = useState("");
  const [CollegeIsValid, SetCollegeIsValid] = useState();

  // useEffect(() => {
  //  // console.log(" without timeout is activated")
  //  const identifier=  setTimeout(() => {
  //     console.log("SetTImeout is activated")
  //     setFormIsValid(

  //       enteredEmail.includes("@") &&
  //         enteredPassword.trim().length > 6 &&
  //         enteredCollege.trim().length > 8

  //     ); 
  //   }, 5000);
  //  return ()=> {
  //   clearTimeout(identifier);
  //   console.log("This is cleanup function")
  //  }
  // }, [setFormIsValid, enteredEmail, enteredPassword, enteredCollege]);
  const [emailState,dispatchEmail]=useReducer(emailReducer, {value: '',isValid: false});
  const [passState,dispatchPass]=useReducer(passReducer,{ value:'',isValid:false});
  
  const authCtx=useContext(AuthContext);
  const emailChangeHandler = (event) => {

    dispatchEmail({type:'USER_INPUT',val: event.target.value});
    // setEnteredEmail(event.target.value);
   


      setFormIsValid(
        emailState.isValid &&
          passState.isValid &&
          enteredCollege.trim().length > 8
      );
  };
   

  const passwordChangeHandler = (event) => {
    dispatchPass({type:'USER_INPUT',val: event.target.value});
    // setEnteredPassword(event.target.value);
      setFormIsValid(
        emailState.isValid &&
        passState.isValid &&
          enteredCollege.trim().length > 8
      );
  };
  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
      setFormIsValid(
        emailState.isValid &&
          passState.isValid  &&
          event.target.value.trim().length > 8
      );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPass({type:"INPUT_BLUR"});
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCOllegeHandler = (e) => {
      console.log(e)
    SetCollegeIsValid(enteredCollege.trim().length > 8);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passState.value, enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input  className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
          Name="Email" 
          type="email" 
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          > </Input>


        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input   className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ""
          }`}
          Name="Password" 
          type="password" 
          id="password"
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}

          > </Input>
        {/* <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
    <Input  className={`${classes.control} ${
            CollegeIsValid === false ? classes.invalid : ""
          }`} 
          Name="College" 
          type="text" 
          id="college"
          value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCOllegeHandler}
            > </Input>

        {/* <div
          className={`${classes.control} ${
            CollegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college"> College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCOllegeHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
