import {useState,type InputHTMLAttributes} from 'react';
export default function PasswordInput(props:InputHTMLAttributes<HTMLInputElement>){
 const [visible,setVisible]=useState(false);
 return <span className="password-input-wrap"><input {...props} type={visible?'text':'password'}/><button type="button" className="password-eye" aria-label={visible?'隐藏密码':'显示密码'} aria-pressed={visible} onClick={()=>setVisible(v=>!v)}>{visible?'◉':'◎'}</button></span>;
}
