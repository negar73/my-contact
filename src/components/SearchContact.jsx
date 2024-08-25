import {PURPLE, CURRENTLINE, FOREGROUND, BACKGROUND} from "../helpers/color"
const SearchContact = ({search , query}) => {
  return (
    <div className="input-group" dir="ltr">
      <span className="input-group-text" style={{background: PURPLE, color: BACKGROUND, border: "none"}}>
        <i className="fa fa-search"></i>
      </span>
      <input type="text"
      onChange={search}
      value={query.text}
      placeholder="جستجو..."
      dir="rtl"
      style={{background: CURRENTLINE, borderColor: PURPLE , color:"white"}} />
    </div>
  )
}

export default SearchContact