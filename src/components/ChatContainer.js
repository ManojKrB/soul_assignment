import React from 'react';
import styles from './ChatContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateText, addEntry, selectText, selectEntries } from '../store/chatSlice';


const ChatContainer = () => {
    const dispatch = useDispatch();
    const text = useSelector(selectText);
    const entries = useSelector(selectEntries);
    console.log('entries are ', entries)
    
  
    const handleTextChange = (e) => {
      dispatch(updateText(e.target.value));
    };
  
    const handleGenerateClick = () => {
        dispatch(addEntry());
    };

  return (
    
    <div className={styles.container}>
        <div className={styles.inputContainer}>
        
            <textarea className={styles.input} value={text}
          onChange={handleTextChange}  />
            <button className={styles.button} onClick={handleGenerateClick}>Generate</button>
        </div>
    </div>
  )
}

export default ChatContainer