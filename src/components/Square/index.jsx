import { useState, useEffect } from "react";
import styled from "styled-components";

export const COLORS = {
  "gray": "#3A3A3C",
  "yellow": "#B59F3A",
  "green": "#538E4E"
}

const StyledSquare = styled.div`
  height: 3em;
  width: 3em;
  border-radius: 1px;
  margin: 0.125em;
  background-color: ${props => props.color};
  display: flex;
  place-content: center;
  place-items: center;
  cursor: pointer;
`;

const Span = styled.span`
  font-family: "Clear Sans","Helvetica Neue",Arial,sans-serif;
  font-weight: bold;
  font-size: 1.75em;
  color: ivory;
`;

const Square = ({char, callback, active, className, startColor = "gray", refreshNum}) => {
  const [color, setColor] = useState(COLORS[startColor]);

  useEffect(() => {
    setColor(COLORS[startColor]);
  }, [refreshNum]);

  const toggleColorChange = event => {
    if (!active) {
      return;
    }
    console.log("color:", color)
    switch (color) {
      case COLORS["gray"]:
        setColor(COLORS["yellow"]);
        return callback("yellow");
      case COLORS["yellow"]:
        setColor(COLORS["green"]);
        return callback("green");
      case COLORS["green"]:
        setColor(COLORS["gray"]);
        return callback("gray");
    }
  }
  return (
    <StyledSquare 
      onClick={toggleColorChange} 
      color={color}
      className={className}
    >
      <Span>
        {char}
      </Span>
    </StyledSquare>
  );
}

export default Square;