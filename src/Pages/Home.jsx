import React from 'react'

const Home = () => {

  const login = ()=>{
    
  }
  return (
    <>
     <div className='flex justify-end pr-20 -mt-16 bg-blue-600'>
      <button onClick={login} className='border border-gray-500  w-16 h-10 rounded-lg  hover:bg-blue-950 text-white '>Logout</button>
    </div>
    <div className=' bg-slate-200 h-14 '>  
     <h1 className='font-bold text-2xl  pl-40 pt-4'>Home</h1>
     </div> 
    </>
  )
}

export default Home
