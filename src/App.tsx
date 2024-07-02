import './index.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'react-tooltip/dist/react-tooltip.css'
import { AppRoutes } from './pages/routes';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <div>
      <ToastContainer
        autoClose={5000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  )
}

export default App
