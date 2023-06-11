import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CityImg from './components/CityImg'
import Title from './components/Title';
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <Title />
      <Timer />
      <CityImg />
      <ToastContainer />
    </div>
  );
}

export default App;
