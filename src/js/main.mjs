import { lineMP } from "/lineMP.mjs";
import { Initialize as Init } from "./modules/init.mjs";

function TestLineAlgorithm() {
  let P = { x: 0, y: 0 };
  let Q = { x: 3, y: 1 };
  let R = lineMP(P, Q);
  console.log(R);
}

// CreateHeader();
Init();

//TODO: REMOVE JSHINT IGNORES
//TODO: Fix algorithm to all quadrants
