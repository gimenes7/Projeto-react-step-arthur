const Exemplo = () => {
  const lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <ul>
        {lista
          .filter((item) => item % 2 === 0)
          .map((item) => (
            <li key={item}>{item}</li>
          ))}
      </ul>
    </div>
  );
};

export default Exemplo;
