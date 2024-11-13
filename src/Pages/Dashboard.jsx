import React, { useEffect } from 'react'
import { app } from '../firebase/firebase';
import { getAuth, signOut,onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid)
      } else {
        console.log("user not login")
        // alert("plase login")
        navigate('/')
      }
    });
  }, []);
  const auth = getAuth(app);
 const navigate = useNavigate()

  const logOut = ()=>{
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <>
    <div className='flex justify-end pr-20 -mt-16 bg-blue-600'>
      <button onClick={logOut} className='border border-gray-500  w-16 h-10 rounded-lg  hover:bg-blue-950 text-white '>Logout</button>
    </div>
    <div className=' bg-slate-200 h-14 '>  
     <h1 className='font-bold text-2xl  pl-40 pt-4'>Dashoard</h1>
     </div>

      <h1></h1>

    </>
  )
}

export default Dashboard
