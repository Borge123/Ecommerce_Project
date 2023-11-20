import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { createImageSrc } from "../helpers/createImageSrc";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useCartDispatch } from "../../cart/context/cart";
//const productImages = import.meta.glob("../assets/images/*");
function findImage(images, imageName) {
  const endIndex = imageName.indexOf("laptop1.jpg");
  const image = images.find((el) => el === imageName);
  return image;
}
export default function Product({ product, onShow }) {
  //const images = Object.keys(productImages);
  // let result = findImage(images, "laptop1.jpg");
  // console.log(result);

  // console.log(images);
  const { setItem, getItem } = useLocalStorage();
  const dispatch = useCartDispatch();
  // //TODO set up context to update cart state
  // const cart = getItem("cart");

  return (
    <Card>
      <Link to={`/products/${product._id}`}>
        <Card.Img
          onClick={onShow}
          variant="top"
          src={createImageSrc(product.item.img_url)}
          alt={product.item.img_url}
        />
      </Link>
      <Card.Body>
        <Card.Title>{product.item.name}</Card.Title>

        <Card.Text>{product.item.description}</Card.Text>
        <Button
          onClick={() => {
            dispatch({
              type: "add",
              item: {
                quantity: 0,
                _id: product._id,
                name: product.item.name,
                src: product.item.img_url,
                description: product.item.description,
              },
            });
          }}
          variant="primary"
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}
