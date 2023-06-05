import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CityImg from './components/CityImg'
import Title from './components/Title';

const date = localStorage.getItem('time-guess');
const yr = new Date().getUTCFullYear();
const mm = new Date().getUTCMonth();
const dd = new Date().getUTCDay();
const curr = `${mm}-${dd}-${yr}`;
if (!(date === curr)) {
  localStorage.clear();
}

function App() {
  return (
    <div className="App">
      <Title />
      <CityImg />
      <ToastContainer />
    </div>
  );
}

export default App;
