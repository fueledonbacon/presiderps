import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectAndMint from './ConnectAndMint';
import pkg from "../package.json";

const App = () => {
  console.log(`App version: ${pkg.version}`);

  return (
    <div className="grid justify-center p-4">
      
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
