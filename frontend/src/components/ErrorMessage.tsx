import { Alert } from "react-bootstrap";

type ErrorMessageProps = {
    variant: string;
    children: React.ReactNode;
};

export const ErrorMessage = ({ variant, children }: ErrorMessageProps) => {
    return (
        <>
            <Alert variant={variant} style={{ fontSize: 20 }}>
                <strong>{children}</strong>
            </Alert>
        </>
    );
};
