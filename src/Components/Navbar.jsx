import { Link } from 'react-router-dom'

export const Navbar = () => {

  
  return (
    <>
    <div className="navbar ">
  <div className="flex-1 ">
    <a className="bg-blue-600 -mt-6 text-white  h-10 w-full pl-40">Blogging App</a>
  </div>
  <div className="flex-none gap-2 bg-blue-600 -mt-6  h-10">
        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn bg-blue-600  border-gray-500 btn-circle avatar hover:bg-blue-950 text-white">
       <p>Bilal</p>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={""}  className="justify-between">
            Home
          </Link>
        </li>
        <li><Link to={"dashboard"}>Dashboard</Link></li>
        <li><Link to={"profile"}>Profile</Link></li>
      </ul>
    </div>
  </div>
</div>
    </>
  )
}
export default Navbar