import React, { useEffect } from 'react'
import style from './Suggestions.module.css'

export default function Suggestions(props) {
    useEffect(()=>{
        // console.log(props.data.comments)
    },[])
  return (
    <div className={style.whole}>
        <div className={style.upvotes}>
            <img src='assests/icon-arrow-up.svg' alt='icon-arrow-down'/>
            <p>{props.data.upvotes}</p>
        </div>
        <div className={style.suggestiontextdiv}>
            <p className={style.suggestiontext1}>{props.data.title}</p>
            <p className={style.suggestiontext2}>{props.data.description} </p>
            <div className={style.smalldiv}>{props.data.category}</div>
        </div>
        <div className={style.commentdiv}>
            <img src='assests/icon-comments.svg' alt='comments'/>
            <p>{props.data.commentlength}</p>
        </div>
    </div>
  )
}
