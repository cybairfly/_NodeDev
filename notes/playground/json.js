const fs = require('fs');

var originalNote = {
  title: 'title',
  body: 'body'
}

var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

var loadedNoteString = fs.readFileSync('notes.json');
var note = JSON.parse(loadedNoteString);

console.log(note.title);
console.log(typeof note);
