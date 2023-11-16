import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { createImageSrc } from "../helpers/createImageSrc";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
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
  //TODO set up context to update cart state
  const cart = getItem("cart");

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
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
