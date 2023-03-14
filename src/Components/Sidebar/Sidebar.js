import React, { useEffect, useState } from 'react'
import style from './Sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
  const fetchData=async()=>{
    const result =await fetch(`http://localhost:5996/filter/${props.filter}/${props.sort}`)
    .then((response) => {return response.json()})
    .then((data) => {props.setdata(data)});
  }  
useEffect(() => {
    fetchData();
    console.log(props.filter,props.sort);
  }, [props.filter,props.sort]); 
  return (
    <div className={style.whole}>
        <div className={style.imagediv}>
            <h2 className={style.FrontendText}>Frontend Mentor</h2>
            <p className={style.Feedback}>Feedback Board</p>
        </div>
        <div className={style.seconddiv}>
           <label><input type={'radio'} name="filter" className={style.radiobtn} value='all' onClick={(e)=>props.setfilter(e.target.value)} defaultChecked/> <div className={style.smalldiv}>All</div></label>
           <label><input type={'radio'} name="filter" className={style.radiobtn} value='UI' onClick={(e)=>props.setfilter(e.target.value)}/> <div className={style.smalldiv}>UI</div></label>
           <label><input type={'radio'} name="filter" className={style.radiobtn} value='UX' onClick={(e)=>props.setfilter(e.target.value)}/> <div className={style.smalldiv}>UX</div></label>
           <label><input type={'radio'} name="filter" className={style.radiobtn} value='enhancement' onClick={(e)=>props.setfilter(e.target.value)}/> <div className={style.smalldiv}>Enhancement</div></label>
           <label><input type={'radio'} name="filter" className={style.radiobtn} value='bug' onClick={(e)=>props.setfilter(e.target.value)}/> <div className={style.smalldiv}>Bug</div></label>
           <label><input type={'radio'} name="filter" className={style.radiobtn} value='feature' onClick={(e)=>props.setfilter(e.target.value)}/> <div className={style.smalldiv}>Feature</div></label>
        </div>
        <div className={style.roadmap}>
          <p className={style.roadmapText}>Roadmap</p>
          <Link to={'/roadmap'}><p className={style.View}>View</p></Link>
          <div className={style.textdiv}><FontAwesomeIcon icon={faCircle} className={style.iconCircle+" "+style.Planned}/><p>Planned</p></div>
          <p className={style.number}>{props.data.filter(a=>a.status=='planned').length}</p>
          <div className={style.textdiv}><FontAwesomeIcon icon={faCircle} className={style.iconCircle+" "+style.Progress}/><p>In-Progress</p></div>
          <p className={style.number}>{props.data.filter(a=>a.status=='in-progress').length}</p>
          <div className={style.textdiv}><FontAwesomeIcon icon={faCircle} className={style.iconCircle+" "+style.Live}/><p>Live</p></div>
          <p className={style.number}>{props.data.filter(a=>a.status=='live').length}</p>
        </div>
    </div>
  )
}
