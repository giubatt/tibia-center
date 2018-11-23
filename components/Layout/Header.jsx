import styled from 'styled-components'

export const HeaderArea = styled.div`
  grid-area: header;
  text-align: center;
`

const Header = () => (
  <HeaderArea>
    <h1>Tibia Center</h1>
  </HeaderArea>
)

export default Header
