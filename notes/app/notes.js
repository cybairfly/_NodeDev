const fs = require('fs');

const loadNotes = () => {
  try {
    const oldNotesBuffer = fs.readFileSync('../notes-data.json');
    const oldNotes = JSON.parse(oldNotesBuffer.toString());
    return oldNotes;
  }
  catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('../notes-data.json', JSON.stringify(notes));
};

const add = (title, body) => {
  console.log('Adding note:', title, body);
  const notes = loadNotes();
  const note = {
    title,
    body
  };

  const duplicateNotes = notes.filter((item) => item.title === title);

  if(!duplicateNotes.length) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const remove = (title) => {
  console.log('Removing note:', title);
  const notes = loadNotes();
  const filterNotes = notes.filter((item) => item.title !== title);
  saveNotes(filterNotes);
  return notes.length !== filterNotes.length;
};

const list = () => {
  console.log('Listing all notes:');
  const notes = loadNotes();
  console.log(notes);
  return notes;
};

const read = (title) => {
  console.log('Reading note:', title);
  const notes = loadNotes();
  const note = notes.filter((item) => item.title === title)[0];
  console.log(note);
  return note;
};

const note2log = (note) => {
  debugger;
  console.log(note ? `${note.title}, ${note.body}` : 'Note not found.');
};

module.exports = {
  add,
  remove,
  list,
  read,
  note2log
};
