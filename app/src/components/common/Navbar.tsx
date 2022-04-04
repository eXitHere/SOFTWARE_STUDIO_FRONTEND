import {useState} from "react"
import profile1 from '../../assets/images/profile1.jpeg'
type Navbar = {
  onClick: () => void
  onChange: () => void
  handleLogout: () => void
}
const Navbar = () => {
  const [search,setSearch] = useState("")

  const handleLogout = () => {
    console.log("Log Out")
  }
  return (
    <div className="flex items-center justify-between w-full p-3 px-8 bg-primary-main">
      <p className="text-3xl text-white">ThammaTip</p>
      <form className="flex items-center w-3/6 h-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-1 rounded-md"
        ></input>
      </form>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img src={profile1} className="w-20 h-20 mt-2 bg-blue-300 rounded-full"></img>
          <p className={"text-white"}>Thisismyuser</p>
        </div>
        <button
          className="flex items-center justify-center h-12 ml-4 text-white bg-red-400 rounded-md w-28"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  )
}

export default Navbar