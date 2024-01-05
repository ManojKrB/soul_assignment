import { useState, useEffect } from 'react';
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

const responsesArray = [
  'This is a dummy response 0',
  'This is a dummy response 1',
  'This is a dummy response 2',
  'This is a dummy response 3',
  'This is a dummy response 4',
  'This is a dummy response 5',
  'This is a dummy response 6',
  'This is a dummy response 7',
  'This is a dummy response 8',
  'This is a dummy response 9',
  'This is a dummy response 10',
  'This is a dummy response 11',
  'This is a dummy response 12',
  'This is a dummy response 13',
  'This is a dummy response 14',
  'This is a dummy response 15',
  'This is a dummy response 16',
  'This is a dummy response 17',
  'This is a dummy response 18',
  'This is a dummy response 19',
]

function App() {
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  useEffect(() => {
    if(!currentTitle && value && message){
      setCurrentTitle(value);
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats, {
          title: currentTitle,
          role: 'You',
          content: value
        }, {
          title: currentTitle,
          role: 'AI',
          content: message
        }]
      ))
    }
  }, [message, currentTitle])

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue('')
  };

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)

  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
  };

  const getResponse = () => {
    setMessage(responsesArray[Math.floor(Math.random()*20)])
  }

  return (
    <Provider store={store}>
      <div className="App">
     <section className='sidebar'>
      <button className='button' onClick={createNewChat}>+ New Chat</button>
      <ul className='history'>
        {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
      </ul>
      <nav className='nav'>
        <p>Soul AI</p>
      </nav>
     </section>
     <section className='main'>
      {!currentTitle && <h1>Soul AI</h1>}
      <ul className='feed'>
        {currentChat?.map((chatMessage, index) => <li key={index}>
          <p className='role'>{chatMessage.role}</p>
          <p>{chatMessage.content}</p>
        </li>)}
      </ul>
      <div className='bottom-section'>
        <div className='input-container'>
          <input className='input' value={value} onChange={(e) => {setValue(e.target.value)}} />
          <div id='submit' onClick={getResponse}>➢</div>
        </div>
        <p className='info'>Assignment from Soul AI. submitted by Manoj Kumar Bayyarapu</p>
      </div>
     </section>
    </div>
    </Provider>
    
  );
}

export default App;
