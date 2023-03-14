import React, { useEffect } from 'react'
import style from './RoadmapComment.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle} from '@fortawesome/free-solid-svg-icons'

export default function RoadmapComment(props) {
    
    useEffect(()=>{
        console.log(props.value.description);
    })
  return (
    <div className={style.whole+" "+style[props.box]}>
        <p className={style.title}><FontAwesomeIcon icon={faCircle} className={style.iconCircle+" "+style[props.box]}/>{props.value.status}</p>
        <p className={style.titlestyle}>{props.value.title}</p>
        <p className={style.title}>{props.value.description}</p>
        <div className={style.smalldiv}>{props.value.category}</div>
        <div className={style.bottomdiv}>
        <div className={style.smalldiv}><img src='assests/icon-arrow-up.svg' alt='up'/>  {props.value.upvotes}</div>
        <div className={style.smalldiv}><img src='assests/icon-comments.svg' alt='comments'/>  {props.value.commentlength}</div>
        </div>
    </div>
  )
}
