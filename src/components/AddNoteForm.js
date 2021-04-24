import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context';
import useMousePosition from '../hooks/useMousePosition';

const AddNoteForm = () => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const position = useMousePosition();

  const addNote = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_NOTE',
      title,
      body,
    });
    setTitle('');
    setBody('');
  };

  // if you don't want to add extra wrapper divs to ensure JSX only has one root component, you can add what is called a
  // fragment which is just an empty tag <> and empty closing tag </>
  return (
    <>
      <p>
        Add note (mouse x,y position: {position.x}, {position.y})
      </p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>add note</button>
      </form>
    </>
  );
};

export { AddNoteForm as default };
