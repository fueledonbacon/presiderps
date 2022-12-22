import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectAndMint from './ConnectAndMint';

const App = () => {


  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        padding: 12,
      }}
    >
      
      <div className="hidden sm:block">
        <ConnectAndMint />
      </div>
      <div className="sm:hidden text-center" >
        Connect and mint is not supported on mobile.
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
