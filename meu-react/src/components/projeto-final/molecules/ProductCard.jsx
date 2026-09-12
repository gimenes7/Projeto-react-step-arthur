import Button from "../atoms/Button";
import "./ProductCard.css";

const PLACEHOLDER_IMG = "https://placehold.co/80x80?text=Sem+Imagem";

const ProductCard = ({ product, onEdit, onDelete, isDeleting }) => {
  return (
    <li className="product-item">
      <div className="product-info">
        <img
          className="product-image"
          src={
            product.imagem && product.imagem !== "semImagem"
              ? product.imagem
              : PLACEHOLDER_IMG
          }
          alt={product.nome}
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = PLACEHOLDER_IMG;
          }}
        />
        <span>{product.nome}</span>
      </div>
      <div className="product-actions">
        <Button type="button" onClick={onEdit}>
          Editar
        </Button>
        <Button
          type="button"
          className="btn-danger"
          onClick={onDelete}
          disabled={isDeleting}>
          {isDeleting ? "Deletando..." : "Deletar"}
        </Button>
      </div>
    </li>
  );
};

export default ProductCard;
