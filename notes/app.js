const fs = require('fs');
const os = require('os');

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const title = {
  describe: 'Note title',
  demand: true,
  alias: 't'
};

const body = {
  describe: 'Note body',
  demand: true,
  alias: 'b'
};

const yargv = yargs
.command('add', 'Add note', {
  title,
  body
})
.command('remove', 'Remove note', {
  title
})
.command('list', 'List note')
.command('read', 'Read note', {
  title
})
.help()
.argv;

var command = yargv._[0];

if (command === 'add') {
  console.log('Add new note');
  var note = notes.addNote(yargv.title, yargv.body);
  notes.note2log(note);
}
else if (command === 'remove'){
  console.log('Remove the note');
  var note = notes.remove(yargv.title);
  console.log(note ? `Note removed: ${yargv.title}` : 'Removing note failed');
}
else if (command === 'list'){
  console.log('List all notes');
  var noteList = notes.list();
  console.log(noteList ? `${noteList.length} notes found` : 'No notes found');
  noteList.forEach((item) => notes.note2log(item));
}
else if (command === 'read'){
  console.log('Read the note');
  var note = notes.read(yargv.title);
  notes.note2log(note);
}
else {
  console.log('Command not found');
}
