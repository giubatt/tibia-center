import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@font-face {
	font-family: 'martel';
	src: url('../static/fonts/martel.ttf');
}
`

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <GlobalStyle />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""
        />
        <link rel="stylesheet" href="static/css/leaflet.draw.css" />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
