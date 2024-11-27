import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  
    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className="flex justify-center w-full h-full bg-portal-bg px-4 lg:px-0">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;