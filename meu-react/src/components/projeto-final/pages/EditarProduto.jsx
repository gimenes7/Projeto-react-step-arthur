import { useParams } from "react-router-dom";
import ProductForm from "../organisms/ProductForm";
import PageLayout from "../templates/PageLayout";

const EditarProduto = () => {
  const { id } = useParams();

  return (
    <PageLayout>
      <ProductForm mode="edit" productId={id} />
    </PageLayout>
  );
};

export default EditarProduto;
