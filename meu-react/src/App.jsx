import React from "react";
import Welcome from "./components/aula1/welcome";
import PlacarDoJogo from "./components/aula2/PlacarDoJogo";

function App() {
  return (
    <div>
      <Welcome name="Arthur" />
      <Contador />
      <PlacarDoJogo />
    </div>
  );
}

export default App;
