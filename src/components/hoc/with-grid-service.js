import React from 'react';
import { GridServiceConsumer } from '../grid-service-context';

const withGridService = () => (Wrapped) => {

  return (props) => {
    return (
      <GridServiceConsumer>
        {
          (gridService) => {
            return (<Wrapped {...props}
                     gridService={gridService}/>);
          }
        }
      </GridServiceConsumer>
    );
  }
};

export default withGridService;
