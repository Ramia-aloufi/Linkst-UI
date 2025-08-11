import Sidebar from "../../components/sidebar/Sidebar"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {

  return (
    <div className="h-screen px-12 space-y-4">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default HomeLayout