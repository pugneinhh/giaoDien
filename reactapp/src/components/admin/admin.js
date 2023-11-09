import { Outlet,Link } from "react-router-dom";
import SideBar from "./Sidebar";
import './admin.scss';
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb"
import { useState } from "react";
import {Avatar, Space,Badge, Button} from 'antd';
import { IoNotifications } from 'react-icons/io5';
import { FaUserAlt } from 'react-icons/fa';
import { Header } from "antd/es/layout/layout";
const Admin=(props) =>{
    const [collapsed,setCollapsed] = useState(false);
    return(
        <div className="admin-container">
           <div class="admin-sidebar">
                <SideBar collapsed={collapsed}/>
            </div>
            <div className="admin-contents">
               
                <Header className="admin-header" style={{padding:0}}>
                    <Button type="text" style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }} icon={collapsed ? 
                   <TbLayoutSidebarRightCollapseFilled  size={30} onClick={()=>{setCollapsed(!collapsed)}}/>:
                   <TbLayoutSidebarLeftCollapseFilled  size={30} onClick={()=>{setCollapsed(!collapsed)}}/> 

                    }
                    
                

                    />
                    
                    
                    <div className="admin-right float-end" >
                        <a href="#">
                        <Badge count={5} color="red">
                        <Avatar shape="circle"  className="align-content-center" size='default' icon={<IoNotifications  size={20} color="#9e9e9e"/>} style={{backgroundColor:'#f7faf9'}}/>
                        </Badge>
                        </a>
                        <Avatar shape="circle" className="align-content-center" size='large' icon={<FaUserAlt size={20} />} style={{marginLeft:40}}/>
                    </div>
                   
                </Header>

                <div className="admin-content">
                    <Outlet/>
                </div>
            </div>
        </div>
        
    )
}
export default Admin;