import chalk from 'chalk';
import yargs from 'yargs';
//have blue chalk for actions performed

import {addNote, removeNote, listNotes, readNote} from './notes.js';

//4 commands to be done for app[add, remove, list, read]
//this must be done if using es6 notation to make sure it stays as a singleton object
const cArgs = yargs();

cArgs.command({
    command: 'add',
    describe: 'Add a new note',
    //arg options
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        addNote(argv.title, argv.body)
        console.log(chalk.blue.inverse('added note'));
    }
});

cArgs.command({
    command: 'remove',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        removeNote(argv.title)
        console.log(chalk.blue.inverse('removed note'))
    }
});

cArgs.command({
    command: 'list',
    aliases: 'ls',
    describe: 'List all the titles of the notes',
    handler: () => {
        console.log(chalk.blue.inverse('list notes'));
        listNotes();
    }
});

cArgs.command({
    command: 'read',
    aliases: 'rd',
    describe: 'read',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.blue.inverse('read a note'));
        readNote(argv.title);
    }
});

cArgs.parse(process.argv.slice(2));


