import logo from './logo.svg';
import './App.css';
import Header from './outline/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UsersContextProvider } from './context/UsersContext';



function App() {

  return (

    <div className="App">
      <UsersContextProvider>
        <Header />
      </UsersContextProvider>
    </div>
  );
}

export default App;
