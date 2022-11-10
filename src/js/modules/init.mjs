import Singleton from "./singleton.mjs";

function Initialize() {
  const canvas = document.querySelector(".main-canvas");
  const mainApp = new Singleton(canvas);
}

export { Initialize };
