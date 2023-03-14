import React, { useEffect, useState } from 'react'
import style from './Createfeedback.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {  useNavigate } from 'react-router-dom'

export default function Createfeedback() {
  const history=useNavigate();
  const [value,setvalue]=useState({title:'',category:'feature',description:''});
  useEffect(()=>{

  },[value])
  const goback=()=>{
    history(-1);
  }
  const addfeedback=async()=>{
    console.log();
    if(value.title!==''&&value.description!==''&&value.title.trim().length!==0&&value.description.trim().length!==0) { 
    const result1 =await fetch (`http://localhost:5996/newfeedback`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(value)
    })
    const resultJson1=await result1.json();
    history(`/`);
    console.log(resultJson1);
  }
  }
  return (
    
    <div className={style.whole}>
        
        <p className={style.goback} onClick={goback}><FontAwesomeIcon icon={faChevronLeft}/>Go Back</p>
        <img src='assests/icon-new-feedback.svg' alt='newfeedback' className={style.newfeedbackicon}/>
        <div className={style.form}>
            <h1 className={style.cretetext}>Create New Feedback</h1>
            <p className={style.titlestyle}>Feedback Title</p>
            <p className={style.paratext}>Add a short, descriptive headline</p>
            <input type={'text'}  className={style.inputDiv} onChange={(e)=>setvalue({...value,title:e.target.value})}/>
            <p className={style.titlestyle}>Category</p>
            <p className={style.paratext}>Choose a category for your feedback</p>
            <select  className={style.inputDiv} onChange={(e)=>setvalue({...value,category:e.target.value})}>
                <option>Feature</option>
                <option>UI</option>
                <option>UX</option>
                <option>Enhancement</option>
                <option>Bug</option>
            </select>
            <p className={style.titlestyle}>Feedback Detail</p>
            <p className={style.paratext}>Include any specific comments on what should be improved, added, etc.</p>
            <textarea   className={style.textarea}  onChange={(e)=>setvalue({...value,description:e.target.value})}></textarea>
            <div className={style.buttondiv}>
                <button className={style.cancelbtn} onClick={goback}>Cancel</button>
                <button className={style.addbtn} onClick={addfeedback}>Add Feedback</button>
            </div>
        </div>
    </div>
  )
}
