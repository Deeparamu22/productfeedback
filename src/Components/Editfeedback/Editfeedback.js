import React, { useEffect, useState } from 'react'
import style from './Editfeedback.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Editfeedback() {
    const [data,setdata]=useState([]);
    const {id}=useParams();
    const navigate = useNavigate();
    const [value,setvalue]=useState({title:data.title,category:data.category,status:data.status,description:data.description});
    const fetchData=async()=>{
      const result =await fetch(`http://localhost:5996/view/${id}`)
      const jsonresult=await result.json();
      setdata(jsonresult[0]);
      setvalue({title:jsonresult[0].title,category:jsonresult[0].category,status:jsonresult[0].status,description:jsonresult[0].description})
    }  
    useEffect(()=>{
      fetchData();
    },[])
  useEffect(() => {
   
    }, [value]); 
   const editfeedback=async()=>{
    console.log(value);
    if(value.title!=''&&value.description!='')
    {const result1 =await fetch (`http://localhost:5996/edit/${id}`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(value)
        })
        const resultJson1=await result1.json();
        navigate(`/view/${id}`);
        console.log(resultJson1,id);
      }
   }
   const deletefeedback=async()=>{
    const result1 =await fetch (`http://localhost:5996/delete/${id}`,{
          method:'DELETE',
          headers:{'Content-Type':'application/json'},
        })
        const resultJson1=await result1.json();
        navigate('/');
        console.log(resultJson1,id);
   }
  return ( 
    <div className={style.whole}> 
        <Link to={`/view/${id}`} style={{ textDecoration: 'none' }}><p className={style.goback}><FontAwesomeIcon icon={faChevronLeft}/>Go Back</p></Link>
        <img src='../assests/icon-edit-feedback.svg' alt='newfeedback' className={style.newfeedbackicon}/>
        <div className={style.form}>
            <h1 className={style.cretetext}>Edit '{data.title}'</h1>
            <p className={style.titlestyle}>Feedback Title</p>
            <p className={style.paratext}>Add a short, descriptive headline</p>
            <input type={'text'}  className={style.inputDiv} defaultValue={data.title} onChange={(e)=>setvalue({...value,title:e.target.value})}/>
            <p className={style.titlestyle}>Category</p>
            <p className={style.paratext}>Choose a category for your feedback</p>
            <select  className={style.inputDiv} defaultValue={data.category} onChange={(e)=>setvalue({...value,category:e.target.value})}>
                <option value='feature'>feature</option>
                <option value='UI'>UI</option>
                <option value='UX'>UX</option>
                <option value='enhancement'>enhancement</option>
                <option value='bug'>bug</option>
            </select>
            <p className={style.titlestyle}>Update Status</p>
            <p className={style.paratext}>Change feature state</p>
            
            <select  className={style.inputDiv} defaultValue={data.status} onChange={(e)=>setvalue({...value,status:e.target.value})}>
                <option value='suggestion'>Suggestion</option>
                <option value='planned'>Planned</option>
                <option value='in-progress'>In-Progress</option>
                <option value='live'>Live</option>
            </select>
            <p className={style.titlestyle}>Feedback Detail</p>
            <p className={style.paratext}>Include any specific comments on what should be improved, added, etc.</p>
            <textarea   className={style.textarea} defaultValue={data.description}  onChange={(e)=>setvalue({...value,description:e.target.value})}></textarea>
            <div className={style.buttondiv}>
            <button className={style.Deletebtn} onClick={deletefeedback}>Delete</button>
            <Link to={`/view/${id}`} style={{ textDecoration: 'none' }}><button className={style.cancelbtn}>Cancel</button></Link>
                <button className={style.addbtn} onClick={editfeedback}>Save Changes</button>
            </div>
        </div>
    </div>
  )
}
