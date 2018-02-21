import Header from './Header'
import ValidationContainer from './ValidationContainer'
import '../styles/main.scss'

const Layout = (props) => (
  <div className='main'>
    <Header />
    <ValidationContainer />
    {props.children}
  </div>
)

export default Layout
