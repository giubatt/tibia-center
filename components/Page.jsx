import styled, { ThemeProvider } from 'styled-components'
import React, { Component } from 'react'

// import Header from './Header'
// import Meta from './Meta'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  ligthGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 100px 100%;
  grid-template-areas:
    'header header'
    'menu content';
  height: 100vh;
  background: white;
  color: ${props => props.theme.black};
`

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  justify-self: center;
  padding: 2rem;
  background-color: blue;
  grid-area: content;
`

const Header = styled.div`
  background-color: red;
  grid-area: header;
`

const Menu = styled.div`
  background-color: orange;
  grid-area: menu;
`

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          {/* <Meta /> */}
          <Header />
          <Menu />
          <Container>{this.props.children}</Container>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page
