

import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Alert } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import type { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { SignupUser } from "../../redux/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../redux/post/PostService";
import { getMe } from "../../redux/user/UserService";

const SignupSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" })
        .max(50, { message: "First name is too long" }),
    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters" })
        .max(50, { message: "Last name is too long" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(100, { message: "Password is too long" }),
    gender: z.enum(["male", "female"], { message: "Select a gender" }),
});

type Inputs = z.infer<typeof SignupSchema>;

const Signup = () => {
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(SignupUser(data)).unwrap().then(() => {
            navigate("/");
      dispatch(getMe());
            dispatch(getPosts(0));

        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 justify-center">
            <TextField
                label="First Name"
                type="text"
                sx={{ width: 350 }}

                autoComplete="off"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                {...register("firstName")}
            />
            <TextField
                label="Last Name"
                type="text"
                sx={{ width: 350 }}

                autoComplete="off"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...register("lastName")}
            />
            <TextField
                label="Email"
                type="email"
                sx={{ width: 350 }}

                autoComplete="off"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
            />
            <TextField
                label="Password"
                type="password"
                sx={{ width: 350 }}

                autoComplete="off"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
            />
            <RadioGroup row   {...register("gender")}
                sx={{
                    '& .MuiFormControlLabel-label': { fontSize: '0.85rem' }, // smaller text
                    '& .MuiFormControlLabel-root': { marginRight: 1 } // reduce spacing
                }} >
                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
            </RadioGroup>
            {error && (
                <Alert severity="error" icon={false} sx={{ fontSize: '0.75rem' }}>
                    {error.message || "An error occurred during signup"}
                </Alert>
            )}
            <Button sx={{ padding: " .8rem 0rem", width: "350px" }} type="submit" variant="contained" color="primary" fullWidth>
                {!loading ? "Sign Up" : "Loading..."}
            </Button>
        </form>
    );
};

export default Signup;
