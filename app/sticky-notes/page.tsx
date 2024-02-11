"use client"
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface Note {
    id: number;
    title: string;
    description: string;
    color?: string;
    dateTime: Date
}

interface Colors {
    sky?: string,
    pink?: string,
    yellow?: string,
    green?: string,
    lime?: string,
    cyan?: string,
    indigo?: string,
    purple?: string,
    teal?: string,
    rose?: string,
    fuchsia?: string,
}

const colors: Colors = {
    sky: "sky",
    pink: "pink",
    yellow: "yellow",
    green: "green",
    lime: "lime",
    cyan: "cyan",
    indigo: "indigo",
    purple: "purple",
    teal: "teal",
    rose: "rose",
    fuchsia: "fuchsia",
}

type NoteBackgroundColorVariants = Colors;
type BackgroundColorVariants = Colors;
type ButtonBackgroundColorVariants = Colors;

const NoteBackgroundColorVariants = {
    sky: 'bg-sky-100',
    pink: 'bg-pink-100',
    yellow: 'bg-yellow-100',
    green: 'bg-green-100',
    lime: 'bg-lime-100',
    cyan: 'bg-cyan-100',
    indigo: 'bg-indigo-100',
    purple: 'bg-purple-100',
    teal: 'bg-teal-100',
    rose: 'bg-rose-100',
    fuchsia: 'bg-fuchsia-100',
}

const BackgroundColorVariants = {
    sky: 'bg-sky-400',
    pink: 'bg-pink-400',
    yellow: 'bg-yellow-400',
    green: 'bg-green-400',
    lime: 'bg-lime-400',
    cyan: 'bg-cyan-400',
    indigo: 'bg-indigo-400',
    purple: 'bg-purple-400',
    teal: 'bg-teal-400',
    rose: 'bg-rose-400',
    fuchsia: 'bg-fuchsia-400',
}


const ButtonBackgroundColorVariants = {
    sky: 'bg-sky-600',
    pink: 'bg-pink-600',
    yellow: 'bg-yellow-600',
    green: 'bg-green-600',
    lime: 'bg-lime-600',
    cyan: 'bg-cyan-600',
    indigo: 'bg-indigo-600',
    purple: 'bg-purple-600',
    teal: 'bg-teal-600',
    rose: 'bg-rose-600',
    fuchsia: 'bg-fuchsia-600',
}

const colorsList = ["yellow", 'sky', 'pink', 'green', 'lime', 'cyan', 'indigo', 'purple', 'teal', 'rose', 'fuchsia']

