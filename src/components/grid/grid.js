//import { render } from '@testing-library/react';
import React, { Component }   from 'react';
import GridListItem           from '../grid-list-item';
import Buttom                 from '../button';
import './grid.css';

class Grid extends Component {
  state = {
    checkedIds : []
  }
  componentDidUpdate(prevProps){
    if(this.props.gridData !== prevProps.gridData  )
    {
      this.updateItem()
    }
  }

  updateItem (){
      const { gridData } = this.props
      if(!gridData){
        return
      }       
      const newArray = this.state.checkedIds.filter(
        (val) => gridData.map((item) => item.id).indexOf(val) > -1
      )
      this.setState({checkedIds : newArray})    
  }

  toggleAllCheckbox = (el) =>{
      const { checked } = el.target
      const { gridData} = this.props
      if(checked){
        this.setState({
            checkedIds: gridData.map(d => d.id)
        })
      }else {
        this.setState({
          checkedIds: []
        });
      }
  }
  toggleCheckbox = (el) =>{
    const { checked , value} = el.target
    if(checked){
      this.setState(({checkedIds}) => {
       return{ checkedIds : [...checkedIds, value*1] }
    })
    }else {
      this.setState(({checkedIds}) => {
        const idx = checkedIds.findIndex((el) => el === value*1)
        const newArray = [
          ...checkedIds.slice(0,idx),
          ...checkedIds.slice(idx + 1)
        ]  
        return {
          checkedIds: newArray
        }
      })
    }
  }
  render(){

    const {  checkedIds } = this.state
    const { gridData, onMoveLeft, onMoveRight, ...props} = this.props
    const { name, isInfo } = props
    const leftButton =  onMoveLeft === undefined ? undefined : 
                <Buttom side = { 'left' }
                        onMove = { ()=> onMoveLeft( checkedIds ) }  />
    const rightButton = onMoveRight === undefined ? undefined : 
                <Buttom side = { 'right' }
                        onMove = { ()=> onMoveRight( checkedIds ) }/>


    const checkedAll =  checkedIds.length === gridData.length && gridData.length > 0 
    const checkedAllInd =  !checkedAll && checkedIds.length > 0 
    

    const elements =  gridData.map(( item ) => {
                          const { id,  ...itemProps } = item;      
                          const checked =  checkedIds.findIndex(x => x === id ) > -1
                          const leftButton =  onMoveLeft === undefined ? undefined : 
                                    <Buttom side = { 'left' }
                                            onMove = { ()=> onMoveLeft( [id] ) }    />   
                          const rightButton = onMoveRight === undefined ? undefined : 
                                    <Buttom side = { 'right' }
                                            onMove = { ()=> onMoveRight( [id] ) } />
                          return (
                              <GridListItem key = { id } position={ name } id ={id} 
                                            toggleCheckbox = { this.toggleCheckbox }
                                            checked={ checked }
                                            { ...itemProps }  
                                            leftButton = { leftButton }
                                            rightButton = { rightButton }
                              />
                          )
                        })

    return (<div className={ isInfo }>
              <p className="page-name">{ name }</p>
                <ul className='list-group todo-list' >
                  <li  className="list-group-item headergrid" >
                    <input  type="checkbox"  
                            ref={el => el && (el.indeterminate = checkedAllInd)}
                            checked = { checkedAll }
                            onChange={ this.toggleAllCheckbox }/>
                    {rightButton}
                    {leftButton}
                  </li>
                  { elements }
                </ul>
            </div>
    )
  }
}

export default Grid;

