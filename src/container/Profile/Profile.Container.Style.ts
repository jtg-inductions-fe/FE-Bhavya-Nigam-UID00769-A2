import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Box, Button, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyleContainerBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: spacing(80),
    alignItems: 'center',
    scrollBehavior: 'initial',
}));

export const StyleImgBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

export const StyleMainContainer = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        width: '100%',
        paddingTop: spacing(6),
        gap: spacing(10),
        paddingBottom: spacing(6),
        paddingRight: spacing(6),
        paddingLeft: spacing(6),
        justifyContent: 'space-around',

        [breakpoints.down('md')]: {
            flexDirection: 'column',
            paddingRight: spacing(4),
            paddingLeft: spacing(4),
        },
    }),
);
export const StyleProfileDetails = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: `0 0 0 0.2px ${palette.text.primary}`,
        borderRadius: spacing(2),
        paddingLeft: spacing(6),
        paddingRight: spacing(6),
        paddingBottom: spacing(4),
    }),
);
export const StyleImg = styled('img')(({ theme: { spacing } }) => ({
    borderRadius: '50%',
    marginTop: spacing(8),
    marginBottom: spacing(4),
    width: spacing(40),
    height: spacing(40),

    boxShadow: '0 0 12px 0.5px rgba(1,1,1,0.5)',
}));

export const StyleUsernameText = styled(Box)(({ theme: { palette } }) => ({
    color: palette.text.secondary,
}));

export const StyleTopDetailBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing(3),

    paddingRight: spacing(2),
    paddingLeft: spacing(2),
}));

export const StyleFollowButton = styled(Button)(({ theme: { spacing } }) => ({
    fontSize: spacing(3),
    width: spacing(40),
    marginBottom: spacing(4),
    marginTop: spacing(2),
}));

export const StyleBioText = styled(Box)(({ theme: { spacing } }) => ({
    fontSize: spacing(4),
}));

export const StyleDetailBox = styled('a')(
    ({ theme: { palette, spacing } }) => ({
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',

        fontSize: spacing(3.5),
        wordBreak: 'break-word',

        color: palette.primary.dark,
    }),
);

export const StyleBlogLink = styled(Box)(() => ({
    cursor: 'pointer',
}));

export const StyleLocationIcon = styled(LocationOnIcon)(
    ({ theme: { spacing } }) => ({
        fontSize: spacing(4),
    }),
);

export const StyleLinkIcon = styled(LinkIcon)(({ theme: { spacing } }) => ({
    fontSize: spacing(4),
}));

export const StyleCountDetails = styled(Box)(() => ({
    display: 'flex',
}));

export const StyleSubCountHeadingDetails = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: spacing(3.5),
        border: `1px ${palette.primary.dark}`,
        paddingLeft: spacing(1),
        paddingRight: spacing(1),
    }),
);

export const StyleNumberDetails = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

export const StyleRepoDetails = styled(Box)(
    ({ theme: { spacing, breakpoints, palette } }) => ({
        maxHeight: '90vh',

        display: 'flex',
        flexDirection: 'column',
        gap: spacing(4),
        overflowY: 'auto',
        boxShadow: `0 0 0 0.2px ${palette.text.primary}`,
        borderRadius: spacing(2),

        paddingLeft: spacing(10),
        paddingRight: spacing(10),
        paddingTop: spacing(4),
        paddingBottom: spacing(4),

        [breakpoints.down('md')]: {
            overflowY: '',
        },
    }),
);
export const StyleRepoCard = styled(Box)(({ theme: { spacing, palette } }) => ({
    border: '1px solid black',
    cursor: 'pointer',

    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    '&:hover': {
        backgroundColor: palette.text.primary,
        '& .MuiBox-root': {
            color: palette.secondary.main,
        },
    },
}));
export const StyleRepoName = styled(Box)(() => ({
    fontWeight: 700,
}));
export const StyleRepoDescription = styled(Box)(({ theme: { spacing } }) => ({
    fontSize: spacing(3.5),
}));
export const StyleRepoMoreDetails = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        marginTop: spacing(4),
        paddingLeft: spacing(10),
        paddingRight: spacing(10),
        color: palette.text.secondary,
        justifyContent: 'space-between',
    }),
);
export const StyleRepoStars = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyleStarIcon = styled(StarBorderOutlinedIcon)(() => ({}));

export const StyleFollowDetails = styled(Box)(
    ({ theme: { breakpoints, spacing, palette } }) => ({
        boxShadow: `0 0 0 0.2px ${palette.text.primary}`,
        borderRadius: spacing(2),

        paddingLeft: spacing(6),
        paddingTop: spacing(4),
        paddingBottom: spacing(4),

        maxHeight: '90vh',
        paddingRight: spacing(6),

        [breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'space-around',
            gap: spacing(2),
        },
        [breakpoints.down('sm')]: {
            display: 'block',
        },
    }),
);
export const StyleFollowersBox = styled(Box)(({ theme: { spacing } }) => ({
    maxHeight: '44vh',

    display: 'flex',
    flexDirection: 'column',

    marginBottom: spacing(3),
}));
export const StyleFollowingBox = styled(Box)(() => ({
    maxHeight: '44vh',

    display: 'flex',
    flexDirection: 'column',
}));
export const StyleFollowHeading = styled(Box)(({ theme: { spacing } }) => ({
    fontWeight: 700,
    fontSize: spacing(5),
}));

export const StyleFollowersNameBox = styled(Box)(() => ({
    wordBreak: 'break-word',
}));

export const StyleListBox = styled(Box)(() => ({
    overflowY: 'scroll',
}));

export const StyleListItemBox = styled(ListItem)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        gap: spacing(20),
        borderBottom: '1px solid',
        borderColor: palette.background.paper,
        width: spacing(70),
    }),
);

export const StyleListLeftPart = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));

export const StyleListButton = styled(Button)(
    ({ theme: { palette, spacing } }) => ({
        textTransform: 'initial',
        backgroundColor: 'transparent',
        width: spacing(80),
        display: 'flex',
        justifyContent: 'start',
        color: palette.secondary.dark,
    }),
);
