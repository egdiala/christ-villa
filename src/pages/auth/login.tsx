import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { loginSchema } from "@/validations/auth";
import { useLogin } from "@/services/hooks/mutations";
import { routeVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, PasswordInput } from "@/components/core";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin((res) => {
    if (res.data === "201") {
      localStorage.setItem("reset-password-email", loginValues.email);
      navigate("/auth/reset-password");
    }
  });

  const {
    handleSubmit,
    register,
    isValid,
    values: loginValues,
  } = useFormikWrapper({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit(values) {
      mutate(values);
    },
  });

  return (
    <motion.div
      initial={routeVariants.initial}
      animate={routeVariants.final}
      exit={routeVariants.initial}
      className="grid gap-6 p-7 lg:pt-8 lg:px-12 bg-white max-w-md w-full h-fit place-self-center rounded-xl"
    >
      <div className="flex items-center mx-auto">
        <img src="/cv_logo_dark.svg" className="size-10" alt="cv_logo_dark" />
        <h1 className="font-bold text-2xl text-accent-tertiary">
          CHRIST VILLA
        </h1>
      </div>
      <h2 className="font-bold text-2xl md:text-[2rem] text-text-primary text-center">
        Sign in
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="grid gap-6 pb-6">
          <Input
            id="email"
            label="Email"
            type="text"
            placeholder="example@email.com"
            {...register("email")}
          />
          <PasswordInput
            id="password"
            label="Password"
            placeholder="•••••••••"
            {...register("password")}
            showPassword
          />
        </div>
        <Button
          type="submit"
          theme="primary"
          loading={isPending}
          disabled={!isValid || isPending}
          block
        >
          Sign In
        </Button>
        <Link
          to="/auth/forgot-password"
          className="text-center text-background-tertiary underline underline-offset-2 decoration-background-tertiary text-base font-black"
        >
          Reset Password
        </Link>
      </form>
    </motion.div>
  );
};
