import { Avatar, Card, Divider, Grid, Typography } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/Store";
import logo from "../../assets/Linkst11.png"
const Authentication = () => {
  const [showLogin, setShowLogin] = useState(true)
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div>
      <Grid container>
        <Grid size={{ xs: 12, lg: 7 }} sx={{ height: { lg: '100vh' }, padding: { xs: 2 } }} className=" flex items-center justify-center">

          <Avatar
            sx={{
              width: { xs: 50, lg: 80 },
              height: { xs: 50, lg: 80 },
              margin: 1,
            }}
            alt="Linkst Logo"
            variant="square"
            
            src={logo}
          />
          <Typography sx={{ fontSize: { xs: '2rem', lg: '3rem' }, fontWeight: { xs: 700, lg: 900 } }} className="text-center mt-4">
            Linkst
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}  >
          <div className="flex h-full items-center justify-center">
            <Card variant="outlined" className="p-4 flex flex-col">
              <div className="mb-4 text-center">
                <Typography variant="h6">Welcome Back!</Typography>
                <Typography variant="caption">Connecting Lives, Sharing Stories: Your Social World, Your Way</Typography>
                <Divider />
              </div>
              {showLogin ? <Login /> : <Signup />}
              <Typography variant="body2" fontWeight={500} marginTop={2} className="cursor-pointer" onClick={() => setShowLogin(!showLogin)}>{showLogin ? "Create Account" : "Already have an account? Log in"}</Typography>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};  

export default Authentication;
