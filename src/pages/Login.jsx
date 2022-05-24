import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {mobile} from "../responsive";
import React,{useState,useEffect} from "react";
import fire from "../fire";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const[user,setUser]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[emailError,setEmailError]=useState('');
  const[passworderror,setPassworderror]=useState('');
  const[hasAccount,setHasAccount]=useState(false);
  let navigate=useNavigate();
  const handleLogin=()=>{
    fire
    .auth()
    .signInwithEmailandPassword(email,password)
    .catch(err=>{
   switch(err.code){
     case "auth/invalid-email":
       case "auth/user-disabled":
         case"auth/user-not-found":
         setEmailError(err.message);
         break;
      case "auth/wrong-password":
        setPassworderror(err.message);
        break;
   }
    })

  }
  return (

    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" />
          <Input type="password" />
          <Button onClick={() => navigate("/")}>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;