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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<App/>}>
          <Route path='hoa-don' element = {<HoaDon/>}>   </Route>
        <Route path='hoa-don-detail' element={<HoaDonDetail/>}></Route>
          <Route path='khuyen-mai' element = {<KhuyenMai/>}></Route>
          <Route path='frm-khuyen-mai' element = {<ThemKhuyenMai />}></Route>
          <Route path='voucher' element = {<Voucher/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>

  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();