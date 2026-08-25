import { Typography, useTheme } from '@mui/material';

export const App = () => {
    const { palette } = useTheme();
    return (
        <div>
            <Typography
                color={palette.background.paper}
                component="h1"
                variant="h1"
            >
                Hello World
            </Typography>
        </div>
    );
};
