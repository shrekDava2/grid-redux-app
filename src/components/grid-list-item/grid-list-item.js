import React ,{Component} from 'react'

import './grid-list-item.css'

export default class GridListItem extends Component {

  render(){
    const { id, title, leftButton,rightButton, checked, toggleCheckbox } = this.props  
    return (
      <li key={ id } 
          className="list-group-item">
        <input  type="checkbox" 
                onChange = { toggleCheckbox }
                value={ id }
                checked = { checked } />
        <span >
          <span className="todo-list-item-label">
            { title }
          </span>    
          { rightButton }
          { leftButton }

        </span>
      </li>
    )
  }
}


