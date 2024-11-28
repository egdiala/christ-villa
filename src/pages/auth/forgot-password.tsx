import { Link } from "react-router"
import { motion } from "motion/react"
import { Button, Input } from "@/components/core"
import { routeVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"


export const ForgotPasswordPage = () => {

    const { handleSubmit, register } = useFormikWrapper({
        validateOnMount: true,
        initialValues: {
            email: "",
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
            <div className="grid gap-1">
                <h1 className="font-bold text-2xl md:text-[2rem] text-text-primary text-center">Forgot Password</h1>
                <p className="text-sm font-medium text-center text-text-secondary">Enter the email address associated with your account</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <Input label="Email" type="text" placeholder="example@email.com" {...register("email")} />
                <Button type="submit" theme="primary" block>Verify Email</Button>
                <Link to="/auth/login" className="text-center text-background-tertiary underline underline-offset-2 decoration-background-tertiary text-sm font-black">Sign in instead</Link>
            </form>
        </motion.div>
    )
}