import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyUI from '../EmptyUI/EmptyUI'
import Suggestions from '../Suggestions/Suggestions'
import style from './Main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronUp} from '@fortawesome/free-solid-svg-icons'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

export default function Main(props) {
  const [flag,setflag]=useState(false);
  useEffect(() => {
    }, [props.sort,props.filter,props.data]); 
  return (
    <div className={style.whole}>
      <div className={style.topbar}>
        <img src="assests/icon-suggestions.svg" alt='suggestions' className={style.suggestions}/>
        <p className={style.sugCount}>{props.data.length} Suggestions</p>
        <div className={style.sortDiv}>
          <p className={style.sortpara}>Sort by :</p>
          <div className={style.sort} onClick={()=>setflag(!flag)}>
          <p>{props.sort}</p>
          {(flag)?<FontAwesomeIcon icon={faChevronDown}/>:<FontAwesomeIcon icon={faChevronUp}/>}
          </div>
        </div>
        <Link to={"/newfeedback"}  style={{ textDecoration: 'none' }}>
        <div className={style.addfeed}>
          <p>+Add Feedback</p>
        </div>
        </Link>
      </div>
      <div className={style.suggestionswholeDiv}>
        {
        (props.data.length!==0)?props.data.map(a=><Link to={`/view/${a.id}`}  style={{ textDecoration: 'none' }}><Suggestions data={a}/></Link>):<EmptyUI/>
        }  
      </div>
      {(flag)?<div className={style.absolute}>
      <label ><input type={'radio'} className={style.radiobtn} name="sort" value="Recently Added" onClick={(e)=>props.setsort(e.target.value)} defaultValue/><div  className={style.sorttext}><p>Recently Added</p>{(props.sort==='Recently Added')?<p>&#x2713;</p>:null}</div></label>
        <label ><input type={'radio'} className={style.radiobtn} name="sort" value="Most Upvotes" onClick={(e)=>props.setsort(e.target.value)} /><div  className={style.sorttext}><p>Most Upvotes</p>{(props.sort==='Most Upvotes')?<p>&#x2713;</p>:null}</div></label>
        <label><input type={'radio'} className={style.radiobtn} name="sort" value="Least Upvotes" onClick={(e)=>props.setsort(e.target.value)}/><div  className={style.sorttext}><p>Least Upvotes</p>{(props.sort==='Least Upvotes')?<p>&#x2713;</p>:null}</div></label>
        <label><input type={'radio'} className={style.radiobtn} name="sort" value="Most Comments" onClick={(e)=>props.setsort(e.target.value)}/><div  className={style.sorttext}><p>Most Comments</p>{(props.sort==='Most Comments')?<p>&#x2713;</p>:null}</div></label>
        <label><input type={'radio'} className={style.radiobtn} name="sort" value="Least Comments" onClick={(e)=>props.setsort(e.target.value)}/><div  className={style.sorttext}><p>Least Comments</p>{(props.sort==='Least Comments')?<p>&#x2713;</p>:null}</div></label>
      </div>:null}
    </div>
  )
}
