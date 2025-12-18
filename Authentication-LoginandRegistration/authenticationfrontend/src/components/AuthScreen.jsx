import { Outlet } from "react-router-dom";

export default function AuthScreen(){

    return(
        <div className="authMain">
            <div className="authLeft">
                
            </div>
            <div className="bg-info authRight">
                <Outlet />
            </div>
        </div>
    )
}