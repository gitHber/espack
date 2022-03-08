import React from "react";
// import styled from "styled-components";
import { hot } from "react-es-hot-loader";

// plugin-commonjs namedExports失效后，styled导入react有问题 
// const StyBtn = styled.button`
//   border: none;
//   background: #198eeb;
//   border-radius: 3px;
//   color: #fff;
//   padding: 11px 20px;
//   &:hover {
//     background: #4fb1ff;
//   }
//   &:active {
//     background: #197bc9;
//   }
// `;
function Count(props: any) {
  const [n, setN] = React.useState(0);
  return (
    <button {...props}>
      <span onClick={() => setN(n + 1)}>{n}s</span>
    </button>
  );
}
export default hot(import.meta, Count);
