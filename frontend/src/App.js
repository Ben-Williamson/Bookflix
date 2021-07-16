import './App.css';

function App() {
  fetch("http://192.168.0.21:3000/").then((data) => {
    console.log(data.body);
  })


  return (
    <div className="App">
      This is the app
    </div>
  );
}

export default App;
