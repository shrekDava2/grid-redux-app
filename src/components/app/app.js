import React, { Component } from 'react'
import Header               from '../header'
import TabPanel             from '../tab-panel'
import Spinner              from '../spinner'
import ErrorIndicator       from '../error-indicator'
import Grid                 from '../grid'
import { withGridService }  from '../hoc'
import { connect }          from 'react-redux'
import { compose }          from '../../utils'
import './app.css'
import {
          onMoveToLeft, 
          onMoveToRight,
          fetchGrids }      from '../../actions'
import {
          BrowserRouter as Router,  
          Route, 
          Redirect, 
          Switch }              from 'react-router-dom'


 class App extends Component {
  componentDidMount() {
    this.props.fetchGrids()   
  }

  render() {
      const { data, loading, error , onMoveToLeft, onMoveToRight } = this.props
      const keys = Object.keys(data)
      if( loading )     return <Spinner/>    
      if( error )       return <ErrorIndicator/>
      
      const grids =  keys.map(key => {
                      const idx = keys.findIndex((el) => el === key) 
                      const lastidx = keys.length -1
                      return ( <Grid  key={key} 
                                      gridData={ data[key] }  
                                      isInfo = { 'short' }
                                      name = { key }  
                                      onMoveRight = { idx !== lastidx ? (ids) => onMoveToRight (key, ids) : undefined }
                                      onMoveLeft = { idx !== 0 ? (ids) => onMoveToLeft (key, ids) : undefined}
                            />)})
      return (<Router>
                  <div className="stardb-app">
                    <Header />
                    <div className = "info">
                        { grids }
                    </div>  
                    <Switch>                     
                        <Route    
                            path={"/:key"} 
                            render = {( { match }) => {
                              const { key } = match.params
                              const idx = keys.findIndex((el) => el === key) 
                              const lastidx = keys.length -1
                              return ( <div>      
                                          <TabPanel data = { keys } 
                                                    name = { key }/>
                                          <Grid     gridData={ data[key] } 
                                                    name = { key } 
                                                    onMoveRight = { idx !== lastidx ? (ids) => onMoveToRight (key, ids) : undefined }
                                                    onMoveLeft = { idx !== 0 ? (ids) => onMoveToLeft (key, ids) : undefined}
                                                    />
                                        </div>)}}   
                          />
                          <Route path="/" exact render= {() => {return <Redirect to={`/${keys[0]}`} />}} />
                      </Switch>
                  </div>
                </Router>
        )    
    }
}

const mapStateToProps = ({data, loading, error}) => {
  return {data, loading, error}
}
const mapDispatchtoProps = (dispatch, { gridService }) => {
   return{
    fetchGrids: fetchGrids(gridService, dispatch),
    onMoveToLeft: (from,ids) => dispatch(onMoveToLeft(from,ids)),
    onMoveToRight: (from,ids) => dispatch(onMoveToRight(from,ids))   
  }   
}


export default  compose(
  withGridService(),
  connect(mapStateToProps, mapDispatchtoProps)
) (App)
