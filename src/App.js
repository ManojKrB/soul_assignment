import './App.css';
import Sidepanel from './components/Sidepanel';
import ChatContainer from './components/ChatContainer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './store/chatSlice'


const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
     <Sidepanel />
     <ChatContainer />
    </div>
    </Provider>
    
  );
}

export default App;
