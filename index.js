import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { Provider }             from 'react-redux';
import App                      from './components/app';
import ErrorBoundry             from './components/error-boundry';
import GridService              from './services/grid-service';
import { GridServiceProvider }  from './components/grid-service-context';
import store                    from './store';

const gridService = new GridService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <GridServiceProvider value={gridService}>
          <App />
      </GridServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
  )