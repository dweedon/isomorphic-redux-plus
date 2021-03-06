import styled from 'styled-components';
import { getters as g } from './theme';

export default styled.div`
  margin: 0 auto;
  max-width: ${g.maxWidth}px;

  @media (max-width: ${g.maxWidth}px) {
    margin: 0 1em;
  }
`;

