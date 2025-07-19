import { Grid } from "@mui/material"
import Sidebar from "../../components/sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import Rightbar from "../../components/Rightbar"



const HomeLayout = () => {

  return (
    <Grid container spacing={5} className="h-screen px-12">
      <Grid size={3} >
        <Sidebar />
      </Grid>
      <Grid size={6} className="h-screen overflow-scroll hideScrollBar">
        <Outlet />
      </Grid>
      <Grid size={3}>
       {location.pathname =="/" && <Rightbar />}
      </Grid>

    </Grid>
  )
}

export default HomeLayout