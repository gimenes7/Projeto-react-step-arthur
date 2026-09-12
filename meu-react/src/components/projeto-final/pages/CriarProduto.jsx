import ProductForm from "../organisms/ProductForm";
import PageLayout from "../templates/PageLayout";

const CriarProduto = () => {
  return (
    <PageLayout>
      <ProductForm mode="create" />
    </PageLayout>
  );
};

export default CriarProduto;
