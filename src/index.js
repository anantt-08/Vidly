import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//LET -> BLOCK
//VAR -> Avaliable outside block
//Const -> BLOCK

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "column",
  },
}));

function App() {
  const classes = useStyles();
  const [getMsg, setMsg] = useState("Nothing");

  function handleClick() {
    //alert("Hello");
    setMsg("Hello Students")
  }

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Primary
      </Button>
      <div>{getMsg}</div>
    </div>
  );
}

export default App;


const person={
  name:"yo",
  walk:function(){
    console.log(this)
  }
}
const walk1=person.walk.bind(person)
 walk1();

const jobs=[{
  id:"1",active:true
},{id:"2",active:true
},{id:"3",active:false
}] 
 
 const first=[1,2,3]
 const second=[4,5,6]
 const yoo={
  location:"aus"
 }
  console.log([...first,...second])
  console.log({...yoo})
let color=["red","green","white"]
const items=color.map((color,index)=> ( <li key={index}>{color}</li>) )
console.log(items)
let a=jobs.filter(job=> job.active===true)
 console.log(a)
inheritance 
 class Teacher extends Person {
constructor(name,degree){
super(name)
 this.lol=degree}
}
*/