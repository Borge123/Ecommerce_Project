import { useEffect, useState } from "react";

export default function Jumbotron({ text, delay }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className="jumbotron">
      <header>
        <div className="p-4">
          <h1 className="display-4">{currentText}</h1>
          <p className="lead">Browse our wide sortiment</p>
          <hr className="my-4" />
          <p className="pt-5">
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </div>
      </header>
    </div>
  );
}
