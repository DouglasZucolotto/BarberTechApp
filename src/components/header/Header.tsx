import { Button } from '..'
import { ReactComponent as Logo } from '../../img/logo.svg'
import { scrollToSection } from '../../utils'
import * as S from './style'

export const Header = () => {
  return (
    <S.Header>
      <Logo />
      <nav>
        <Button type="transparent" onClick={() => scrollToSection('home')}>
          Home
        </Button>
        <Button type="transparent" onClick={() => scrollToSection('services')}>
          Serviços
        </Button>
        <Button type="transparent" onClick={() => scrollToSection('about')}>
          Sobre
        </Button>
        <Button type="transparent" onClick={() => scrollToSection('footer')}>
          Contatos
        </Button>
        <Button type="transparent" onClick={() => console.log('navega depoimentos')}>
          Depoimentos
        </Button>
      </nav>
      <Button onClick={() => console.log("login")}>Login</Button>
    </S.Header>
  )
}
