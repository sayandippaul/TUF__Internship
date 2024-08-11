import React from 'react'
import './admin.css';
import { useEffect } from 'react';
import { useState } from 'react';

const Admin = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [topic, setTopic] = useState('');
  const [youtube, setYoutube] = useState('');

  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const handleAnswerChange = (e) => setAnswer(e.target.value);
  const handleTopicChange = (e) => setTopic(e.target.value);
  const handleYoutubeChange = (e) => setYoutube(e.target.value);

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
var [cards, setcards] = useState([]);
var [carddetails, setcarddetails] = useState([]);
var[nowpage,setnowpage]=useState(0);

function previous(){
  if(carddetails.length==0) return;
  // alert(nowpage);
  if(nowpage>0){
    nowpage=nowpage-1;
  
    }
    else{
      nowpage=carddetails.length-1;
    }
    setcards(carddetails[nowpage]);
    setQuestion(carddetails[nowpage].question);
    setAnswer(carddetails[nowpage].answer);
    setTopic(carddetails[nowpage].topic);
    setYoutube(carddetails[nowpage].youtube);

    setnowpage(nowpage);

  }
  function next(){
  if(carddetails.length==0) return;

    // alert("next");
  // alert(nowpage);

    if(nowpage<carddetails.length-1){
      nowpage=nowpage+1;
    
      }
      else{
        nowpage=0;
      }
      setcards(carddetails[nowpage]);
      setQuestion(carddetails[nowpage].question);
      setAnswer(carddetails[nowpage].answer);
      setTopic(carddetails[nowpage].topic);
      setYoutube(carddetails[nowpage].youtube);
     
    setnowpage(nowpage);

  }
  function newsubmit(){
    var newquestion=document.getElementById("newquestion").value;
    var newtopic=document.getElementById("newtopic").value;
    var newanswer=document.getElementById("newanswer").value;
    var newyoutube=document.getElementById("newyoutube").value;
    var newcard={
      "question":newquestion,
      "answer":newanswer,
      "topic":newtopic,
      "youtube":newyoutube,
      "qid":carddetails.length+1
    };
    if(newquestion=="" || newanswer=="" || newtopic=="" || newyoutube==""){
      alert("Please Fill All The Fields");
      return;
    }
    // carddetails.push(newcard);
    // console.log(carddetails);
    // setcards(newcard);
    // nowpage=carddetails.length-1;
    // setnowpage(nowpage);
    fetch('http://localhost:3001/api/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newcard),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
    alert("New Card Added Successfully");
 getcards();


      })
      .catch((error) => {
        // console.error('Error:', error);
        alert("Error Adding New Card");
      });

  }
  function getcards(){
    fetch('http://localhost:3001/api/flashcards')
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      if(data.length==0){
        var demo=[{
          "question":"What Is Postfix And Infix Expression4?",
          "answer":"Infix expression4: The expression of the form a op b. When an operator is in-between every pair of operands. Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.",
          "topic":"Stack4",
          "youtube":"https://www.youtube.com/watch?v=Qz8NcFZTc7o",
          "qid":1,
        
        }];
        data=demo;
      }
        
  
        // alert("No cards available");
      // carddetails=data;
      setcarddetails(data);
      console.log(carddetails);
      setcards(data[0]);
      setAnswer(data[0].answer);
      setQuestion(data[0].question);
      setTopic(data[0].topic);
      setYoutube(data[0].youtube);

      nowpage=0;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  function deletecard(qid){
    // var qid=cards.qid;
    fetch('http://localhost:3001/api/flashcards/'+qid, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
    alert("Card Deleted Successfully");
  getcards();
      })
  }
  function updatecard(qid){
    var updatecard={
      "question":question,
      "answer":answer,
      "topic":topic,
      "youtube":youtube,
    };
    if(question=="" || answer=="" || topic=="" || youtube==""){
      alert("Please Fill All The Fields");
      return;
    }
    fetch('http://localhost:3001/api/flashcards/'+qid, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatecard),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
    alert("Card Updated Successfully");
    getcards();
      })

  }
  function reset(){
    document.getElementById("newquestion").value="";
    document.getElementById("newtopic").value="";
    document.getElementById("newanswer").value="";
    document.getElementById("newyoutube").value="";

    }
