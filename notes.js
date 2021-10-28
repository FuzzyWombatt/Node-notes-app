import fs from 'fs'

import chalk from 'chalk';


const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => {
        return note.title === title;
    });

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);

        console.log(chalk.green.inverse('Succesfully added note'))
    }else{
        console.log(chalk.red.inverse('Note title taken, no new note added'))
    }

}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(error) {
        return [];
    }
}

const saveNotes = (data) => {
    const saveData = JSON.stringify(data);
    fs.writeFileSync('notes.json', saveData)
}

const removeNote = (title) => {
    const notes = loadNotes();

    const filteredNotes = notes.filter((note) => {
        return note.title !== title
    })

    if(filteredNotes.length === notes.length){
        console.log(chalk.red.inverse('no note was removed due to no matching title'))
    }else{
        console.log(chalk.green.inverse('note removal succes'));
        saveNotes(filteredNotes);
    }

}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.magenta.inverse('Your Notes'))

    notes.forEach( (note) => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find((note) =>{
        return note.title === title
    })

    if(note){
        console.log(chalk.gray.inverse(note.title))
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('no note with the title '+title))
    }
}

export {addNote,removeNote, listNotes, readNote };

