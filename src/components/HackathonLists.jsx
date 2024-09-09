import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const HackathonLists = () => {
  
  const hackathons =  useSelector((state) => state.hackathons.hackathons )
  
  const [search, setSearch] = useState("")
  const [filterLevel, setFilterLevel] = useState([])
  const [filterStatus, setfilterStatus] = useState([])
  const [filteredHackathons, setfilteredHackathons] = useState([])
  const [sort, setSort] = useState("newest")
  const [isOpenButton, setIsOpenButton] = useState(false)

   const  currentDate  = new Date();

   const getHackathonStatus =(hackathon)=>{
    const startDate = new Date(hackathon.startdate);
    const endDate  = new Date(hackathon.enddate)


    if (isNaN(startDate) || isNaN(endDate)) {
      return "unknown";
    }

    if(currentDate < startDate){
     return "upcoming"
    }else if(currentDate >= startDate && currentDate <= endDate){
     return "Active"
    }else{
     return "past"
    }
   }


   const calculateTimer =(date)=>{
   
    const diff = +new Date(date) - +new Date();
    let timeLeft = {};             

    if(diff > 0){
      timeLeft = {
        days : Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours : Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes : Math.floor((diff / 1000 / 60) % 60)
      }
    }
    return timeLeft;
   }

   useEffect(()=>{
const filtered = hackathons.filter((hack) => hack.challengename.toLowerCase().includes(search.toLowerCase()))
.filter((hack) => filterLevel.length === 0 || filterLevel.includes(hack.level)) // Fix for levels
.filter((hack) => {
  const status = getHackathonStatus(hack);
  return filterStatus.length === 0 || filterStatus.includes(status); // Fix for status
})
    .sort((a,b)=> sort === "newest" ? new Date(b.startdate) - new Date(a.startdate) : new Date(a.startdate) - new Date(b.startdate))
   
    setfilteredHackathons(filtered)
   },[hackathons , filterLevel , search , filterStatus , sort])
  
    const formateDate = (date)=>{
      const options = {days : 'numeric' , month : "short" , year : "2-digit" , hour : "numeric" , minute : 'numeric' , hour12 : true}
      return date.toLocaleString('en-US' , options).replace(',' , '')
    }

    const toogleButton = ()=>{
      setIsOpenButton(!isOpenButton)
    }


  const handleLevelChange = (level) => {
    setFilterLevel((prev) => 
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleStatusChange = (status) => {
    if (status === 'all') {

      if (filterStatus.includes('all')) {
        setfilterStatus([]); 
      } else {
        setfilterStatus(['active', 'upcoming', 'past', 'all']); 
      }
    } else {
    
      setfilterStatus((prev) =>
        prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
      );
    }
  };

  return (
     <div >
      <div className='w-full h-[324px] bg-[#002A3B] pt-14 '>

       <div className='w-80 h-12  flex justify-center mx-auto '>
        <h1 className='text-white text-3xl font-semibold '>Explore Challenges</h1>
       </div>
       <div className='w-7/12 h-12  mx-auto mt-14  flex gap-4'>
       <input type="text" className='h-full w-10/12 rounded-[12px] p-4 text-[#002A3B]' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search'  />


       <div className="relative inline-block text-left">

  <button type="button" onClick={toogleButton} className="inline-flex justify-center h-full w-32 rounded-[12px] border border-gray-300 shadow-sm px-4 py-2 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
    Filter
    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>

 
  {isOpenButton && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          <div className="py-1" role="none">
          
            <div className="px-4 py-2 text-sm text-gray-700">
              <span className="font-semibold">Status</span>
            </div>
            <div className="px-4 py-1">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" 
                 value="all"
                 onChange={() => handleStatusChange('all')}
                 checked={filterStatus.includes('all')}
                />
                <span className="ml-2 text-gray-700">All</span>
              </label>
            </div>
            <div className="px-4 py-1">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" 
                 value="active"
                 onChange={() => handleStatusChange('active')}
                 checked={filterStatus.includes('active')}
                />
                <span className="ml-2 text-gray-700">Active</span>
              </label>
            </div>
            <div className="px-4 py-1">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" 
                
                value="upcoming"
                onChange={() => handleStatusChange('upcoming')}
                checked={filterStatus.includes('upcoming')}
                />
                <span className="ml-2 text-gray-700">Upcoming</span>
              </label>
            </div>
            <div className="px-4 py-1">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" 
                  value="past"
                  onChange={() => handleStatusChange('past')}
                  checked={filterStatus.includes('past')}
                />
                <span className="ml-2 text-gray-700">Past</span>
              </label>
            </div>

       
            <div className="border-t border-gray-200"></div>

        
            <div className="px-4 py-2 text-sm text-gray-700">
              <span className="font-semibold">Level</span>
            </div>
            <div className="px-4 py-1">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600"  
                value="Easy"
                onChange={() => handleLevelChange('Easy')}
                checked={filterLevel.includes('Easy')}
                />
                <span className="ml-2 text-gray-700">Easy</span>
              </label>
            </div>
            <div className="px-4 py-1">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" 
                 value="Medium"
                 onChange={() => handleLevelChange('Medium')}
                 checked={filterLevel.includes('Medium')}
                />
                <span className="ml-2 text-gray-700">Medium</span>
              </label>
            </div>
            <div className="px-4 py-1">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" 
                 value="Hard"
                 onChange={() => handleLevelChange('Hard')}
                 checked={filterLevel.includes('Hard')}
                />
                <span className="ml-2 text-gray-700">Hard</span>
              </label>
            </div>
          </div>
        </div>
      )}
</div>
     
       </div>
      </div>



      <div className='w-full min-h-screen bg-[#003145] pt-20'>
      <div className='w-[1172px]   mx-auto flex flex-wrap gap-[55px] '>

   {filteredHackathons.length > 0 ? (
   filteredHackathons.map((hackathon)=>{
        const status = getHackathonStatus(hackathon);
    const startDate = new Date(hackathon.startdate);
    const endDate = new Date(hackathon.enddate);

    let timeDisplay;
    let timeStatus;

    if(status === "upcoming"){
      const timeleft = calculateTimer(startDate);
      if (timeleft.days !== undefined) {
         timeStatus = "Starts In"
        timeDisplay = ` ${timeleft.days} : ${timeleft.hours} : ${timeleft.minutes}`;
      } else {
        timeDisplay = "Starts soon!";
      }
    }else if(status === "Active"){
      const timeleft = calculateTimer(endDate);


       if (timeleft.days !== undefined) {
        timeStatus = "Ends In"
        timeDisplay = `${timeleft.days} : ${timeleft.hours} : ${timeleft.minutes}`;
      } else {
        timeDisplay = "Ends soon!";
      }
    }else if(status === "past"){
      timeStatus = "Ended on"
      timeDisplay = `${formateDate(endDate)}`;
    }

    return(

      <div className='h-[473px] w-[354px] bg-white rounded-[15px] overflow-hidden'>

      <div className='w-full h-44 bg-slate-300 '>
        <img src={hackathon.images} alt=""  className='w-full h-full'/>
      </div>
      
   <div className='w-9/12 h-[247px]  mx-auto mt-6'>
   <div className='w-24 h-5 bg-[#FCF1D2] mx-auto rounded-md flex items-center justify-center'
    style={{ backgroundColor : status === "Active" ? "#D2E5D4" :"#FCF1D2" }}
   >
  
  <p
  className={`text-xs ${status === "Active" ? "text-[#44924C]" : "text-[#666666]"}`}
 
>
  {status.charAt(0).toUpperCase() + status.slice(1)}
</p>
   </div>
   <h3 className='text-xl font-semibold mt-4 text-center mb-4'>{hackathon.challengename}</h3>

    <h4 className='text-sm text-center mb-1'>{timeStatus}</h4>
    <h2 className='text-2xl font-semibold text-[#454545] text-center'>{timeDisplay}</h2>

    {status !== "past" && <h4 className='text-xs text-center '> <span className='' >Days</span> <span  className='ml-2'>Hours</span> <span className='ml-2'>Mins</span>  </h4> }
    


  <Link to={`/hackathon/${hackathon.id}`}>  <button  className={ `  ${status === "past" ? "mt-12" : "mt-8"} w-52  h-12 bg-[#44924C] mx-8 rounded-[10px] flex justify-evenly items-center`}>
      <img src="charm_circle-tick.png" className='' alt="" />
      <h3 className='text-md text-white font-semibold'>Participate Now</h3>
    </button></Link>
   </div>
   </div>

    )
   })

   ) : (<p className='text-white font-medium'>No hackathons available...</p>)}

    

      </div>
       
      </div>
     </div>
  )
}

export default HackathonLists

