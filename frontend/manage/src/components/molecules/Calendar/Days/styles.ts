import styled from "styled-components";

export const Container = styled.div`
  font-size: 0;
`;

export const DayOfWeeks = styled.span`
  width: 14.28571%;
  display: inline-block;
  text-align: center;
  user-select: none;
  cursor: pointer;
  margin: 8px 0;
  line-height: 34px;
  position: relative;
  font-size: 16px;

  text-transform: uppercase;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.3);
  font-size: 14px;
  cursor: initial;
`;

/* 

    

    
  

  &--days {
    

    span {
   

      &.label {
        
      }

      &.active {
        font-weight: 700;
        background-color: transparentize($primary, 0.95);
        border-radius: $radius;
      }

      &.muted {
        color: rgba(0, 0, 0, 0.3);
      }

      &.between {
        border-radius: 0;
      }

      &.start,
      &.between,
      &.end {
        background-color: #b670f4;
        color: #fff;
      }

      &.start {
        border-radius: $radius 0 0 $radius;
      }

      &.end {
        border-radius: 0 $radius $radius 0;
      }

      &.start.end {
        border-radius: $radius;
      }

      &.between:nth-child(7n):after,
      &.start:nth-child(7n):after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 100%;
        background-color: #b670f4;
        width: 20px;
      }

      &.between:nth-child(7n + 1):after,
      &.end:nth-child(7n + 1):after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 100%;
        background-color: #b670f4;
        width: 20px;
      }

      &.start.end:after {
        display: none;
      }
    }
*/
