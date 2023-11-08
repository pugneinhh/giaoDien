import './sidebar.scss';
import {FaTachometerAlt,FaGem,FaList,FaGithub,FaReLaughWink,FaHeart, FaProductHunt, FaTshirt, FaMoneyBill, FaTag, FaUsersCog, FaUserTie, FaUserFriends, FaChartLine} from 'react-icons/fa';
import { MdCategory, MdDashboard } from 'react-icons/md';
import { SiBrandfolder, SiZend } from 'react-icons/si';
import { GiExplosiveMaterials, GiHeavyCollar } from 'react-icons/gi';
import { IoIosColorPalette } from 'react-icons/io';
import { CgDetailsLess } from 'react-icons/cg';
import { HiShoppingCart } from 'react-icons/hi';
import 'react-pro-sidebar/dist/css/styles.css';
// import { Link } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
} from 'react-pro-sidebar';
const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                className='nav-sidebar'
                //image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
                image='https://i.pinimg.com/736x/8e/6c/06/8e6c064f57f94838263d7ba9ad80f353.jpg'
            >
                
                    <div
                        style={{
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
                        {/* <div className='logo_slibar'>
                           {!collapsed ? <Image className='img_logo_slibar' src={logo_bg1} /> : <Image className='img_logo_slibar' src={logo_bg2} rounded />}
                        </div> */}
                        {/* <span> Oniamey Shop</span> */}
                    </div>
                

                
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard color='#CC9966' />}
                        >
                            Dashboard
                            {/* <Link to="/admins"></Link> */}
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<HiShoppingCart color='#CC9966' />}
                        >
                            Bán Hàng Tại Quầy
                            {/* <Link to="/admins/sales-at-the-counter"></Link> */}
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaProductHunt color='#CC9966' />}
                            title='Quản lý sản phẩm'
                        > 
                            <MenuItem icon={<FaTshirt color='#CC9966' />}>
                                Sản Phẩm
                                {/* <Link to="/admins/manage-products"></Link> */}
                            </MenuItem>
                            <MenuItem icon={<MdCategory color='#CC9966' />}>

                                Danh Mục
                                {/* <Link to="/admins/manage-categories"></Link> */}
                            </MenuItem>
                            <MenuItem icon={<SiBrandfolder color='#CC9966' />}>

                                Thương Hiệu
                                {/* <Link to="/admins/manage-brands"></Link> */}
                            </MenuItem>
<MenuItem icon={<GiExplosiveMaterials color='#CC9966' />}>

                                Chất Liệu
                                {/* <Link to="/admins/manage-materials"></Link> */}
                            </MenuItem>
                            <MenuItem icon={<SiZend color='#CC9966' />}>
                                Kích Cỡ
                                {/* <Link to="/admins/manage-sizes"></Link> */}
                            </MenuItem>
                            <MenuItem icon={<IoIosColorPalette color='#CC9966' />}>
                                Màu Sắc
                                {/* <Link to="/admins/manage-colors"></Link> */}
                            </MenuItem>
                            <MenuItem icon={<GiHeavyCollar color='#CC9966' />}>
                                Cổ Áo
                                {/* <Link to="/admins/manage-collars"></Link> */}
                            </MenuItem>
                            <MenuItem icon={<CgDetailsLess color='#CC9966' />}>
                                Chiều Dài Tay Áo
                                {/* <Link to="/admins/manage-sleeve-lengths"></Link> */}
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaMoneyBill color='#CC9966' />}
                            suffix={<span className='badge red'>New</span>}
                        >
                            Quản Lý Hóa Đơn
                            {/* <Link to="/admins/manage-orders"></Link> */}
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTag color='#CC9966' />}
                        >
                            Khuyến Mãi
                            {/* <Link to="/admins/manage-vouchers"></Link> */}
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaUsersCog color='#CC9966' />}
                            title="Quản Lý Tài Khoản"
                        >
                            <MenuItem icon={<FaUserTie color='#CC9966' />}>
                                Nhân Viên
                                {/* <Link to="/admins/manage-employees"></Link> */}
                            </MenuItem>
                            <MenuItem icon={<FaUserFriends color='#CC9966' />}>

                                Khách Hàng
                                {/* <Link to="/admins/manage-customers"></Link> */}
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaChartLine color='#CC9966' />}>
                            Thống Kê
{/* <Link to="/admins/manage-statisticals"></Link> */}
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTag color='#CC9966' />}
                            
                        >
                            Quản Lý Khuyến Mãi
                            {/* <Link to="/admins/manage-promotion"></Link> */}
                        </MenuItem>
                    </Menu>
                
                

               
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                            textAlign: 'center'
                        }}
                    >
                        {collapsed ? <a
                            href="#"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                        </a> : <a
                            href="#"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Oniamey
                            </span>
                        </a>}
                    </div>
               
            </ProSidebar>
        </>
    );
}

export default SideBar;