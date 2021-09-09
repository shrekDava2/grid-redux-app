import React ,{Component}     from 'react'
import Buttom                 from '../button'

import './grid-list-item.css'

export default class GridListItem extends Component {

  render(){
    const { id, title, ids, addClass, checked, toggleCheckbox, checkedAllInd, onMoveLeft, onMoveRight } = this.props  
    return (
      <li key={ id } 
          className={`list-group-item ${ addClass }`}>
        <input  
            type      ="checkbox" 
            ref       = { el => el && (el.indeterminate = checkedAllInd) }
            onChange  = { toggleCheckbox }
            value     = { id }
            checked   = { checked } 
        />
        <span >
          <span className="todo-list-item-label">
            { title }
          </span>   
          { onMoveRight === defFunc ? undefined : 
                <Buttom 
                    side    = { 'right' }
                    onMove  = { () => onMoveRight(ids) }
                />             
          }
          { onMoveLeft === defFunc ? undefined : 
                <Buttom 
                    side    = { 'left' }
                    onMove  = { () => onMoveLeft(ids) }  
                /> 
          }         
        </span>
      </li>
    )
  }
}
const defFunc = () => { return false }
GridListItem.defaultProps = {
  onMoveLeft: defFunc,
  onMoveRight: defFunc
}


