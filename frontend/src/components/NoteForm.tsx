import { useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "../App";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
} & Partial<NoteData>;

export const NoteForm = ({
    onSubmit,
    title = "",
    tags = [],
    onAddTag,
    availableTags,
    markdown = "",
}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            tags: selectedTags,
            markdown: markdownRef.current!.value,
        });

        navigate(-1);
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className="my-4">
                <Stack gap={4}>
                    <Row>
                        <Col>
                            <FormGroup controlId="title">
                                <Form.Label>
                                    <i>Title:</i>
                                </Form.Label>
                                <Form.Control
                                    required
                                    ref={titleRef}
                                    defaultValue={title}
                                />
                            </FormGroup>
                        </Col>

                        <Col>
                            <Form.Group controlId="tags">
                                <Form.Label>
                                    <i>Category Tags:</i>
                                </Form.Label>
                                {/* CreatableReactSelect with properties: */}
                                <CreatableReactSelect
                                    isMulti
                                    onCreateOption={(label) => {
                                        const newTag = { id: uuidV4(), label };
                                        onAddTag(newTag);
                                        setSelectedTags((prevTags) => [
                                            ...prevTags,
                                            newTag,
                                        ]);
                                    }}
                                    options={availableTags.map((tag) => {
                                        return {
                                            label: tag.label,
                                            value: tag.id,
                                        };
                                    })}
                                    value={selectedTags.map((tag) => {
                                        return {
                                            label: tag.label,
                                            value: tag.id,
                                        };
                                    })}
                                    onChange={(tags) => {
                                        setSelectedTags(
                                            tags.map((tag) => {
                                                return {
                                                    label: tag.label,
                                                    id: tag.value,
                                                };
                                            })
                                        );
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="markdown">
                        <Form.Label>
                            <i>Body (Markdown):</i>
                        </Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={12}
                            ref={markdownRef}
                            defaultValue={markdown}
                        />
                    </Form.Group>

                    <Stack
                        direction="horizontal"
                        gap={2}
                        className="justify-content-end"
                    >
                        <a
                            href="https://www.markdownguide.org/cheat-sheet/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Markdown Reference
                        </a>

                        <Button type="submit" variant="primary">
                            Save Note
                        </Button>

                        <Link to="-1">
                            <Button
                                type="button"
                                variant="outline-secondary"
                                style={{
                                    paddingLeft: "25px",
                                    paddingRight: "25px",
                                }}
                            >
                                Cancel
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Form>
        </>
    );
};
