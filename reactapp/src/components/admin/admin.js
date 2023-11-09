import { Outlet,Link } from "react-router-dom";
import SideBar from "./sidebar";
import './admin.scss';
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb"
import { useState } from "react";
const Admin=(props) =>{
    const [collapsed,setCollapsed] = useState(false);
    return(
        <div className="admin-container">
           <div class="admin-sidebar">
                <SideBar collapsed={collapsed}/>
            </div>
            <div className="admin-contents">
                <div className="admin-header">
                    {collapsed ? 
                   <TbLayoutSidebarRightCollapseFilled  size={30} onClick={()=>{setCollapsed(!collapsed)}}/>:
                   <TbLayoutSidebarLeftCollapseFilled  size={30} onClick={()=>{setCollapsed(!collapsed)}}/> 
                    }
                </div>
                <div className="admin-content">
                    <Outlet/>
                </div>
            </div>
        </div>
        
    )
}
export default Admin;