const StickyNotes = () => {

    const [notesList, setNotesList] = useState<Note[]>([])

    const [newNoteTitle, setNewNoteTitle] = useState<string>('')
    const [newNoteDescription, setNewNoteDescription] = useState<string>('')
    const [selectedColor, setSelectedColor] = useState<string>('yellow')

    const getColor = (classname: string): string => {
        return classname.toString();
    }

    useEffect(() => {
        const storedNotes = localStorage.getItem('notes');

        if (storedNotes) {
            try {
                const parsedNotes = JSON.parse(storedNotes) as Note[];
                setNotesList(parsedNotes);
            } catch (error) {
                console.error('Error parsing notes from localStorage:', error);
                localStorage.removeItem('notes');
                setNotesList([]);
            }
        } else {
            setNotesList([]);
        }
    }, []);

    const addNewNote = () => {
        if (!!newNoteDescription.trim().length) {
            const storedNotes = localStorage.getItem('notes');
            try {
                let updateNoteList: Note[];

                if (storedNotes) {
                    const parsedNotes = JSON.parse(storedNotes) as Note[];
                    updateNoteList = [
                        { id: parsedNotes[0]?.id + 1, title: newNoteTitle, description: newNoteDescription, color: selectedColor, dateTime: new Date() },
                        ...parsedNotes,
                    ];
                } else {
                    updateNoteList = [{ id: 0, title: newNoteTitle, description: newNoteDescription, color: selectedColor, dateTime: new Date() }];
                }

                setNotesList(updateNoteList);
                localStorage.setItem('notes', JSON.stringify(updateNoteList));

                setNewNoteDescription('');
                setNewNoteTitle('');
            } catch (error) {
                console.error('Error adding new note:', error);
            }
        }
    };

    const removeNote = (noteId: number) => {
        const storedNotes = localStorage.getItem('notes');
        try {
            let updateNoteList: Note[];

            if (storedNotes) {
                const parsedNotes = JSON.parse(storedNotes) as Note[];
                updateNoteList = parsedNotes.filter((note) => note.id !== noteId)
            } else {
                updateNoteList = [];
            }

            setNotesList(updateNoteList);
            localStorage.setItem('notes', JSON.stringify(updateNoteList));
        } catch (error) {
            console.error('Error remove note:', error);
        }
    }


    return (
        <div className='w-100 min-h-screen' style={{ backgroundImage: "url('brick-wall-painted-white.jpg')" }}>
            <h1 className='text-center font-bold text-lg pt-2'></h1>
            <div className='mt-5 flex flex-row flex-wrap justify-center lg:justify-start lg:mx-5'>
                <div className='h-80 w-[350px] m-2 border relative shadow-md'>
                    <div className='w-100 h-8 flex justify-evenly items-center bg-white'>
                        {colorsList.map((color) =>
                            <button key={color}
                                className={`${BackgroundColorVariants[color as keyof typeof BackgroundColorVariants]} h-6 w-6 transition-transform hover:scale-150 hover:z-10`}
                                onClick={() => setSelectedColor(color)}>&nbsp;</button>)}
                    </div>
                    <div className='h-8'>
                        <input
                            autoFocus
                            placeholder='Note title'
                            maxLength={50}
                            value={newNoteTitle}
                            onChange={(e) => setNewNoteTitle(e.target.value)}
                            className={`w-full h-full p-2 outline-none text-center focus:outline-none placeholder:text-sm border-b-2 border-b-white ${NoteBackgroundColorVariants[selectedColor as keyof typeof NoteBackgroundColorVariants]} kalam-regular`}
                        // style={{ borderBottom: "2px solid gray", }}
                        />
                    </div>
                    <div className='h-64'>
                        <textarea
                            autoFocus
                            placeholder='write your note here'
                            maxLength={500}
                            value={newNoteDescription}
                            onChange={(e) => setNewNoteDescription(e.target.value)}
                            className={`w-full h-full p-2 outline-none resize-none focus:outline-none placeholder:text-sm ${NoteBackgroundColorVariants[selectedColor as keyof typeof NoteBackgroundColorVariants]} kalam-regular`}
                        />
                    </div>
                    {!!newNoteDescription.trim().length &&
                        <button
                            className={`absolute right-2 bottom-2 p-4 md:p-2 focus:outline-none  text-white border-white rounded-full cursor-pointer ${ButtonBackgroundColorVariants[selectedColor as keyof typeof BackgroundColorVariants]}`}
                            onClick={addNewNote}><Check /></button>
                    }
                </div>
                {notesList.map((note) =>
                    <div key={note.id} className='h-80 w-[350px] m-2 relative shadow-md overflow-hidden transition-transform'>
                        <div className={`w-100 h-8 flex justify-between items-center px-2 ${BackgroundColorVariants[note.color as keyof typeof BackgroundColorVariants]} text-white `}>
                            {/* <h6 className='text-sm font-bold font-mono'>{format(new Date(note.dateTime), 'EEE MMM dd hh:mm a')}</h6> */}
                            <h6 className='font-mono'>{format(new Date(note.dateTime), 'EEE MMM dd hh:mm a')}</h6>
                            <button
                                className='absolute top-1 right-2'
                                onClick={() => removeNote(note.id)}><X /></button>
                        </div>
                        <div className={`${NoteBackgroundColorVariants[note.color as keyof typeof NoteBackgroundColorVariants]} h-72 relative`}>
                            <h2 className='text-lg text-center mt-1 underline underline-offset-2 capitalize font-semibold kalam-regular'>{note.title ? note.title : null}</h2>
                            <h6 className='p-2 break-words whitespace-break-spaces kalam-regular overflow-y-auto'>
                                {note.description}
                            </h6>
                        </div>
                    </div>
                )
                }
            </div>
        </div >
    )
}

export default StickyNotes
