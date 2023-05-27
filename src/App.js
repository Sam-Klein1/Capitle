import logo from './logo.svg';
import './App.css';
import GuessBoxes from './components/GuessBoxes';
import GuessButton from './components/GuessButton';
import CityImg from './components/CityImg'

function App() {
  return (
    <div className="App">
      <h1>CapitLe</h1>
      <CityImg />
      <GuessBoxes />
      {/* <GuessButton /> */}
    </div>
  );
}

export default App;
