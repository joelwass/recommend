import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../store/actions'

const Header = (props) => (
  <nav>
    <div class='right'>
      <input id='search' placeholder='search' />
      {!props.authenticated
        ? <Link href='/login'>
          <button id='login'>
            Login
          </button>
        </Link>
        : <button id='login' onClick={props.logout}>
          Logout
        </button>
      }
    </div>
    <div class='left'>
      <div class='left'>
        <Link href='/'>
          <h1 id='logo'>
            Home
          </h1>
        </Link>
      </div>
      <div class='right'>
        <ul>
          <li>
            <Link href='/explore'>
              <a>Explore</a>
            </Link>
          </li>
          <li>
            <Link href='/recommend'>
              <a>Recommend</a>
            </Link>
          </li>
        </ul>
      </div>
      <div class='clear' />
    </div>
    <div class='clear' />
  </nav>
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
