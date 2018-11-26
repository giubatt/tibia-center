import styled from 'styled-components'

const StyledButton = styled.button``

const Button = ({ className, ...props }) => <StyledButton className={`button ${className}`} {...props} />

export default Button
