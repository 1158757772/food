
import './App.css';
import ThisRouter from './router/index'
import 'antd/dist/antd.css';
import { Provider} from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <ThisRouter >
        
      </ThisRouter>
      </Provider>
    
  );
}

export default App;
