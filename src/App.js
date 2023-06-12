import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CityImg from './components/CityImg'
import Title from './components/Title';
import Timer from './components/Timer';
import Faq from './components/faq';

const date = new Date().getDate();
console.log(date);
const ts = parseInt(localStorage.getItem('time-stamp'));
console.log(ts);
if(date !== ts){
  console.log("clearing storage...");
  localStorage.clear();
}

function App() {

  return (
    <div className={"App"}>
        <Title />
        <Timer />
        <CityImg />
        <Faq />
        <ToastContainer />
    </div>
  );
}

export default App;
