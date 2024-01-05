import { useState, useEffect } from 'react';
import './App.css';
import Sidepanel from './components/Sidepanel';
import ChatContainer from './components/ChatContainer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './store/chatSlice'
import { Rating } from 'react-simple-star-rating'


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
  
  const [currentTitle, setCurrentTitle] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [rating, setRating] = useState(null);
  const initialChats = JSON.parse(localStorage.getItem('previousChats')) || [];
  const [previousChats, setPreviousChats] = useState(initialChats);

  useEffect(() => {
    if(!currentTitle && value && message){
      setCurrentTitle(value);
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats, {
          title: currentTitle,
          role: 'You',
          content: value || message
        }, {
          title: currentTitle,
          role: 'AI',
          content: message,
          like: null,
          dislike: null,
          rating: rating,
          feedback: feedback,
        }]
      ))
      setValue('');
      setRating(null)
    }
  }, [message, currentTitle, rating])

  useEffect(() => {
    localStorage.setItem('previousChats', JSON.stringify(previousChats));
  }, [previousChats]);

  

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
    setMessage(responsesArray[Math.floor(Math.random()*20)]);
  }
 
  const handleFeedback = (feedbackType, index) => {
    setPreviousChats((prevChats) =>
      prevChats.map((chat, i) =>
        i === index
          ? {
              ...chat,
              like: feedbackType === 'like' ? true : false,
              dislike: feedbackType === 'dislike' ? true : false,
            }
          : chat
      )
    );
  };

  const handleSaveFeedback = () => {
    if (currentTitle && feedbackInput !== '') {
      setFeedback(feedbackInput); 
      setPreviousChats((prevChats) =>
        prevChats.map((chat) =>
          chat.title === currentTitle && chat.role === 'AI'
            ? {
                ...chat,
                feedback: feedbackInput,
              }
            : chat
        )
      );
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
    if (currentTitle) {
      setPreviousChats((prevChats) =>
        prevChats.map((chat) =>
          chat.title === currentTitle && chat.role === 'AI'
            ? {
                ...chat,
                rating: rate,
              }
            : chat
        )
      );
    }
  };

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
          <div >
          <p>{chatMessage.content}</p>
          {chatMessage.role === 'AI' && (
                  <div  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)} style={{ display: 'flex', flexDirection: 'column',  alignItems: 'flex-start'}}>
                 
                    <div style={{ opacity: hoveredIndex === index ? 1 : 0 }} className="feedback-buttons">
                      <button onClick={() => handleFeedback('like', index)} style={{backgroundColor:  chatMessage?.like === true ? 'green' : null} }>
                        👍
                      </button>
                      <button onClick={() => handleFeedback('dislike', index)} style={{backgroundColor:  chatMessage?.dislike === true ? 'red' : null} }>
                        👎
                      </button>
                    </div>
      
                  </div>
                )}
          </div>
          
        </li>)}
      </ul>
      
      <div className='bottom-section'>
        <div className='input-container'>
        {currentChat.length > 0 && (
          <>
          {feedback === '' ? (
          <div className="user-feedback">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <textarea
                placeholder="Provide your feedback..."
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                className='feedback'
              />
              <button onClick={handleSaveFeedback}>Save</button>
            </div>
          </div>
        ) : (
          <div className="user-feedback">
            <p>{feedback}</p>
          </div>
        )}
              <Rating
              initialValue={rating}
        onClick={handleRating}
        size={25}
      />
              </>
            )}
          <input className='input' value={value} onChange={(e) => {setValue(e.target.value)}} />
          <div id='submit' onClick={getResponse}>➢</div>
        </div>
        
            
        <p className='info'>Assignment from Soul AI. Submitted by Manoj Kumar Bayyarapu</p>
      </div>
     </section>
    </div>
    </Provider>
    
  );
}

export default App;
