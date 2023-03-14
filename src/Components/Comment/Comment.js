import React, { useEffect, useState } from 'react'
import style from './Comment.module.css'

export default function Comment(props) {
    const [flag,setflag]=useState(false);
    const [replies,setreplies]=useState({id:1,replyingTo:'',content:'',user:{image:"./assets/user-images/image-zena.jpg",name:"Zena Kelley",username:"velvetround"}});
    let image=props.data.user.image.replace('./assets/user-images/',''); 
    useEffect(()=>{
    
    },[replies]);
    const postcom=()=>{
      console.log(replies);
      props.postreplies(replies);
      setflag(false);
    }
  return (
    <div className={style.whole}>
        <div className={style.commenttop}>
            <img src={`../assests/${image}`} alt={'user'} className={style.userimg}/>
            <div>
            <p>{props.data.user.name}</p>
            <p className={style.username}>@{props.data.user.username}</p>
            </div>
            <p onClick={()=>setflag(!flag)} className={style.reply}>Reply</p>
        </div>
        <p className={style.content}>{props.data.content}</p>
        {
            (flag)?<div className={style.mycommentdiv}>
            <textarea  className={style.textarea} onChange={(e)=>setreplies({...replies,content:e.target.value,id:props.i,replyingTo:props.data.user.username})}></textarea>
            <div className={style.topdiv}><button className={style.postbtn} id={props.i} onClick={postcom}>Post Comment</button></div>
        </div>:null
        }
    </div>
  )
}

