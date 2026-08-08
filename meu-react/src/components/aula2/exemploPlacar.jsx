import { useState, useEffect, useRef } from "react";

const ExemploPlacarJogo = () => {
  const [placarCasa, mudarPlacarCasa] = useState(0);
  const [placarVisitante, mudarPlacarVisitante] = useState(0);
  const [intervalo, mudarIntervalo] = useState(false); // true = jogo pausado
  const [segundosTotais, mudarSegundosTotais] = useState(0);
  const [jogoAcabou, mudarJogoAcabou] = useState(false);
  const acabouRef = useRef(false);

  const LIMITE_MINUTOS = 90;
  const LIMITE_SEGUNDOS = LIMITE_MINUTOS * 60;

  // Cronômetro: só roda quando NÃO está pausado e o jogo NÃO acabou
  useEffect(() => {
    if (intervalo || acabouRef.current) return; // pausado ou já acabou: não cria timer

    const timer = setInterval(() => {
      mudarSegundosTotais((prev) => {
        const novo = prev + 1;
        if (novo >= LIMITE_SEGUNDOS) {
          acabouRef.current = true;
          clearInterval(timer);
          mudarJogoAcabou(true);
        }
        return novo;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [intervalo]);

  // Alert quando o jogo termina
  useEffect(() => {
    if (jogoAcabou) {
      alert("Jogo finalizado");
    }
  }, [jogoAcabou]);

  const minutos = Math.floor(segundosTotais / 60);
  const segundos = segundosTotais % 60;

  const adicionarPontoCasa = () => mudarPlacarCasa(placarCasa + 1);
  const adicionarPontoVisitante = () =>
    mudarPlacarVisitante(placarVisitante + 1);
  const pausarJogo = () => mudarIntervalo(!intervalo);

  return (
    <div>
      <h1>
        Cronômetro do Jogo: {minutos}min {segundos}s
      </h1>

      <h1>
        Placar: {placarCasa} x {placarVisitante}
      </h1>

      {jogoAcabou ? (
        <h2>O jogo acabou!</h2>
      ) : (
        <>
          <button onClick={adicionarPontoCasa}>Ponto Time da Casa</button>
          <br />
          <br />
          <button onClick={adicionarPontoVisitante}>
            Ponto Time Visitante
          </button>
          <br />
          <br />
          <button onClick={pausarJogo}>
            {intervalo ? "Jogar" : "Pausar jogo"}
          </button>
        </>
      )}
    </div>
  );
};

export default ExemploPlacarJogo;
