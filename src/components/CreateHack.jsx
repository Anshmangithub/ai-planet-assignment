import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addHackathons, updateHackathons } from '../store/reducers/hackathonReducers';
import Navbar from './Navbar';
import { IoMdArrowForward } from "react-icons/io";

const CreateHack = () => {

      const {id} = useParams()
  
      const dispatch =   useDispatch();
      const navigate =   useNavigate();
    const fileInput = useRef()
     const hackathons = useSelector(state => state.hackathons.hackathons);

     const existingHackathon = hackathons.find((hack) => String(hack.id) === String(id));

  
     const [challengename, setChallengename] = useState(existingHackathon ? existingHackathon.challengename : "");
     const [startdate, setStartdate] = useState(existingHackathon ? existingHackathon.startdate : null);
     const [enddate, setEnddate] = useState(existingHackathon ? existingHackathon.enddate : null);
     const [description, setDescription] = useState(existingHackathon ? existingHackathon.description : "")
    const [level, setLevel] = useState(existingHackathon ? existingHackathon.level : "Easy");
    const [images, setImages] = useState([]);
     const [imagePreview, setimagePreview] = useState(existingHackathon ? existingHackathon.images : "")
   
     const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };


   

   const submitHandler = async(e)=>{
   
    e.preventDefault()

    const base64Image = images ? await convertToBase64(images) : '';

    const newHackathons ={
    id : existingHackathon ? existingHackathon.id :  Date.now(),
    challengename,
    startdate,
    enddate,
    description,
    images : base64Image,
     level
    }

    if(existingHackathon){
      dispatch(updateHackathons(newHackathons))
    }else{

      dispatch(addHackathons(newHackathons))
    }

    console.log(newHackathons)
  navigate("/")
} 
const ImageHandler =(e)=>{
 const file  = e.target.files[0];
 if(file){
   setImages(file)  
   setimagePreview(URL.createObjectURL(file))   
 }
}
const fileHandlerClick = ()=>{
  fileInput.current.click()
}
const changeImageHandler = ()=>{
  fileHandlerClick()
}
  return (
    <div className='w-full '>
     <Navbar/>
     <div className='w-full h-28 bg-[#F8F9FD] flex items-center'>
      <h2 className='text-2xl font-semibold mx-20'>Challenge Details</h2>
     </div>
     <form action="" onSubmit={submitHandler} >
      <div className='w-96 h-96  mx-20 mt-8'>
      
      <h4 className='text-lg text-[#333333] '>Challenge Name</h4>
       <input type="text" className='border-2 border-slate-300 p-4 rounded-[5px] w-full mt-5 h-10'
        name='challengename' onChange={(e) => setChallengename(e.target.value)}
        value={challengename}
       />
       <h4 className='text-lg text-[#333333] mt-8'>Start Date</h4>
       <input type="date" className='border-2 border-slate-300 p-4 rounded-[5px] w-full mt-5 h-10 ' 
       name='startdate'
       onChange={(e) =>setStartdate(e.target.value)}
       value={startdate}
       
       />
       <h4 className='text-lg text-[#333333] mt-8'>End Date</h4>
       <input type="date" className='border-2 border-slate-300 p-4 rounded-[5px] w-full mt-5 h-10' 
       
            name='enddate'
      onChange={(e) =>setEnddate(e.target.value)}
      value={enddate}
       />
       
      </div>

      <div className='w-[100vh]  mx-20'>
      <h4 className='text-lg text-[#333333] '>Description</h4>
      <textarea name="description" 
      onChange={(e) => setDescription(e.target.value)}
      value={description}
      className='border-2 border-slate-300 rounded-[5px] w-full h-72 mt-8 p-5' placeholder='Description' id=""></textarea>
       
        
       </div>
       <h4 className='text-lg text-[#333333] mx-20 mt-5'>Image</h4>

       {imagePreview  ? (
  
        <div className='w-80 h-64  mx-20 mt-8 bg-[#F8F9FD] pt-8 rounded-[10px]'>
       <img src={imagePreview}  alt="" className='w-72 h-36 mx-auto  rounded-[15px] bg-red-300'/>
       <div className='flex items-center gap-2 mx-5 mt-5 '>
       <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_27_157)">
<path d="M0.00183105 2.8125C0.00183105 2.31522 0.199375 1.83831 0.551006 1.48667C0.902637 1.13504 1.37955 0.9375 1.87683 0.9375H13.1268C13.6241 0.9375 14.101 1.13504 14.4527 1.48667C14.8043 1.83831 15.0018 2.31522 15.0018 2.8125V12.1875C15.0018 12.6848 14.8043 13.1617 14.4527 13.5133C14.101 13.865 13.6241 14.0625 13.1268 14.0625H1.87683C1.37955 14.0625 0.902637 13.865 0.551006 13.5133C0.199375 13.1617 0.00183105 12.6848 0.00183105 12.1875V2.8125ZM0.939331 11.25V12.1875C0.939331 12.4361 1.0381 12.6746 1.21392 12.8504C1.38973 13.0262 1.62819 13.125 1.87683 13.125H13.1268C13.3755 13.125 13.6139 13.0262 13.7897 12.8504C13.9656 12.6746 14.0643 12.4361 14.0643 12.1875V8.90625L10.5234 7.08094C10.4355 7.0369 10.3359 7.02162 10.2389 7.03727C10.1418 7.05291 10.0521 7.09869 9.98246 7.16813L6.50433 10.6462L4.01058 8.985C3.92054 8.92506 3.81255 8.89809 3.7049 8.90869C3.59725 8.91928 3.49658 8.96678 3.41996 9.04313L0.939331 11.25ZM5.62683 5.15625C5.62683 4.78329 5.47867 4.4256 5.21495 4.16188C4.95123 3.89816 4.59354 3.75 4.22058 3.75C3.84762 3.75 3.48993 3.89816 3.22621 4.16188C2.96249 4.4256 2.81433 4.78329 2.81433 5.15625C2.81433 5.52921 2.96249 5.8869 3.22621 6.15062C3.48993 6.41434 3.84762 6.5625 4.22058 6.5625C4.59354 6.5625 4.95123 6.41434 5.21495 6.15062C5.47867 5.8869 5.62683 5.52921 5.62683 5.15625Z" fill="#44924C"/>
</g>
<defs>
<clipPath id="clip0_27_157">
<rect width="15" height="15" fill="white"/>
</clipPath>
</defs>
</svg>
<h4 className='text-sm text-[#44924C] cursor-pointer'  onClick={fileHandlerClick} >Change image</h4>
<IoMdArrowForward className='text-[#44924C] size-4 '/>
<input type="file" ref={fileInput} accept='image/*' onChange={ImageHandler} className='hidden' />
</div>  
      </div> 
  ):(

      <button   onClick={fileHandlerClick} className='w-48 h-12   bg-[#D9D9D9] rounded-[5px] mx-20 mt-8'>
        <div className='flex justify-center gap-3'>
          <h4 className='text-[#666666] text-md'>Upload</h4>
          
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.3654 10.186C16.9648 7.03087 14.2634 4.58337 11 4.58337C8.47371 4.58337 6.27921 6.06012 5.27729 8.38754C3.30829 8.97604 1.83337 10.835 1.83337 12.8334C1.83337 15.3606 3.88946 17.4167 6.41671 17.4167H16.5C18.5222 17.4167 20.1667 15.7722 20.1667 13.75C20.1653 12.9283 19.8886 12.1308 19.3808 11.4848C18.8731 10.8388 18.1635 10.3815 17.3654 10.186ZM11.9167 12.8334V15.5834H10.0834V12.8334H7.33337L11 8.25004L14.6667 12.8334H11.9167Z" fill="#666666"/>
</svg>
<input type="file" ref={fileInput} accept='image/*' onChange={ImageHandler} className='hidden' />
          </div>
      </button>
       )}


      <h4 className='text-lg text-[#333333] mx-20 mt-8'>Level type</h4>
      
      <select name="level" value={level} onChange={(e)=> setLevel(e.target.value)} id="" className='mx-20 mt-10 w-64 h-12 border-2 rounded-[5px] p-3 border-slate-300'>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    
     <div className='w-12 h-10  mx-20'></div>
      <button type='submit' className=' w-52 mb-10 h-12 rounded-[10px] mx-20 bg-[#44924C] mt-5 text-white'>{existingHackathon ? "Update Challenge" : "Create Challenge"}</button>
      </form>
    </div>
  )
}

export default CreateHack
