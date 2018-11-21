import styled from 'styled-components'

const StyledButton = styled.button`
  /* max-width: ${props => props.theme.maxWidth}; */
  /* justify-self: center; */
  /* padding: 2rem; */
  /* background-color: blue; */
  /* grid-area: content; */
`

const Button = ({ className, ...props }) => <StyledButton className={`button ${className}`} {...props} />

export default Button
