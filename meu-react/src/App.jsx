import ButtonCSS from "./components/ButtonCSS.jsx";
import ButtonInline from "./components/ButtonInline.jsx";
import ButtonStyled from "./components/ButtonStyled.jsx";

function App() {
  return (
    <div>
      <h1>Botão com CSS Externo</h1>
      <ButtonCSS label="CSS Externo" />

      <h1>Botão com Inline Styles</h1>
      <ButtonInline label="Primário" primary />
      <ButtonInline label="Secundário" />

      <h1>Botão com Styled Components</h1>
      <ButtonStyled label="Primário" primary />
      <ButtonStyled label="Secundário" />
    </div>
  );
}

export default App;
