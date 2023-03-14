import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import style from './ViewSuggestion.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {faChevronUp} from '@fortawesome/free-solid-svg-icons'
import Comment from '../Comment/Comment'

export default function ViewSuggestion() {
    let r=-1;
    const [data,setdata]=useState([]);
    const [comments,setcomments]=useState([]);
    const [commentlength,setcommentlength]=useState(0);
    const [mycomments,setmycomments]=useState({id:commentlength+1,content:'',user:{image:"./assets/user-images/image-zena.jpg",name:"Zena Kelley",username:"velvetround"}});
    const [upvotes,setupvotes]=useState(0);
    const [flag,setflag]=useState(false);
    const ref=useRef();
    const {id}=useParams();
    const fetchData=async()=>{
      const result =await fetch(`http://localhost:5996/view/${id}`)
      const jsonresult=await result.json();
      setdata(jsonresult[0]);
      setcomments(JSON.parse(jsonresult[0].comments));
      setupvotes(jsonresult[0].upvotes);
      let length=JSON.parse(jsonresult[0].comments).length
      JSON.parse(jsonresult[0].comments).map(a=>(a.replies)?(length=length+a.replies.length):null); 
      setcommentlength(length);
    }  
  useEffect(() => {
    fetchData();
    }, [flag]); 
    useEffect(()=>{
    },[upvotes,commentlength])
    const upvotesfun=async()=>{
        setupvotes(upvotes+1)
        const result1 =await fetch (`http://localhost:5996/upvotes/${id}/${upvotes+1}`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
        })
        const resultJson1=await result1.json();
    }
    const postcom=async()=>{
        setcomments([...comments,mycomments]);
        setcommentlength(commentlength+1);
        const result1 =await fetch (`http://localhost:5996/comment/${id}/${commentlength+1}`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify([...comments,mycomments])
        })
        const resultJson1=await result1.json();
        ref.current.value='';
    }
    const postreplies=async(e)=>{
        console.log(e);
        setflag(!flag);
        let replies=(comments[e.id].replies!==undefined)?comments[e.id].replies:[];
        replies.push(e);
        comments[e.id].replies=replies;
        setcommentlength(commentlength+1);
        const result1 =await fetch (`http://localhost:5996/comment/${id}/${commentlength+1}`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(comments)
        })
        const resultJson1=await result1.json();
    }
  return (
    <div className={style.whole}>
        <div className={style.topdiv}>
        <Link to={"/"}  style={{ textDecoration: 'none' }}><p className={style.goback}><FontAwesomeIcon icon={faChevronLeft}/>Go Back</p></Link>
        <Link  to={`/edit/${id}`} ><button className={style.cancelbtn}>Edit Feedback</button></Link>
        </div>
        <div className={style.suggestiondiv}>
        <div className={style.wholediv}>
        <div className={style.upvotes}>
        <FontAwesomeIcon icon={faChevronUp} onClick={upvotesfun}/>
            <p>{upvotes}</p>
        </div>
        <div className={style.suggestiontextdiv}>
            <p className={style.suggestiontext1}>{data.title}</p>
            <p className={style.suggestiontext2}>{data.description}</p>
            <div className={style.smalldiv}>{data.category}</div>
        </div>
        <div className={style.commentdiv}>
            <div className={style.commentimg}></div>
            <p>{commentlength}</p>
        </div>
    </div>
        </div>
        <div  className={style.commentsdiv}>
            <p className={style.comments}>{commentlength} Comments</p>
            <div>
                {
                    comments.map(a=>{
                    return (<div><Comment data={a} i={++r} setmycomments={setmycomments} mycomments={mycomments} postreplies={postreplies}/>
                    {
                        (a.replies!==undefined)?a.replies.map(b=><div  className={style.repliesdiv}><Comment data={b}  i={r} setmycomments={setmycomments} mycomments={mycomments} postreplies={postreplies}/></div>):null
                    }
                    </div>
                    )  
                })
                }
            </div>
        </div>
        <div className={style.mycommentdiv}>
            <p>Add Comment</p>
            <textarea className={style.textarea} onChange={(e)=>setmycomments({...mycomments,content:e.target.value})} ref={ref} ></textarea>
            <div className={style.topdiv}><p>250 Characters left</p><button className={style.postbtn} onClick={postcom}>Post Comment</button></div>
        </div>
    </div>
  )
}
