import '../styles/main.scss'

const parseOptions = options => options.map(option => ({ name: option, value: option }))

const Dropdown = (props) => (
  <div>
    <select name={props.name} id={props.id} onChange={(e) => props.onChangeHandler(e, props.name)}>
      { props.options && parseOptions(props.options).map(option => (
        <option value={option.value} key={option.value}>{option.name}</option>
        )
      )}
    </select>
  </div>
)

export default Dropdown
