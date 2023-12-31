import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaGithub,FaTshirt, FaTag} from 'react-icons/fa';
import { GoNumber } from 'react-icons/go';
import { AiOutlineColumnHeight } from 'react-icons/ai';
import {  GiMaterialsScience } from 'react-icons/gi';
import { IoColorPalette } from 'react-icons/io5';
import { BiSolidCategory, BiSolidUserBadge, BiSolidUserDetail } from 'react-icons/bi';
import { BsBoxSeamFill } from 'react-icons/bs';
import { RxDashboard } from 'react-icons/rx';
import { FaCartShopping, FaMoneyBills } from 'react-icons/fa6';
import { PiTrademarkFill } from 'react-icons/pi';
import { LuBadgePercent } from 'react-icons/lu';
import {Link} from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import {Image } from 'antd';
import { RiAccountCircleFill } from 'react-icons/ri';
import logoShop from '../../assets/images/logo.png';
import './sidebar.scss'

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
} from 'react-pro-sidebar';






const SideBar=(props)=>{
    const {collapsed,toggled,handleToggleSidebar}=props;
    return(
        <ProSidebar  className='nav-sidebar'

        //image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
        image='https://i.pinimg.com/564x/40/81/08/4081083e8895a9a620ada4b0fac3d436.jpg?fbclid=IwAR0HZwn_m42pqnvest56DrS32EKJXbpfIQvedmzUNReYtTiipdjSBjz6r-o'
        >
            <SidebarHeader>
                    <div
                        style={{
                            alignItems : 'center',
                            display : 'flex',   
                            flexDirection : 'column ',
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 18,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div className='logo_slibar'>
                            {!collapsed ? <Image width={100} src={logoShop} /> : <Image src={logoShop} rounded />}

                        </div>
                        <span> Mi Shoes</span>
                    </div>
                </SidebarHeader>
                <Menu iconShape="circle">
          
                        <MenuItem
                            icon={<RxDashboard color='#f7faf9' size={20} />}
                        >
                            Dashboard
                            {/* <Link to="/admins"></Link> */}
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaCartShopping color='#f7faf9' size={20} />}
                        >
                            Bán Hàng Tại Quầy
                            {/* <Link to="/admins/sales-at-the-counter"></Link> */}
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                    <SubMenu
                            icon={<BsBoxSeamFill color='#f7faf9' size={20}/>}
                            title="Quản Lý Sản Phẩm"
                        >
                            <MenuItem icon={<FaTshirt color='#f7faf9' size={20}/>}>
                                Sản Phẩm
                                
                            </MenuItem>
                            <MenuItem icon={<BiSolidCategory color='#f7faf9' size={20} />}>
                                Danh Mục
                                
                            </MenuItem>
                            <MenuItem icon={<AiOutlineColumnHeight color='#f7faf9' size={20} />}>
                                Độ cao
                                
                            </MenuItem>
                            <MenuItem icon={<GiMaterialsScience color='#f7faf9' size={20}/>}>
                                Chất Liệu
                                
                            </MenuItem>
                            <MenuItem icon={<GoNumber color='#f7faf9' size={20} />}>
                                Kích thước
                               
                            </MenuItem>
                            <MenuItem icon={<IoColorPalette color='#f7faf9' size={20}/>}>
                                Màu Sắc
                                
                            </MenuItem>
                            <MenuItem icon={<PiTrademarkFill color='#f7faf9' size={20} />}>
                                Hãng
                            </MenuItem>
                            
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                    <SubMenu
                            icon={<RiAccountCircleFill color='#f7faf9' size={20}/>}
                            title="Quản Lý Tài Khoản"
                        >
                            <MenuItem icon={<BiSolidUserBadge color='#f7faf9' size={20}/>}>
                                Nhân Viên
                                
                            </MenuItem>
                            <MenuItem icon={<BiSolidUserDetail color='#f7faf9' size={25} />}>
                                Khách Hàng
                                
                            </MenuItem>
                           
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaMoneyBills color='#f7faf9' size={20}/>}
                            suffix={<Badge pill bg="light" text="dark">New</Badge>}
                        >
                            Hóa Đơn
                            <Link to='/hoa-don'></Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<LuBadgePercent color='#f7faf9' size={25} />}
                        >
                            Khuyến Mại
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTag color='#f7faf9'size={20} />}
                        >
                            Voucher
                            <Link to='/voucher'></Link>
                        </MenuItem>
                    </Menu>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        {collapsed ? <a
                            href="#"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub color='#f7faf9'size={20}/>
                        </a> : <a
                            href="#"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub color='#f7faf9'size={20}/>
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',color:'white', textDecoration:'none' }}>
                                Mi Shoes
                            </span>
                        </a>}
                    </div>
                </SidebarFooter>
        </ProSidebar>
    )
}
export default SideBar;