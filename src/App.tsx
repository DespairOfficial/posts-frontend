import { Provider } from 'react-redux';
import RouteApp from './Route';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App w-screen h-screen">
        <RouteApp />
      </div>
    </Provider>
  );
}

export default App;
