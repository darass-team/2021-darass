import styled from "styled-components";

const Container = styled.div<{ align: "left" | "right" }>`
  display: flex;
  flex-direction: ${props => (props.align === "left" ? "row" : "row-reverse")};
`;

const CommentTextBoxWrapper = styled.div<{ align: "left" | "right" }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.align === "left" ? "flex-start" : "flex-end")};
  margin: ${props => (props.align === "left" ? "0 0 0 0.6rem" : "0 0.6rem 0 0")};
`;

const Time = styled.span`
  margin: 0 1rem;
  margin-top: 0.3rem;
`;

const CommentOptionWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 8px;
`;

export { Container, CommentTextBoxWrapper, Time, CommentOptionWrapper };
