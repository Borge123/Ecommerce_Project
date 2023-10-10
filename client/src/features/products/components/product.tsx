import Card from "react-bootstrap/Card";
import { createImageSrc } from "../helpers/createImageSrc";
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

  return (
    <Card onClick={onShow}>
      <Card.Img
        variant="top"
        src={createImageSrc(product.item.img_url)}
        alt={product.item.img_url}
      />
      <Card.Body>
        <Card.Title>{product.item.name}</Card.Title>

        <Card.Text>{product.item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
