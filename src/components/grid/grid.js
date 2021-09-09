
import React, { Component }   from 'react'
import GridListItem           from '../grid-list-item'
import './grid.css'

class Grid extends Component {
  state = {
    checkedIds : []
  }
  componentDidUpdate (prevProps) {
      if(this.props.gridData !== prevProps.gridData) this.updateItem()
  }

  updateItem () {
      const { gridData } = this.props
      if(!gridData) {
        return
      }       
      const newArray = this.state.checkedIds.filter(val => gridData.map(item => item.id).includes(val))
      this.setState({ checkedIds: newArray })    
  }

  toggleAllCheckbox = el => {
      const { checked } = el.target
      const { gridData } = this.props
      this.setState({
          checkedIds: checked ? gridData.map(d => d.id) : []
      })
  }
  toggleCheckbox = el => {    
      this.setState(({ checkedIds }) => {
        const { checked, value } = el.target
        if(checked) return { checkedIds : [...checkedIds, value*1] }
        else {
          const idx = checkedIds.findIndex(el => el === value*1)
          const newArray = [
            ...checkedIds.slice(0,idx),
            ...checkedIds.slice(idx + 1)
          ]  
          return { checkedIds: newArray }
        }
    })
  }
  
  render () {

    const { checkedIds } = this.state
    const { gridData, onMoveLeft, onMoveRight, ...props } = this.props
    const { name, isInfo } = props
    const checkedAll      =  checkedIds.length === gridData.length && gridData.length > 0 
    const checkedAllInd   =  !checkedAll && checkedIds.length > 0     

    const elements =  gridData.map( item  => {
                          const { id,  ...itemProps } = item    
                          const checked =  checkedIds.includes( id )
                          return (
                              <GridListItem 
                                      { ...itemProps }  
                                      key             = { id } 
                                      position        = { name } 
                                      id              = { id } 
                                      toggleCheckbox  = { this.toggleCheckbox }
                                      checked         = { checked }
                                      ids             = { [ id ] }
                                      onMoveRight     = { onMoveRight }  
                                      onMoveLeft      = { onMoveLeft } 
                              />
                          )
                        })

    return (<div className = { isInfo }>
              <p className = "page-name">{ name }</p>
                <ul className = 'list-group todo-list' >
                  <GridListItem 
                          position        = { name } 
                          addClass        = { 'headergrid' }                                            
                          toggleCheckbox  = { this.toggleAllCheckbox }
                          checkedAllInd   = { checkedAllInd }
                          checked         = { checkedAll }
                          ids             = { checkedIds }
                          onMoveRight     = { onMoveRight } 
                          onMoveLeft      = { onMoveLeft } 
                    />                 
                  { elements }
                </ul>
            </div>
    )
  }
}
export default Grid;

