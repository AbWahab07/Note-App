const fs = require('fs');

let notes;

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (error) {
    return [];
  }
};


const checkDuplicate = (notes, title) => {
  const duplicateNotes = notes.filter(n => n.title === title);

  if (duplicateNotes.length === 0) {
    return false;
  }
  return true;
};


const saveNotes = (notes, note = '') => {
  if (note !== '') {
    notes.push(note);
  }
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


function addNote(title, body) {
  notes = fetchNotes();
  const note = {
    title,
    body
  };

  const duplicate = checkDuplicate(notes, title);
  if (!duplicate) {
    saveNotes(notes, note);
    return true;
  }
  return false;
}


const removeNote = (title) => {
  notes = fetchNotes();
  const updatedNotes = notes.filter(note => note.title !== title);
  if (updatedNotes.length < notes.length) {
    saveNotes(updatedNotes);
    return true;
  }
  return false;
};


const listNotes = () => fetchNotes();


const readNote = (title) => {
  // debugger // eslint-disable-line
  notes = fetchNotes();
  const noteFound = notes.filter(note => note.title === title);
  return (noteFound[0]);
};

const logNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log((`Body: ${note.body}`));
};
module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
  logNote
};
// debug(module); module is availabe in every file by default
