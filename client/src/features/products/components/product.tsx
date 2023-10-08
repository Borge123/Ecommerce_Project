import Card from "react-bootstrap/Card";
const productImages = import.meta.glob("../assets/images/*");
function findImage(images, imageName) {
  const endIndex = imageName.indexOf("laptop1.jpg");
  const image = images.find((el) => el === imageName);
  return endIndex;
}
export default function Product({ product, onShow }) {
  const images = Object.keys(productImages);
  let result = findImage(images, "../assets/images/laptop1.jpg");
  console.log(result);

  console.log(images);
  const path = "src/features/products/assets/images/";
  return (
    <Card onClick={onShow}>
      <Card.Img
        variant="top"
        src={path + product.item.img_url + ".jpg"}
        alt={product.item.img_url}
      />
      <Card.Body>
        <Card.Title>{product.item.name}</Card.Title>

        <Card.Text>{product.item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
