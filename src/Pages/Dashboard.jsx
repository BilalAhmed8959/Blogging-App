import { useEffect, useRef, useState } from 'react';
import { app, db } from '../firebase/firebase';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [blogData, setBlogData] = useState([]);

  // Check if user is authenticated
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

  // Logout functionality
  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch blogs on initial render
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="flex justify-end pr-20 -mt-16 bg-blue-600">
        <button onClick={logOut} className="border border-gray-500 w-16 h-10 rounded-lg hover:bg-blue-950 text-white">
          Logout
        </button>
      </div>
      <div className="bg-slate-200 h-14">
        <h1 className="font-bold text-2xl pl-40 pt-4">Dashboard</h1>
      </div>
      <div className="flex justify-center items-center pt-10">
        <form
          onSubmit={postBlog}
          className="flex flex-col items-center justify-center shadow-gray-500 shadow-lg rounded-lg border w-2/4 h-52 p-4 gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full max-w-xs"
            ref={titleRef}
          />
          <textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            ref={descriptionRef}
          ></textarea>
          <button type="submit" className="btn btn-outline btn-primary">
            Publish Blog
          </button>
        </form>
      </div>
      <div className="pt-10">
        {blogData.map((blog) => (
          <div key={blog.id} className="p-4 border-b">
            <h2 className="font-bold">{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
