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
         onMove,
         fetchGrids
        }                   from '../../actions'
import {
        BrowserRouter as Router,  
        Route, 
        Redirect, 
        Switch }            from 'react-router-dom'


 class App extends Component {
  componentDidMount() {
    this.props.fetchGrids()   
  }

  render() {
      const { data, loading, error, onMove } = this.props
      if(loading)     
        return <Spinner/>            
      if(error)       
        return <ErrorIndicator/>
      const keys  = Object.keys(data)
      const grids =  keys.map(key => {
                      const idx     = keys.findIndex(el => el === key) 
                      const prev    = keys[idx - 1] 
                      const next    = keys[idx + 1]
                      const lastidx = keys.length -1
                      return ( <Grid  
                                      key         = { key } 
                                      gridData    = { data[key] }  
                                      isInfo      = { 'short' }
                                      name        = { key }  
                                      onMoveRight = { idx !== lastidx ? ids => onMove ({ from: key, to: next, ids })  : undefined }
                                      onMoveLeft  = { idx !== 0       ? ids => onMove ({ from: key, to: prev, ids })  : undefined }
                                />)})
      return ( <Router>
                  <div className = "stardb-app">
                    <Header />
                    <div className = "info">
                        { grids }
                    </div>  
                    <Switch>                     
                        <Route    
                            path    = { "/:key" } 
                            render  = { ({ match: { params: { key } } }) => {
                              const idx     = keys.findIndex(el => el === key) 
                              const prev    = keys[idx - 1] 
                              const next    = keys[idx + 1]
                              const lastidx = keys.length -1
                              return ( <div>      
                                          <TabPanel
                                                    data = { keys } 
                                                    name = { key }/>

                                          <Grid     
                                                    gridData    = { data[key] } 
                                                    name        = { key } 
                                                    onMoveRight = { idx !== lastidx ? ids => onMove ({ from: key, to: next, ids }) : undefined }
                                                    onMoveLeft  = { idx !== 0       ? ids => onMove ({ from: key, to: prev, ids }) : undefined }                                                   
                                                    />
                                        </div>) } }   
                          />
                          <Route 
                              path="/" 
                              exact 
                              render= { () => { return <Redirect to={`/${keys[0]}`} /> } } 
                          />
                      </Switch>
                  </div>
                </Router>
        )    
    }
}

const mapStateToProps = ({ data, loading, error }) => {
  return { data, loading, error }
}
const mapDispatchtoProps = (dispatch, { gridService }) => {
   return{
    fetchGrids: fetchGrids(gridService, dispatch),
    onMove: prop => dispatch(onMove(prop))
  }   
}

export default  compose(
  withGridService(),
  connect(mapStateToProps, mapDispatchtoProps)
) (App)
