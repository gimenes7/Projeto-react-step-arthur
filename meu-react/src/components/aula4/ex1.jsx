import React, { useState, useEffect } from "react";
const Relogio = () => {
  const [horario, setHorario] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHorario(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "50px",
        fontFamily: "Arial",
        padding: "20px",
      }}>
      {horario.toLocaleTimeString()}
    </div>
  );
};

export default Relogio;
