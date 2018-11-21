import styled from 'styled-components'

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  justify-self: center;
  padding: 2rem;
  /* background-color: blue; */
  grid-area: content;
`

export default Container
