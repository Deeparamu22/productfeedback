
import './App.css';
import Createfeedback from './Components/Createfeedback/Createfeedback';
import Whole from './Components/Whole/Whole';
import {  Routes, Route } from "react-router-dom";
import ViewSuggestion from './Components/ViewSuggestion/ViewSuggestion';
import Editfeedback from './Components/Editfeedback/Editfeedback';
import Roadmap from './Components/Roadmap/Roadmap';

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path='/' element={<Whole/>}></Route>
        <Route path='/newfeedback' element={<Createfeedback/> }></Route>
        <Route path='/roadmap' element={<Roadmap/> }></Route>
        <Route path='/view/:id' element={<ViewSuggestion/> }></Route>
        <Route path='/edit/:id' element={<Editfeedback/> }></Route>
       </Routes>
    </div>
  );
}

export default App;
