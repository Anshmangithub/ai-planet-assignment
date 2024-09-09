import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { deleteHackathons } from '../store/reducers/hackathonReducers'
import Navbar from './Navbar'
import { MdAccessTime } from "react-icons/md";

 
const Hackathon = () => {
    const { id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [hackathon, sethackathon] = useState(null)
   const  hackathons =  useSelector(state => state.hackathons.hackathons);

   useEffect(()=>{
  const specificHackathon =   hackathons.find((hack) => String(hack.id) === String(id))
  sethackathon(specificHackathon)
 
   },[hackathons , id])

   if(!hackathon){
    return <div>Loding...</div>
   }

    const startDate = new Date(hackathon.startdate);
    const endDate  = new Date(hackathon.enddate);
    const currentDate = new Date();

    const formateDateStart = startDate.toLocaleString("en-US" , 
        {
           
            year : "2-digit",
            month : "short",
            day : "numeric",
            hour : "numeric",
            minute : "numeric"
        }
    )

    const formateDateend = endDate.toLocaleString("en-US" , {
       
        year : "2-digit",
        month : "short",
        day : "numeric",
        hour : "numeric",
        minute : "numeric"
    })
   let formateMessage;

    if(currentDate < startDate){
       formateMessage = `starts on: ${formateDateStart}`
    }else if(currentDate >= startDate && currentDate <= endDate){
        formateMessage = `Ends on : ${formateDateend}`
    }else{
        formateMessage = `Ended on ${formateDateend}`
    }
   
     const DeleteHandler = ()=>{
        dispatch(deleteHackathons(hackathon.id))
        navigate("/")
     }
    

   return (
    <div className='w-full min-h-screen'>
  <Navbar/>
      <div className='w-full h-[419px] bg-[#003145] flex items-center'>
     
        <div className='w-8/12 mx-32  '>
        <div className='w-7/12 h-10  bg-[#FFCE5C] rounded-[5px] flex justify-center items-center gap-3 '>
        <MdAccessTime className='size-5' />

        <h5 className='text-lg text-black font-semibold '>{formateMessage} (India Standard Time)</h5>
        </div>
        <h1 className='text-5xl text-white font-semibold mt-10'>{hackathon.challengename}</h1>
        <h3 className='text-xl text-white mt-8'>{hackathon.description}</h3>
        <div className='w-24 h-10 rounded-[5px] bg-white mt-8 flex justify-evenly gap-1 items-center'>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 16.875H12.375V2.25H16.875V16.875ZM13.5 15.75H15.75V3.375H13.5V15.75ZM11.25 16.875H6.75V6.75H11.25V16.875ZM7.875 15.75H10.125V7.875H7.875V15.75ZM5.625 16.875H1.125V10.125H5.625V16.875Z" fill="#003145"/>
</svg>
    <h4 className='text-[#003145] text-md font-semibold'>{hackathon.level}</h4>
        </div>

        </div>

      </div>

      <div className='w-full h-20  border-b-2  shadow-[0px_6px_12px_0px] shadow-[#DDE6ED] flex items-center'> 
        <div className='h-full w-32  ml-32'> 
        <h4 className='text-xl  font-semibold text-center mt-6'>Overview</h4>
        <div className='w-full h-2 bg-[#44924C] rounded-[20px] mt-5'></div>
        </div>
           
     <Link to={`/createhack/${hackathon.id}`}>
      <button className='w-24 rounded-[10px] h-10 bg-[#44924C] ml-[900px] text-white'>Edit</button>
     
     </Link>  
        <button onClick={DeleteHandler} className='w-24 rounded-[10px] h-10 border-2 border-[#DC1414] font-semibold ml-4  text-[#DC1414]'>Delete</button>
      </div>

      <div className='w-8/12 mx-32 mt-16'>
      <h4 className=' text-md font-medium text-[#64607D]  mb-10'>Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.
 <br />
 <br />
An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.
<br />
 <br />
Your Task is to build an Image Classification Model using CNN that classifies to which class of weather  each image belongs to.</h4>
      </div>
     
    </div>
  )
}

export default Hackathon