useEffect(() => {
// setcards(carddetails[0]);
// openNav();
 nowpage=0;
 var demo=[{
  "question":"What Is Postfix And Infix Expression4?",
  "answer":"Infix expression4: The expression of the form a op b. When an operator is in-between every pair of operands. Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.",
  "topic":"Stack4",
  "youtube":"https://www.youtube.com/watch?v=Qz8NcFZTc7o",
  "qid":1,

}];
setcarddetails(demo);

 getcards();


// cards=carddetails[0];
// console.log(carddetails[0]);
// showcardshere();

}
  ,[]);
    return (
      <>
       
        <div class="topnav">
  <a class="active">Admin</a>
  <a > Features :   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add </a>
  <a >Edit </a>
  <a >Delete</a>
  
  <a href="\" style={{"float":"right","color":"black","background":"white"}}>Student page</a>
</div>
        <div className="container">
        
  <div className="left">
    <div className="header">
      <h2 className="animation a1">Admin Panel</h2>
      <h4 className="animation a2" style={{"color":"white"}}>
        Set Your Questions And Answers
      </h4>
    </div>
    <div className="form">
    <input
        type="text"
        id="newquestion"
        required
        className="form-field animation a3"
        placeholder="Enter Question"
      />
      
      <input
        type="text"
        required
        id="newtopic"
        className="form-field animation a3"
        placeholder="Enter Topic "
      />

      <textarea style={{"height":"100px","width":"100%"}}
        type="text"
        required
        id="newanswer"
        className="form-field animation a4"
        placeholder="Enter Answer"
      ></textarea>
      <input
        type="text"
        required
        id="newyoutube"
        className="form-field animation a3"
        placeholder="Enter Youtube Link"
      />
      
      <button onClick={newsubmit} className="animation a6">Add New Question Card</button>
      <button onClick={reset} className="animation a6">Reset</button>
    </div>
  </div>
  <div className="right" >

  <div className="row" style={{"margin-top":"50px"}}>

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
  <div className="card__side card__side--back card__side--back-3">

  <div className="form" style={{"margin":"auto"}}>
    <input
        type="text"
        required
        id="updatequestion"
        onChange={handleQuestionChange}
        className="form-field animation a3"
        placeholder="Enter Question"
        value={question}
      />
      
      <input
        type="text"
        required
        id="updatetopic"
        onChange={handleTopicChange}
        className="form-field animation a3"
        placeholder="Enter Topic "
        value={topic}
      />

      <input style={{"height":"100px","width":"100%"}}
        type="text"

        required
        id="updateanswer"
        onChange={handleAnswerChange}
        className="form-field animation a4"
        placeholder="Enter Answer"
        value={answer}
      />
      <input
        type="text"
        required
        id="updateyoutube"
        onChange={handleYoutubeChange}
        className="form-field animation a3"
        placeholder="Enter Youtube Link"
        value={youtube}
      />
      
      <button
                                    onClick={(e)=>updatecard(cards.id)}
                                    className="animation a6">Update Details</button>
      <button 
                                    onClick={(e)=>deletecard(cards.id)}
                                    className="animation a6">Delete Card</button>
    </div>
 

     </div>
</div>


</div>



    </div>

    <div className="u-center-text u-margin-top-huge">
    <a onClick={previous} style={{"font-size":"10px","font-weight":"bolder","color":"black","margin-right":"120px"}} className="btn btn--white">
    ⏮️ Previous
      </a>
     
      <a onClick={next} style={{"font-size":"10px","font-weight":"bolder","color":"black","margin-left":"180px"}} className="btn btn--white">
      Next ⏭️ 
      </a>
    </div>
 
  </div>
 
</div>
</>

  )
}

export default Admin
