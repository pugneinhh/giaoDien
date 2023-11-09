
import { Divider } from 'antd';
import './App.scss';
import Admin from '../components/admin/Admin';
import {  Outlet } from 'react-router-dom';

const App=() => {
  return (
    <div className='d-flex'>
      <div className='col-auto'>
        <Admin />
      </div>
      <Outlet></Outlet>
    </div>
        
  );
}

export default App;
