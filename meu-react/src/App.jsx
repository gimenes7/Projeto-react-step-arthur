import ButtonCSS from "./components/aula6/ButtonCSS.jsx";
import ButtonInline from "./components/aula6/ButtonInline.jsx";
import ButtonStyled from "./components/aula6/ButtonStyled.jsx";

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
