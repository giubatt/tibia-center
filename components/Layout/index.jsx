import styled, { ThemeProvider } from 'styled-components'
import React, { Component } from 'react'

import Container from './Content'
import Header from './Header'
import Menu from './Menu'

export const Layout = styled.div`
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

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  ligthGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Header />
          <Menu />
          <Container>{this.props.children}</Container>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default Page
