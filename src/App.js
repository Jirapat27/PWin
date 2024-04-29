import logo from './logo.svg';
import './CSS/App.css';
import Header from './Component/Header';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header/>
      <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
        
      </main>

    </div>
  );
}
