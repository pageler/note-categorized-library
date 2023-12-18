import { Container } from "react-bootstrap";
import { Header } from "../../components/header/Header";
import "./EditNote.css";
import { NoteForm } from "../../components/NoteForm";
import { NoteData, Tag } from "../../App";
import { useNote } from "../../components/NoteLayout";

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

export const EditNote = ({
    onSubmit,
    onAddTag,
    availableTags,
}: EditNoteProps) => {
    const note = useNote();

    return (
        <>
            <Header />

            <Container className="my-4">
                <h1 className="editTitle">
                    <u>Edit Note</u>
                </h1>

                <NoteForm
                    onSubmit={(data) => onSubmit(note.id, data)}
                    onAddTag={onAddTag}
                    availableTags={availableTags}
                    // populate defaultValue NoteForm:
                    title={note.title}
                    tags={note.tags}
                    markdown={note.markdown}
                />
            </Container>
        </>
    );
};
