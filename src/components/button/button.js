
import React, { Component }   from 'react'

 class Button extends Component {
    render(){
        const { side, onMove } = this.props  
        return(    <button 
                            type        = "button"  
                            className   = { `btn  btn-sm float-right ${side}-button` }
                            onClick     = { onMove }  >
                        <i  
                            className   = { `fa fa-arrow-${side}` } />
                    </button>
            )   
        }
}

Button.defaultProps = {
    onMove: () => {}
  }
export default Button