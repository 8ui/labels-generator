import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react'
import Theme from './themes/defaultTheme';

import Steps from './containers/Steps';

const { store, persistor } = configureStore()

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Theme>
            <Steps />
          </Theme>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
