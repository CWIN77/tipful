import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../Components/quill.css';
import styled from 'styled-components'

import {ReactComponent as Svg_arrow_left} from '../svg/arrow_left.svg'
import {postTip} from '../firebase/firestore'

const Placeholder = styled.div`
  position: absolute;
  display:flex;
  height:0px;
  z-index: 1;
  font-size: 1.4rem;
  user-select:none;
  color:#808080;

  @media only screen and (max-width: 760px) {
    top: 132px;
    left: 18px;
    font-size: 1.1rem;
  }
`
const NavBar = styled.nav`
  width:100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom:0px;
  left:0px;
  background-color: #222222;
  *{
    background-color: initial;
  }
`
const OutBtn = styled.button`
  display:flex;
  align-items: center;
  margin:8px;
  margin-left: 20px;
  padding: 4px;
  padding-left: 2px;
  padding-right: 2px;
  outline: none;
  border: none;
  cursor: pointer;
`
const OutBtnText = styled.div`
  font-size: 16px;
  margin-left: 6px;
`
const PostBtn = styled.button`
  font-size: 16px;
  padding: 8px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 4px;
  margin: 8px;
  margin-right: 20px;
  background-color: #36E0F8;
  font-weight: 600;
  color:black;
  outline: none;
  border: none;
  cursor: pointer;
`

function Writer() {
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'link', 'image',
    'align', 'color', 'background',
  ]
  const modules = {
    toolbar: {
      container: [
        [{header:"1"},{header:"2"}],
        ['bold','underline','strike'],
        ['link']
      ]
    },
  }

  const [content, setContent] = useState('')
  const [title,setTitle] = useState('')

  return (
    <div className='container'>
      <input className='title' placeholder='제목을 입력하세요' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
      {
        content == '' || content == '<p><br></p>' || content == '<h1><br></h1>' || content == '<h2><br></h2>'
        ? <Placeholder>작성</Placeholder>
        : null
      }
      <ReactQuill
        theme="snow"
        modules={modules} 
        formats={formats} 
        value={content || ''} 
        onChange={(content) => {setContent(content)}}/>
      <NavBar>
        <OutBtn>
          <Svg_arrow_left width={18} height={18} fill={'#ECECEC'} />
          <OutBtnText onClick={()=>{
            if(content != '' && content != '<p><br></p>' && content != '<h1><br></h1>' && content != '<h2><br></h2>'){
              if(window.confirm('페이지를 나가면 저장이 안됩니다.\n나가시겠습니까?')){
                window.location.href=window.location.origin
              }
            }else{
              window.location.href=window.location.origin
            }
          }}>나가기</OutBtnText>
        </OutBtn>
        <PostBtn onClick={()=>{postTip(title,content)}}>포스트!</PostBtn>
      </NavBar>
    </div>
  )
}

export default Writer
