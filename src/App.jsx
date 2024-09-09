import { useState } from 'react';

import './App.css';

import HackathonLists from './components/HackathonLists';
import LandingPage from './components/StaticPage/LandingPage';
import SecondPage from './components/StaticPage/SecondPage';


function App() {


  return (
    <div>
    <LandingPage/>
   <SecondPage/>
    <HackathonLists/>
    </div>
  );
}

export default App;