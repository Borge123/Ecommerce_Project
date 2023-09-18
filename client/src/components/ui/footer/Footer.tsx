import "./Footer.css";
export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="footer-basic">
      <footer>
        <ul className={"list-inline"}>
          <li className="list-inline-item">
            <a href="#">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="#">About</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
        <p className="copyright">Company Name © {date}</p>
      </footer>
    </div>
  );
}
