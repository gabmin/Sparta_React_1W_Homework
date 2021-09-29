import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router";
import Add from "./add";
import MyDictionary from "./mydictionary";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#FDBC38",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Route path="/" component={MyDictionary} exact />
      <Route path="/add" component={Add} exact />
    </div>
  );
}

export default App;
