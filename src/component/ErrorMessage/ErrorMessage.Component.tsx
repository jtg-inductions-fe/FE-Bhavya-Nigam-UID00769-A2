import { Alert, Box, Button, Typography } from '@mui/material';

import { ErrorMessageProps } from '@type/ErrorMessage.Types';

import {
    StyleContainerBox,
    StyleMessageBox,
    StyleSadIcon,
} from './ErrorMessage.Component.Style';

export const ErrorMessage = ({
    alertMessage,
    boxMessage,
    buttonName,
    onClickFunction,
}: ErrorMessageProps) => (
    <Box>
        <Alert variant="filled" severity="error">
            {alertMessage}
        </Alert>

        <StyleContainerBox>
            <StyleMessageBox>
                <Typography component="h1" variant="h3">
                    {boxMessage}
                </Typography>
                <StyleSadIcon />

                <Button variant="contained" onClick={void onClickFunction}>
                    {buttonName}
                </Button>
            </StyleMessageBox>
        </StyleContainerBox>
    </Box>
);
