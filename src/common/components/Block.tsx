import styled, { css } from 'styled-components';
interface BlockProps {
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  inactive?: boolean;
}

const Block = styled.button<BlockProps>`
  position: absolute;
  border: 5px solid white;
  border-radius: 18px;
  -webkit-tap-highlight-color: #ccc;

  ${props => props.inactive && `opacity: 0.35;`}

  ${props =>
    ['bottom', 'top'].includes(props.position) &&
    css`
      height: 25%;
      width: 50%;
      left: 50%;
      transform: translateX(-50%)
        ${props.position === 'top' && `rotate(180deg)`};

      ${props.position === 'bottom' ? `bottom: 0;` : `top: 0;`}

      /* width < height */
      @media (max-aspect-ratio: 1/1) {
        width: 100%;
        height: 25%;
      }
    `}

  ${props =>
    ['left', 'right'].includes(props.position) &&
    css`
      width: 100vh;
      height: 25vw;
      top: 50%;
      ${props.position === 'left' ? `left: 12.5%;` : `right: 12.5%;`}
      transform: ${props.position === 'left' &&
        `translate(-50%, -50%) rotate(90deg)`}
        ${props.position === 'right' && `translate(50%, -50%) rotate(-90deg)`};

      /* width < height */
      @media (max-aspect-ratio: 1/1) {
        height: 25%;
        width: 50vh;
        ${props.position === 'left' ? `left: 0;` : `right: 0;`}

        transform: ${props.position === 'left' &&
          `translate(-12.5vh, -50%) rotate(90deg)`}
          ${props.position === 'right' &&
            `translate(12.5vh, -50%) rotate(-90deg)`};
      }
    `}

  ${props =>
    props.position === 'center' &&
    css`
      width: 50%;
      height: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `}
`;

export default Block;
