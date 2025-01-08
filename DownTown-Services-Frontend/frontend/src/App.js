import logo from './logo.svg';
import './App.css';
import Routes from './Routes/AppRoutes';
import { Fragment } from 'react';
import { Toaster, toast } from 'sonner';
function App() {
  return (
    <Fragment>
      <Toaster position="top-right"/>
      <Routes />
    </Fragment>
  );
}

export default App;
