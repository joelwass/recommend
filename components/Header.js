import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href='/'>
      <a style={linkStyle}>Make A Recommendation</a>
    </Link>
    <Link href='/recommendations'>
      <a style={linkStyle}>Historical Recommendations</a>
    </Link>
    <Link href='/recommenders'>
      <a style={linkStyle}>Recommenders</a>
    </Link>
  </div>
)

export default Header
