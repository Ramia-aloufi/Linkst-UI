import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import z from "zod";
import type { AppDispatch, RootState } from "../../redux/Store";
import { LoginUser } from "../../redux/auth/AuthService";

const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password is too long" }),
});

type Inputs = z.infer<typeof LoginSchema>;

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(LoginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 justify-center">
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
      <Button sx={{ width: 350, padding: "12px 16px" }} type="submit" variant="contained" color="primary">
        {loading ? "loading" : "Log In"}
      </Button>
    </form>
  );
};

export default Login;
