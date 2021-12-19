import AppRouter from "./config/Router/Router.js";
import Context from "./context";

function App() {
  return (
    <Context.Provider value="value" >
      <AppRouter />
    </Context.Provider>
  )
}

export default App;