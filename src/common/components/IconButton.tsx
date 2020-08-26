import styled from 'styled-components';

const IconButton = styled.button.attrs({ className: 'text-4xl text-blue-600' })<
  any
>`
  &[disabled] {
    opacity: 0.5;
  }
`;

export default IconButton;
