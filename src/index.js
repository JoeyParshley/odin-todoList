import "./styles/style.css";
import { greeting } from "./greeting.js";
import joeyImage from "./images/joey.jpg";

const image = document.createElement("img");
image.src = joeyImage;

document.body.appendChild(image);

console.log(greeting);
