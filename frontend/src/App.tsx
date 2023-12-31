import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { RegisterPage } from "./pages/registerPage/RegisterPage";
import { NoteList } from "./pages/noteList/NoteList";
import { NewNote } from "./pages/newNote/NewNote";
import { NoteLayout } from "./components/NoteLayout";
import { EditNote } from "./pages/editNote/EditNote";
import { ViewNote } from "./pages/viewNote/ViewNote";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "./components/useLocalStorage";
import { useEffect, useMemo } from "react";
import axios from "axios";

export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
};

export type Tag = {
    id: string;
    label: string;
};

export type RawNote = {
    id: string;
} & RawNoteData;

export type RawNoteData = {
    title: string;
    markdown: string;
    tagIds: string[];
};

export type Note = {
    id: string;
} & NoteData;

function App() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
    const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

    // Convert the RawNote[] and Tag[] to actual notes with tags:
    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return {
                ...note,
                tags: tags.filter((tag) => note.tagIds?.includes(tag.id)),
            };
        });
    }, [notes, tags]);

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes((prevNotes) => {
            return [
                ...prevNotes,
                { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
            ];
        });
    }

    function onDeleteNote(id: string) {
        if (window.confirm("'Delete Note' cannot be undone, are you sure?")) {
            setNotes((prevNotes) => {
                return prevNotes.filter((note) => note.id !== id);
            });
        }
    }

    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        setNotes((prevNotes) => {
            return prevNotes.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        ...data,
                        tagIds: tags.map((tag) => tag.id),
                    };
                } else {
                    return note;
                }
            });
        });
    }

    function onAddTag(tag: Tag) {
        setTags((prevTags) => [...prevTags, tag]);
    }

    function onUpdateTag(id: string, label: string) {
        setTags((prevTags) => {
            return prevTags.map((tag) => {
                if (tag.id === id) {
                    return { ...tag, label };
                } else {
                    return tag;
                }
            });
        });
    }

    function onDeleteTag(id: string) {
        setTags((prevTags) => {
            return prevTags.filter((tag) => tag.id !== id);
        });
    }

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await axios.get("/api/notes");

                setNotes(data);
                setTags(data);
                console.log("data", data);
            } catch (error: any) {
                console.log(error);
            }
        };

        fetchNotes();
    }, [setNotes, setTags]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/list"
                    element={
                        <NoteList
                            availableTags={tags}
                            notes={notesWithTags}
                            onUpdateTag={onUpdateTag}
                            onDeleteTag={onDeleteTag}
                        />
                    }
                />
                <Route
                    path="/new"
                    element={
                        <NewNote
                            onSubmit={onCreateNote}
                            availableTags={tags}
                            onAddTag={onAddTag}
                        />
                    }
                />
                <Route
                    path="/:id"
                    element={<NoteLayout notes={notesWithTags} />}
                >
                    <Route
                        index
                        element={<ViewNote onDeleteNote={onDeleteNote} />}
                    />
                    <Route
                        path="edit"
                        element={
                            <EditNote
                                onSubmit={onUpdateNote}
                                onAddTag={onAddTag}
                                availableTags={tags}
                            />
                        }
                    />
                </Route>
                <Route path="*" element={<Navigate to="/list" />} />
            </Routes>
        </div>
    );
}

export default App;
