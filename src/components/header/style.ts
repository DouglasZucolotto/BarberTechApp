import styled from 'styled-components'
import { colors } from '../../constants'

export const Header = styled.header`
    width: 100%;
    height: auto;
    padding: 25px 50px;
    background-color: ${colors.black};
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        margin: 0 8px;
    }
`