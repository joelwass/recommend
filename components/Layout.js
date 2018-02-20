import Header from './Header'
import ValidationContainer from './ValidationContainer'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    <ValidationContainer/>
    {props.children}
  </div>
)

export default Layout
