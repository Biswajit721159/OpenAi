import './App.css';
import SideBar from './component/SideBar'
import Main from './component/Main';
function App() {
  return (
    <div className="App">
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="main">
        <Main />
      </div>
    </div>
  );
}

export default App;
