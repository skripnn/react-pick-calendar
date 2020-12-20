import React from "react";

function Days(props) {
  const style = {
    marginLeft: props.marginLeft,
    marginRight: -(24 + props.marginLeft)
  }
  return (
    <div className="calendar-days"
         style={style}
         children={props.children}/>
  )
}

export default Days