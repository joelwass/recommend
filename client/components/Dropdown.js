const Dropdown = (props) => (
  <select name={props.name} id={props.id} onChange={(e) => props.onChangeHandler(e, props.name)}>
    { props.options && props.options.map(option => (
      <option value={option.name} key={option.value}>{option.name}</option>
      )
    )}
  </select>
)

export default Dropdown
