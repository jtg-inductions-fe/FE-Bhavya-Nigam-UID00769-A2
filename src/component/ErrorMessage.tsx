import { Alert, Box } from '@mui/material';

import { StyleButton } from '@container/Profile/Profile.Container.Style';

interface ErrorMessageProps {
    message: string;
    buttonName: string;
    onClickFunction: React.MouseEventHandler<HTMLButtonElement>;
}

export const ErrorMessage = ({
    message,
    buttonName,
    onClickFunction,
}: ErrorMessageProps) => (
    <Box>
        <Alert variant="filled" severity="error">
            {message}
        </Alert>

        <StyleButton variant="contained" onClick={onClickFunction}>
            {buttonName}
        </StyleButton>
    </Box>
);
