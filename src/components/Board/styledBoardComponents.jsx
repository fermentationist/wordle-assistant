import styled from "styled-components";
import { COLORS } from "../Square";


export const Container = styled.main`
  /* margin hack to adjust for repositioning caused by swipe to delete button reveal */
  margin-left: ${props => props.shiftLeft ? "-0.725rem" : "0"};
  max-width: 100vw;
  min-width: calc(100vw - 2rem);
  max-height: 95vh;
  min-height: max(85vh, 600px);
  display: flex;
  flex-direction: column;
  gap: 1em;
  place-items: center;
  @media screen and (min-width: 1280px) and (hover: hover) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    place-items: center;
  }
`;

export const InputRows = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  place-items: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  place-items: center;
  overscroll-behavior: contain;
  @media screen and (min-width: 1280px) and (hover: hover) {
    max-width: 25vw;
  }
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  touch-action: none;
`;

export const WordsSection = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
`;

export const Title = styled.title`
  display: block;
`;

export const WordsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: clamp(21em, 85vw, 600px);
  /* container height shrinks as rows are added to InputRows */
  max-height: ${(props) => `calc(50vh - calc(${props.numGuessRows} * 4em))`};
  min-height: 7em;
  flex-wrap: wrap;
  border: 1px solid gray;
  border-radius: 5px;
  overflow-y: scroll;
  @media screen and (min-width: 1280px) and (hover: hover) {
    width: clamp(600px, 60vw, 66vw);
    max-height: 75vh;
  }
`;

export const WordButton = styled.button`
  height: 2em;
  margin: 0.25em;
  text-align: center;
  line-height: 0.5em;
  padding: 0.25em;
`;

export const EnterButton = styled.button`
  height: 2em;
  margin: 0.5em 0.5em 0 0.5em;
  text-align: center;
  line-height: 0.5em;
  padding: 0 0.5em;
  background-color: ${COLORS["green"]};
  color: ivory;
`;

export const ResetButton = styled.button`
  height: 2em;
  margin: 0.5em 0.5em 0 0.5em;
  text-align: center;
  line-height: 0.5em;
  padding: 0 0.5em;
`;

export const DeleteButton = styled.button`
  @keyframes slideIn{
    from {width: 0; color: transparent; font-size: 0.5em}
    to {width: 2rem; color: white; font-size: 1.5em}
  }
  margin: 0.175rem;
  font-size: 1.5em;
  font-weight: 800;
  display: inline-block;
  width: 2rem;
  height: 4rem;
  background-color: red !important;
  color: white !important;
  padding: 0;
  border-radius: 0;
  animation: slideIn ease-out 200ms;
`;

export const KeyboardContainer = styled.div`
  width: clamp(21em, 85vw, 600px);
  /* only show virtual keyboard on mobile */
  @media screen and (hover: hover) {
    display: none;
  }
`;