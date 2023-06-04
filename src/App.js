import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CityImg from './components/CityImg'
import Title from './components/Title';

// localStorage.removeItem('guesses')
// localStorage.removeItem('currentRectangleIndex');

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
