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
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

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
    const [notes, setNotes] = useState<RawNote[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes((prevNotes) => {
            return [
                ...prevNotes,
                { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
            ];
        });
    }

    function onAddTag(tag: Tag) {
        setTags((prevTags) => [...prevTags, tag]);
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/list" element={<NoteList />} />
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
                <Route path="/:id" element={<NoteLayout />}>
                    <Route index element={<ViewNote />} />
                    <Route path="edit" element={<EditNote />} />
                </Route>
                <Route path="*" element={<Navigate to="/list" />} />
            </Routes>
        </div>
    );
}

export default App;
