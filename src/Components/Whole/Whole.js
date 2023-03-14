import React, { useState } from 'react'
import Main from '../Main/Main'
import Sidebar from '../Sidebar/Sidebar'
import style from './Whole.module.css'

export default function Whole() {
  const [filter,setfilter]=useState('all');
  const [data,setdata]=useState([]);
  const [sort,setsort]=useState('Recently Added');
  return (
    <div className={style.whole}>
        <Sidebar  setdata={setdata} data={data} filter={filter} setfilter={setfilter} setsort={setsort} sort={sort}/>
        <Main setdata={setdata} data={data} filter={filter} setfilter={setfilter} setsort={setsort} sort={sort}/>
    </div>
  )
}