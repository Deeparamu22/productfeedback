import React, { useEffect, useState } from 'react'
import style from './Roadmap.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import RoadmapComment from '../RoadmapComment/RoadmapComment'

export default function Roadmap() {
    const [planned,setplanned]=useState([]);
    const [progressin,setprogressin]=useState([]);
    const [live,setlive]=useState([]);
    const fetchData=async()=>{
        const result =await fetch("http://localhost:5996/home")
        const jsonresult=await result.json();
        setprogressin(jsonresult.filter(a=>a.status==='in-progress'))
            setplanned(jsonresult.filter(a=>a.status==='planned'));
            setlive(jsonresult.filter(a=>a.status==='live'));
      }  
      useEffect(()=>{
            fetchData();
            console.log(progressin);
      },[])
  return (
    <div className={style.whole}>
     <div className={style.topbar}>
        <div>
        <Link to={"/"}  style={{ textDecoration: 'none',color:'white' }}><p><FontAwesomeIcon icon={faChevronLeft}/> Go Back</p></Link>
            <p className={style.roadmap}>RoadMap</p>
        </div>
        <Link to={"/newfeedback"}  style={{ textDecoration: 'none' }}>
        <div className={style.addfeed}>
          <p>+Add Feedback</p>
        </div>
        </Link>
      </div>
      <div className={style.maindiv}>
        <div className={style.insideDiv}>
            <p className={style.titlestyle}>Planned</p>
            <p  className={style.paratext}>Ideas prioritized for research</p>
            {
                planned.map(a=><Link to={`/view/${a.id}`}  style={{ textDecoration: 'none' }}><RoadmapComment box={'planned'} value={a}/></Link>)
            }
            
        </div>
        <div className={style.insideDiv}>
        <p className={style.titlestyle}>In-Progress (3)</p>
            <p className={style.paratext}>Currently being developed</p>
            {
                progressin.map(a=><Link to={`/view/${a.id}`}  style={{ textDecoration: 'none' }}><RoadmapComment box={'progressin'} value={a}/></Link>)
            }
            
        </div>
        <div className={style.insideDiv}>
            <p className={style.titlestyle}>Live</p>
            <p className={style.paratext}>Released features</p>
            {
                live.map(a=><Link to={`/view/${a.id}`}  style={{ textDecoration: 'none' }}><RoadmapComment box={'live'} value={a}/></Link>)
            }
        </div>
        </div>   
    </div>
  )
}
