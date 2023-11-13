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
import DanhMuc from './components/danhMuc/DanhMuc';
import DoCao from './components/doCao/DoCao';
import ChatLieu from './components/chatLieu/ChatLieu';
import KichThuoc from './components/kichThuoc/KichThuoc';
import MauSac from './components/mauSac/MauSac';
import Hang from './components/hang/Hang';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<App/>}>
          <Route path='hoa-don' element = {<HoaDon/>}>   </Route>
          <Route path='hoa-don-detail' element={<HoaDonDetail/>}></Route>
          <Route path='khuyen-mai' element = {<KhuyenMai/>}></Route>
          <Route path='voucher' element = {<Voucher/>}></Route>
          <Route path='danh-muc' element = {<DanhMuc/>}></Route>
          <Route path='do-cao' element = {<DoCao/>}></Route>
          <Route path='chat-lieu' element = {<ChatLieu/>}></Route>
          <Route path='kich-thuoc' element = {<KichThuoc/>}></Route>
          <Route path='mau-sac' element = {<MauSac/>}></Route>
          <Route path='hang' element = {<Hang/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>


  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();