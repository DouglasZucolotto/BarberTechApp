import styled from 'styled-components'
import { Container } from '../../../components'

export const AboutContainer = styled(Container)`
  display: flex;
  align-items: center;
  height: calc(100vh - 98px);
  background-color: var(--blue);
  position: relative;
`

export const ContentBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    color: var(--white);
    font-size: 40px;
    font-weight: 700;
  }

  p {
    color: var(--white);
  }
`

export const BadgeBox = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 30px;

  button {
    background-color: var(--transparent);
    border: none;
    cursor: pointer;
  }

  button > img {
    width: 220px;
  }
`
