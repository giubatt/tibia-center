import styled from 'styled-components'
import Link from 'next/link'

import HeaderTitle from '../styled/HeaderTitle'

const HeaderArea = styled.div`
  grid-area: header;
  align-self: center;
`

const NavbarMenu = styled.div`
  margin: 30px;
`

const Header = () => (
  <HeaderArea>
    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <HeaderTitle>Tibia Center</HeaderTitle>
            </a>
          </Link>
        </div>

        <NavbarMenu className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Loot Sharer</a>

              <div className="navbar-dropdown is-boxed">
                <Link href="/sharer/simple">
                  <a className="navbar-item">Simple</a>
                </Link>
                <Link href="/sharer/advanced">
                  <a className="navbar-item">Advanced</a>
                </Link>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Tools</a>

              <div className="navbar-dropdown is-boxed">
                <Link href="/tools/boss">
                  <a className="navbar-item">Boss Timers</a>
                </Link>
              </div>
            </div>
          </div>
        </NavbarMenu>
      </div>
    </nav>
  </HeaderArea>
)

export default Header
