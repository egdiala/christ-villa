import type { PropsWithChildren } from "react";
import { isAuthenticated } from "@/utils/authUtil";
import { Navigate } from "react-router";

const AuthLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();

    if (isLoggedIn) {
        return <Navigate to='/' replace />;
    }
  
    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className="flex justify-center w-full h-full bg-grey-dark-4 px-4 lg:px-0">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;