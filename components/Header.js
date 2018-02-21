import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../store/actions'

const linkStyle = {
  marginRight: 15
}

const Header = (props) => (
  <div>
    <Link href='/'>
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href='/recommend'>
      <a style={linkStyle}>Recommend</a>
    </Link>
    <Link href='/explore'>
      <a style={linkStyle}>Explore</a>
    </Link>
    {props.authenticated ?
      <a style={linkStyle} onClick={props.logout}>Logout</a> :
      <Link href='/login'>
        <a style={linkStyle}>Login</a>
      </Link>
    }
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
