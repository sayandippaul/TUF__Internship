// import logo from './logo.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function Student() {
var [carddetails, setcarddetails] = useState([]);

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    // showcardshere();
    // setcards(carddetails[0]); 
    document.getElementById("mySidenav").style.width = "0";
  }
  
  // var carddetails=[];
//   var carddetails=[
//     {
//     "question":"What Is Postfix And Infix Expression?",
//     "answer":"Infix expression: The expression of the form a op b. When an operator is in-between every pair of operands. Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.",
//     "topic":"Stack",
//     "youtube":"https://www.youtube.com/watch?v=Qz8NcFZTc7o",
//     "qid":1,

//   },
//   {
//     "question":"What Is Postfix And Infix Expression2?",
//     "answer":"Infix expression2: The expression of the form a op b. When an operator is in-between every pair of operands. Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.",
//     "topic":"Stack2",
//     "youtube":"https://www.youtube.com/watch?v=Qz8NcFZTc7o2",
//     "qid":1,

//   }
//   ,
//   {
//     "question":"What Is Postfix And Infix Expression3?",
//     "answer":"Infix expression3: The expression of the form a op b. When an operator is in-between every pair of operands. Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.",
//     "topic":"Stack3",
//     "youtube":"https://www.youtube.com/watch?v=Qz8NcFZTc7o",
//     "qid":1,

//   },
//   {
//     "question":"What Is Postfix And Infix Expression4?",
//     "answer":"Infix expression4: The expression of the form a op b. When an operator is in-between every pair of operands. Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.",
//     "topic":"Stack4",
//     "youtube":"https://www.youtube.com/watch?v=Qz8NcFZTc7o",
//     "qid":1,

//   }
// ];
function getcards(){
  fetch('http://localhost:3001/api/flashcards')
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    // carddetails=data;
      setcarddetails(data);

    if(data.length==0){
      var demo={
        "question":"What Is Postfix And Infix Expression4?",
        "answer":"Infix expression4: The expression of the form a op b. When an operator is in-between every pair of operands. Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.",
        "topic":"Stack4",
        "youtube":"https://www.youtube.com/watch?v=Qz8NcFZTc7o",
        "qid":1,
      
      };
      

      // alert("No cards available");
setcarddetails(demo);
setcards(demo);

    }
    else{
      setcards(data[0]);

    }
    
    nowpage=0;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
var [cards, setcards] = useState([]);
var[nowpage,setnowpage]=useState(0);
// function showcardshere(){
//   var html="";
//   for(var i=0;i<1;i++){
//     var data=carddetails[i];
//     html+=`
// <div className={"col-1-of-3"}>
// <div className="card">
//   <div className={"card__side card__side--front-"+(1)}>
//     <div className="card__title card__title--1">
//       <i className="fas fa-paper-plane" />
//       <h4 className="card__heading">{cards.topic}</h4>
//     </div>
//     <div className="card__details">
    



//       <div className="card__cta">
//       <div className="card__question-box">
//         <p className="card__question-only">{cards.question}</p>
//       </div>
//       <a href="#popup" style={{"background":"black","color":"white"}}  className="btn btn--white">
//         See Answer
//       </a>
//     </div>
 
//     </div>
//   </div>
//   <div className="card__side card__side--back card__side--back-1">

//   <ul>
//   <div className="card__title card__title--1">
//       <i className="fas fa-paper-plane" />
//       <h4 className="card__heading">{cards.topic}</h4>
//     </div>
    
//        <li>{cards.answer}</li>  </ul>
//       <div style={{"margin-top":"200px"}} className="card__cta">
//       <a  href={cards.youtube} style={{"background":"black","color":"white"}} className="btn btn--white">
//       See Concept ✅
//       </a>
//     </div>
 

//      </div>
// </div>
// </div>`;
// }
// document.getElementById("showcards").innerHTML=html;
// }


function previous(){
  // alert(nowpage);
  if(nowpage>0){
    nowpage=nowpage-1;
    setcards(carddetails[nowpage]);
  
    }
    else{
      nowpage=carddetails.length-1;
      setcards(carddetails[nowpage]);
    }
    setnowpage(nowpage);

  }
  function next(){
    // alert("next");
  // alert(nowpage);

    if(nowpage<carddetails.length-1){
      nowpage=nowpage+1;
      setcards(carddetails[nowpage]);
    
      }
      else{
        nowpage=0;
        setcards(carddetails[nowpage]);
      }
    setnowpage(nowpage);

  }
useEffect(() => {
// setcards(carddetails[0]);
// openNav();
 nowpage=0;
getcards();

cards=carddetails[0];
console.log(carddetails[0]);
// showcardshere();

}
  ,[]);
// showcardshere();
  return (
    <>
    
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <link
    href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="css/style.css" />
  <title>Flipping Cards</title>
  <div id="mySidenav" class="sidenav">
  <span style={{"background":"none","color":"white"}} class="closebtn" onClick={closeNav}>&times;</span>
  <a href="https://www.youtube.com/@takeUforward">TUF Youtube</a>
  <a href="https://takeuforward.org">TUF Website</a>
  
  <a href="/">TUF Student</a>
  <a href="/Admin">TUF Admin</a>
</div>
  
<span style={{"font-size":"50px","margin":"25px"}} onClick={openNav}>&#9776;</span>

  <section className="section-plans" id="section-plans">
    <div className="u-center-text u-margin-bottom-big">
      <h2 className="heading-secondary">Take U Forward</h2>
    </div>
    <div className="row" id="showcards">
  


      
      {/* {((cards) => ( */}
        

      <div className={"col-1-of-3"}>
<div className="card">
  <div className={"card__side card__side--front-"+(1)}>
    <div className="card__title card__title--1">
      <i className="fas fa-paper-plane" />
      <h4 className="card__heading">{cards.topic}</h4>
    </div>
    <div className="card__details">
    



      <div className="card__cta">
      <div className="card__question-box">
        <p className="card__question-only">{cards.question}</p>
      </div>
      <a href="#popup" style={{"background":"black","color":"white"}}  className="btn btn--white">
        See Answer
      </a>
    </div>
 
    </div>
  </div>
  <div className="card__side card__side--back card__side--back-1">

  <ul>
  <div className="card__title card__title--1">
      <i className="fas fa-paper-plane" />
      <h4 className="card__heading">{cards.topic}</h4>
    </div>
    
       <li>{cards.answer}</li>  </ul>
      <div style={{"margin-top":"200px"}} className="card__cta">
      <a  href={cards.youtube} style={{"background":"black","color":"white"}} className="btn btn--white">
      See Concept ✅
      </a>
    </div>
 

     </div>
</div>


</div>





    </div>
    <div className="u-center-text u-margin-top-huge">
    <a onClick={previous} style={{"font-size":"20px","font-weight":"bolder","color":"black","margin-right":"400px"}} className="btn btn--white">
    ⏮️ Previous
      </a>
      <a href="https://takeuforward.org" className="btn btn--green">
        Get Started
      </a>
      <a onClick={next} style={{"font-size":"20px","font-weight":"bolder","color":"black","margin-left":"400px"}} className="btn btn--white">
      ⏭️ Next
      </a>
    </div>
  </section>
  <footer>
    Developed by <a href="https://www.linkedin.com/in/sayandip-paul-4b66aa220/">Sayandip Paul</a> for Take U Forward Internship
    Email-Id:sayandip126@gmail.com
  </footer>
</>

    
    </>
  );
}

export default Student;
