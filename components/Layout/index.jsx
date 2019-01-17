import styled, { ThemeProvider } from 'styled-components'
import React, { Component } from 'react'

import Container from './Content'
import Header from './Header'

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 1400px) 1fr;
  grid-template-rows: 80px auto;
  grid-template-areas:
    'header header header'
    '. content .';
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
        <GridLayout>
          <Header />
          <Container>{this.props.children}</Container>
        </GridLayout>
      </ThemeProvider>
    )
  }
}

export default Page
