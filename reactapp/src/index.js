import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import HoaDon from './components/hoaDon/HoaDon2';
import HoaDonDetail from './components/hoaDon/HoaDonDetail';
import Voucher from './components/voucher/Voucher';
import 'bootstrap/dist/css/bootstrap.min.css';
import KhuyenMai from './components/khuyenMai/KhuyenMai';
import ThemKhuyenMai from './components/khuyenMai/ThemKhuyenMai'
import DanhMuc from './components/sanPham/DanhMuc';
import DoCao from './components/sanPham/DoCao';
import ChatLieu from './components/sanPham/ChatLieu';
import KichThuoc from './components/sanPham/KichThuoc';
import MauSac from './components/sanPham/MauSac';
import Hang from './components/sanPham/Hang';
import SanPham from './components/sanPham/SanPham';
import ChiTietSanPham from './components/sanPham/CTSP';
import ThongKe from './components/thongKe/ThongKe';
import AddSanPham from './components/sanPham/AddSanPham';


import BanHang from './components/banHang/BanHang';
import AddVoucher from './components/voucher/AddVoucher';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<App/>}>
        <Route path='thong-ke' element={<ThongKe/>}></Route>
          <Route path='hoa-don' element = {<HoaDon/>}>   </Route>
        <Route path='detail-hoa-don/:id' element={<HoaDonDetail/>}></Route>
          <Route path='khuyen-mai' element = {<KhuyenMai/>}></Route>
          <Route path='frm-khuyen-mai' element = {<ThemKhuyenMai />}></Route>
          <Route path='voucher' element = {<Voucher/>}></Route>
          <Route path='themVoucher' element = {<AddVoucher/>}></Route>
          <Route path='danh-muc' element = {<DanhMuc/>}></Route>
          <Route path='do-cao' element = {<DoCao/>}></Route>
          <Route path='chat-lieu' element = {<ChatLieu/>}></Route>
          <Route path='kich-thuoc' element = {<KichThuoc/>}></Route>
          <Route path='mau-sac' element = {<MauSac/>}></Route>
          <Route path='hang' element = {<Hang/>}></Route>
          <Route path='san-pham' element = {<SanPham/>}></Route>
          <Route path='showct/:uuid' element = {<ChiTietSanPham/>}></Route>

          <Route path='them-san-pham' element = {<AddSanPham/>}></Route>

          <Route path='/admin/ban-hang' element={<BanHang/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>

  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();