
import styled from 'styled-components';

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const IconButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #cbd5e1;
  &:hover {
    background-color: #94a3b8;
  }
  padding: 10px; 
  border: none;
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center`;