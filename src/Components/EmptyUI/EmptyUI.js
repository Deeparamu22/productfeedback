import React from 'react'
import { Link } from 'react-router-dom'
import style from './EmptyUI.module.css'

export default function EmptyUI() {
  return (
    <div className={style.whole}>
        <img src="assests/illustration-empty.svg" alt="empty" className={style.emptyimg}/>
        <h2 className={style.feedback}>There is no feedback yet.</h2>
        <p>Got a suggestion? Found a bug that needs to be squashed? </p>
           <p>We love hearing about new ideas to improve our app.</p>
           <Link to={"/newfeedback"}  style={{ textDecoration: 'none' }}>
           <div className={style.addfeed}>
          <p>+ Add Feedback</p>
        </div>
        </Link>
    </div>
  )
}
