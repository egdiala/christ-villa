import { Link } from "react-router"
import { motion } from "motion/react"
import { Button, PasswordInput } from "@/components/core"
import { routeVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"


export const ResetPasswordPage = () => {

    const { handleSubmit, register } = useFormikWrapper({
        validateOnMount: true,
        initialValues: {
            new_password: "",
            confirm_password: ""
        },
        onSubmit() {
        }
    })

    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
            <div className="flex items-center mx-auto">
                <img src="/cv_logo_dark.svg" className="size-10" alt="cv_logo_dark" />
                <h1 className="font-bold text-2xl text-accent-tertiary">CHRIST VILLA</h1>
            </div>
            <h1 className="font-bold text-2xl md:text-[2rem] text-text-primary text-center">Enter New Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="grid gap-6">
                    <PasswordInput id="new_password" label="New Password" placeholder="•••••••••" {...register("new_password")} showPassword />
                    <PasswordInput id="confirm_password" label="Confirmed Password" placeholder="•••••••••" {...register("confirm_password")} showPassword />
                </div>
                <Button type="submit" theme="primary" block>Update Password</Button>
                <Link to="/auth/login" className="text-center text-background-tertiary underline underline-offset-2 decoration-background-tertiary text-sm font-black">Sign in instead</Link>
            </form>
        </motion.div>
    )
}