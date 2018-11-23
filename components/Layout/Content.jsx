import styled from 'styled-components'

const ContentArea = styled.div`
  max-width: ${props => props.theme.maxWidth};
  justify-self: center;
  padding: 2rem;
  grid-area: content;
`

export default ContentArea
