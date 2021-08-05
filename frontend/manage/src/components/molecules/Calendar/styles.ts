import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -225px;
  margin-left: -195px;
  width: 360px;
  padding: 15px;
  box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.4);
  border-radius: $radius;
  overflow: hidden;
`;

export const Header = styled.div`
  margin: -15px -15px 15px;
  padding: 0 15px;
  background-color: $primary;
  color: #fff;
  height: 70px;
  position: relative;
`;

export const MoveMonthButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  cursor: pointer;
  left: 10px;
  font-size: 32px;
  line-height: 1;
  top: 16px;
  width: 30px;
  text-align: center;
  display: inline-block;
  color: transparentize(#fff, 0.6);
  user-select: none;

  &:hover {
    color: #fff;
  }

  &:last-child {
    left: auto;
    right: 10px;
  }
`;

export const Month = styled.span`
  margin: 0;
  position: absolute;
  left: 40px;
  right: 40px;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 30px;
  line-height: 66px;
  user-select: none;
`;

export const Year = styled.span`
  font-weight: 300;
  font-size: 60%;
`;
