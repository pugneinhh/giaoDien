
import './App.scss';
import Admin from '../components/admin/Admin';


const App=() => {
  return (
    <div className='d-flex'>
      <div className='col'>
        <Admin />
      </div>
      <div>
          {/* <Outlet></Outlet> */}
      </div>
    
    </div>
        
  );
}

export default App;
