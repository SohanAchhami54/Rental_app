import { useEffect, useState } from 'react'
import Title from './Title';
import { useAppcontext } from '../../context/AppContext';
import { fetchDashData } from '../../services/owner';

const DashBoard = () => {
  const {currency}=useAppcontext();
  const [data,setData]=useState({
    totalbikes:0,
    totalbooking:0,
    pendingbooking:0,
    completebooking:0,
    recentbooking: [],
     monthlyRevenue:0
  });

  const dashboardCards=[
     {title:'Total Bikes',value:data.totalbikes},
     {title:'Total Bookings',value:data.totalbooking},
     {title:'Pending',value:data.pendingbooking},
     {title:'Confirmed',value:data.completebooking},
  ]

  const fetchDashboardData=async()=>{
    await fetchDashData(setData)
        
  }
  useEffect(()=>{  //when this component gets load for the first time.

       fetchDashboardData();
   
  },[]);



  return (
    <>
     <div className='px-4 pt-10 md:px-10 flex-1'>
       <Title title='Host DashBoard' subTitle='I controlled all the data hehehe' />
       {/* this is to display the dashboardCards data */}
       <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2'>
        {
          dashboardCards.map((curElem,index)=>{
            return <li key={index} className='flex gap-2 justify-between bg-gray-300 rounded-lg p-4'>
              {/* this is for title and value section  */}
              <div>
                 <h1>{curElem.title}</h1>
                 <h2>{curElem.value} </h2>
              </div>
              {/* this is for icon section */}
                <div className='mt-1'>
                    {/* <img src={curElem.icon} alt="" /> */}
                </div>
            </li>
          })
        }
       </ul>

       {/* this is for recent bookings and monthly revenue */}
        <div className='flex flex-wrap items-start gap-12 mb-8  rounded-lg mt-5 w-full'>
          {/* recent booking */}
          <div className='p-4 md:p-6 w-full md:max-w-xl  rounded-lg  bg-gray-300'>
              <h1>Recent Bookings</h1>
              <p>Latest Customer Bookings </p>
               
               <ul className=''>
                {
                      data.recentbooking.map((bookdata,index)=>{
                          return <li key={index} className='mt-3 flex justify-between'>
                            {/* this is first div  */}
                              <div className='flex items-center  gap-2'>

                                  <div className='hidden md:flex items-center justify-center'>
                                  {/* <img src={assets.listIconColored} alt="" className='h-5 w-5' /> */}
                                </div>

                                <div>
                                  <p>{bookdata.bike.brand} {bookdata.bike.model } </p>
                                  <p className='text-sm text-gray-500'>{bookdata.createdAt.split('T')[0]} </p>
                                  </div>
                              </div>
                                {/* this is second div  */}
                            <div className='flex items-center gap-2 font-medium '>
                                <p className='text-sm text-gray-500'>{currency} {bookdata.price} </p>
                                <p>{bookdata.status} </p>
                            </div>
  

                          </li>
                      })
                }
               </ul>
          </div>
          {/* this is for monthly revenue */}
          <div className='p-4 md:pd-6 w-full md:max-w-lg  bg-gray-300 rounded-lg '>
                 <h1 className='text-lg font-medium'>Monthly Revenue</h1>
                 <p>Revenue for current month</p>
                 <p className='text-3xl mt-6 font-semibold text-blue-600'>{currency} {data.monthlyRevenue} 
                  
                 </p>
          </div>
        </div>

    </div>
    </>
   
  )
}

 export default DashBoard
