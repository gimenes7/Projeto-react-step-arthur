import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "../atoms/Button";
import "./ProductFilter.css";

const ProductFilter = ({ options, onFilter }) => {
  const [selected, setSelected] = useState(null);

  const handleFilter = () => {
    onFilter(selected ?? "");
  };

  const handleClear = () => {
    setSelected(null);
    onFilter("");
  };

  return (
    <div className="product-filter">
      <Autocomplete
        className="product-filter-input"
        options={options}
        value={selected}
        onChange={(_, newValue) => setSelected(newValue)}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField {...params} label="Buscar produto por nome" size="small" />
        )}
      />
      <Button type="button" className="btn-primary" onClick={handleFilter}>
        Filtrar
      </Button>
      {selected && (
        <Button type="button" onClick={handleClear}>
          Limpar
        </Button>
      )}
    </div>
  );
};

export default ProductFilter;
