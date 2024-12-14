import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs } from "firebase/firestore";


const Home = () => {
  const navigate = useNavigate()
  const auth = getAuth(app);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [blogData, setBlogData] = useState([]);

  const login = ()=>{
    navigate('/login')
    
  }
  const signup = ()=>{
    navigate('/signup')
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("User not logged in");
        navigate('/');
      }
    });
  }, [auth, navigate]);

  // Fetch blogs from Firestore
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
      });
      setBlogData(blogs);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    }
  };

  // Add a new blog to Firestore
  const postBlog = async (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    if (!title || !description) {
      alert("Both fields are required");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "users"), {
        title,
        description,
        uid: auth.currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);

      setBlogData((prevData) => [
        ...prevData,
        { id: docRef.id, title, description, uid: auth.currentUser.uid },
      ]);

      // Clear form fields
      titleRef.current.value = "";
      descriptionRef.current.value = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
     <div className='flex justify-end pr-20 -mt-16 bg-blue-600'>
     <button onClick={signup} className='border border-gray-500 mr-4 w-16 h-10 rounded-lg  hover:bg-blue-950 text-white '>Signup</button>
      <button onClick={login} className='border border-gray-500  w-16 h-10 rounded-lg  hover:bg-blue-950 text-white '>Login</button>
    </div>
    <div className=' bg-slate-200 h-14 '>  
     <h1 className='font-bold text-2xl  pl-40 pt-4'>Home</h1>
     </div> 
{/*     
      <div className="bg-slate-200 h-14">
      </div> */}
      <div className="flex justify-center items-center pt-10">
        
     
      <div className="pt-10">
        {blogData.map((blog) => (
          <div key={blog.id} className="p-4 border-b">
            <h2 className="font-bold">{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
      </div>
    </>
  )
}

export default Home
