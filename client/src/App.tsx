import { Provider } from 'mobx-react';
import './App.css';
import ShopList from './components/ShopList';
import shopListStore from './stores/ShopList';

function App() {
  return (
    <Provider shopListStore={shopListStore}>
      <div className='App'>
        <ShopList />
      </div>
    </Provider>
  );
}

export default App;
