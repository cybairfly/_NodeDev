// ESM workaround
(async () => {

  const fs = require('fs');
  const os = require('os');

  const _ = require('lodash');
  const yargs = require('yargs/yargs');
  const {hideBin} = require('yargs/helpers');
  let chalk = (await import('chalk')).default;

  const notes = require('./notes.js');

  // console.log(process.argv);
  // console.log(yargs.argv);

  // custom CLI version
  // yargs.version('1.0.0');

  yargs(hideBin(process.argv))
    .command({
      command: 'add',
      describe: 'Add a new note',
      builder: {
        title: {
          demandOption: true,
          describe: 'Note title',
          type: 'string',
        },
        body: {
          demandOption: true,
          describe: 'Note text',
          type: 'string',
        }
      },
      handler(argv) {
        console.log(chalk.green('Adding note'));
        console.log(`Title: "${argv.title}"`);
        console.log(`Body: "${argv.body}"`);

        notes.add(argv.title, argv.body);
      }
    })
    .command({
      command: 'remove',
      describe: 'Remove a new note',
      builder: {
        title: {
          demandOption: true,
          describe: 'Note title',
          type: 'string',
        },
      },
      handler(argv) {
        console.log(chalk.red('Removing note'));
        console.log(`Title: "${argv.title}"`);
        console.log(`Body: "${argv.body}"`);

        notes.remove(argv.title, argv.body);
      }
    })
    .command({
      command: 'list',
      describe: 'List all notes',
      handler(argv) {
        console.log(chalk.grey('Listing notes'));

        notes.list();
      }
    })
    .command({
      command: 'read',
      describe: 'Read a note',
      builder: {
        title: {
          demandOption: true,
          describe: 'Note title',
          type: 'string',
        },
      },
      handler(argv) {
        console.log(chalk.grey('Reading a note'));

        notes.read(argv.title);
      }
    })
    .help()
    .argv;

  // const title = {
  //   describe: 'Note title',
  //   demand: true,
  //   alias: 't'
  // };

  // const body = {
  //   describe: 'Note body',
  //   demand: true,
  //   alias: 'b'
  // };

  // const yargv = yargs
  // .command('add', 'Add note', {
  //   title,
  //   body
  // })
  // .command('remove', 'Remove note', {
  //   title
  // })
  // .command('list', 'List note')
  // .command('read', 'Read note', {
  //   title
  // })
  // .help()
  // .argv;

  // var command = yargv._[0];

  // if (command === 'add') {
  //   console.log('Add new note');
  //   var note = notes.addNote(yargv.title, yargv.body);
  //   notes.note2log(note);
  // }
  // else if (command === 'remove'){
  //   console.log('Remove the note');
  //   var note = notes.remove(yargv.title);
  //   console.log(note ? `Note removed: ${yargv.title}` : 'Removing note failed');
  // }
  // else if (command === 'list'){
  //   console.log('List all notes');
  //   var noteList = notes.list();
  //   console.log(noteList ? `${noteList.length} notes found` : 'No notes found');
  //   noteList.forEach((item) => notes.note2log(item));
  // }
  // else if (command === 'read'){
  //   console.log('Read the note');
  //   var note = notes.read(yargv.title);
  //   notes.note2log(note);
  // }
  // else {
  //   console.log('Command not found');
  // }

})();