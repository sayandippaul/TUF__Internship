import "./App.css";
import React, { useEffect, useState } from 'react';
import Student from './Student';
import Admin from './Admin';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
function App() {


  return (

    <div className="App">
        <Routes>
                  
                  <Route exact path='/' element={< Student />}></Route>
                  <Route exact path='/Student' element={< Student />}></Route>
                  <Route exact path='/Admin' element={< Admin />}></Route>

                  
              </Routes>

    </div>
  );
}

export default App;
