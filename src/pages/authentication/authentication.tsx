import { Card, Grid } from "@mui/material";
// import Signup from "./Signup";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/Store";

const Authentication = () => {
  const [showLogin,setShowLogin] = useState(true)
    const { token} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div>
      <Grid container >
        <Grid size={7} className="h-screen overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Authentication Background"
          />
        </Grid>
        <Grid size={5} className="h-screen overflow-hidden">
          <div className="flex h-full items-center justify-center">
            <Card className="p-6">
              <div className="mb-4 text-center">
                <h1 className="font-bold">Welcome Back!</h1>
                <p>Connecting Lives, Sharing Stories: Your Social World, Your Way</p>
              </div>
              <div className="">
                {showLogin ?<Login /> : <Signup />}

                <span onClick={()=>setShowLogin(false)}>create Account</span>
              
             
              </div>

            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
