import { Container } from "react-bootstrap";
import { Header } from "../../components/header/Header";
import "./NewNote.css";
import { NoteForm } from "../../components/NoteForm";
import { NoteData, Tag } from "../../App";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

export const NewNote = ({
    onSubmit,
    availableTags,
    onAddTag,
}: NewNoteProps) => {
    return (
        <>
            <Header />

            <Container className="my-4 noteTitle">
                <h1>
                    <u>Create New Note</u>
                </h1>

                <NoteForm
                    onSubmit={onSubmit}
                    availableTags={availableTags}
                    onAddTag={onAddTag}
                />
            </Container>
        </>
    );
};
