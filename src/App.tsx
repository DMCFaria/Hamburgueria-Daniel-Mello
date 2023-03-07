import { ToastContainer } from 'react-toastify';
import Router from './routes';
import { GlobalStyles } from './styles/global';
import { UserContextProvider } from './providers/UserContext';
import { CartContextProvider } from './providers/CartContext';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <UserContextProvider>
      <CartContextProvider>
        <GlobalStyles />
        <Router />
      </CartContextProvider>
    </UserContextProvider>
    <ToastContainer
      position='bottom-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  </>
);

export default App;
