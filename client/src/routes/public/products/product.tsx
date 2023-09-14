import ProductModal from "../../../features/products/components/productModal";
import { useOutletContext } from "react-router-dom";
import { getProduct } from "../../../features/products/services/getProduct";

export async function loader({ params }) {
  const product = await getProduct(params.productId);
  return { product };
}
function Product() {
  const [modalShow, setModalShow] = useOutletContext();

  return <ProductModal show={modalShow} onHide={() => setModalShow(false)} />;
}
export const product = {
  path: "/products/:productId",
  element: <Product />,
  loader: loader,
};
