import React from "react";

import styled from 'styled-components';

const Block = styled.ul`
  padding: 0;
  padding-top: 10px;
  display: block;
  list-style-type: none;
  margin: 5px 0;
  li {
    cursor: pointer;
    margin-right: 10px;
    padding: 1px;
    text-transform: uppercase;
    font-size: 22px;
    display: inline-block;
  }
  li[disabled] {
    text-decoration: line-through;
    opacity: 0.4;
    pointer-events: none;
  }
`;

const KeyBoard = ({handleClick}) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <Block >
      {letters.map((letter) => (
        <li key={letter} className="digit" disabled="" onClick={(e) => handleClick(e)}>
          {letter}
        </li>
      ))}
    </Block>
  );
};

export default KeyBoard;


