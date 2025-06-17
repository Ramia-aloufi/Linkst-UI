

import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import type { AppDispatch } from "../../redux/Store";
import { useDispatch } from "react-redux";
import { SignupUser } from "../../redux/auth/AuthService";

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
    // const authSelectors = (state:RootState) => state.auth;
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(SignupUser(data));
        
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
            <div>
                <TextField
                    label="First Name"
                    type="text"
                    fullWidth
                    autoComplete="off"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register("firstName")}
                />
            </div>
            <div>
                <TextField
                    label="Last Name"
                    type="text"
                    fullWidth
                    autoComplete="off"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register("lastName")}
                />
            </div>
            <div>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    autoComplete="off"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register("email")}
                />
            </div>
            <div>

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    autoComplete="off"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password")}
                />
            </div>
            <div>
                <RadioGroup row >
                    <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                        {...register("gender")}
                    />
                    <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                        {...register("gender")}
                    />
                </RadioGroup>
            </div>
            <Button sx={{ padding: " .8rem 0rem" }} type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
            </Button>
        </form>
    );
};

export default Signup;
