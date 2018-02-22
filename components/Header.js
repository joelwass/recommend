import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../store/actions'

const Header = (props) => (
  <div className='header-test'>
    <Link href='/'>
      <a>Home</a>
    </Link>
    <Link href='/recommend'>
      <a>Recommend</a>
    </Link>
    <Link href='/explore'>
      <a>Explore</a>
    </Link>
    {props.authenticated
      ? <a onClick={props.logout}>Logout</a>
      : <Link href='/login'>
        <a >Login</a>
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
