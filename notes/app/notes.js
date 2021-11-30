const fs = require('fs');

var fetchNotes = () => {
  try {
    var oldNotesString = fs.readFileSync('notes-data.json');
    return JSON.parse(oldNotesString);
  }
  catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  console.log('Adding note:', title, body);
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((item) => item.title === title);

  if(!duplicateNotes.length) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var remove = (title) => {
  console.log('Removing note:', title);
  var notes = fetchNotes();
  var filterNotes = notes.filter((item) => item.title !== title);
  saveNotes(filterNotes);
  return notes.length !== filterNotes.length;
};

var list = () => {
  console.log('Listing all notes:');
  return fetchNotes();
};

var read = (title) => {
  console.log('Reading note:', title);
  var notes = fetchNotes();
  return notes.filter((item) => item.title === title)[0];
};

var note2log = (note) => {
  debugger;
  console.log(note ? `${note.title}, ${note.body}` : 'Note not found.');
};

module.exports = {
  addNote,
  remove,
  list,
  read,
  note2log
};
