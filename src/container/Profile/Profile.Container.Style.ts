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
    maxHeight: '100%',
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
        gap: spacing(10),
        padding: spacing(6),
        justifyContent: 'space-around',

        [breakpoints.down('lg')]: {
            flexDirection: 'column',
            paddingRight: spacing(4),
            paddingLeft: spacing(4),
        },
    }),
);
export const StyleProfileDetails = styled(Box)(
    ({ theme: { spacing, palette, breakpoints } }) => ({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: `0 0 0 0.2px ${palette.text.primary}`,
        borderRadius: spacing(2),
        padding: `${spacing(4)} ${spacing(6)}`,
        paddingTop: 0,
        maxWidth: '30%',

        [breakpoints.down('lg')]: {
            minWidth: '100%',
        },
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

    padding: `0 ${spacing(2)}`,
}));

export const StyleFollowButton = styled(Button)(
    ({ theme: { spacing, typography } }) => ({
        fontSize: typography.pxToRem(12),
        width: spacing(40),
        marginBottom: spacing(4),
        marginTop: spacing(2),
    }),
);

export const StyleBioText = styled(Box)(
    ({ theme: { spacing, typography } }) => ({
        fontSize: typography.pxToRem(16),
        maxWidth: spacing(120),
    }),
);

export const StyleDetailBox = styled('a')(
    ({ theme: { palette, typography } }) => ({
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',

        fontSize: typography.pxToRem(14),
        wordBreak: 'break-word',

        color: palette.primary.dark,
    }),
);

export const StyleBlogLink = styled(Box)(() => ({
    cursor: 'pointer',
}));

export const StyleLocationIcon = styled(LocationOnIcon)(
    ({ theme: { typography } }) => ({
        fontSize: typography.pxToRem(16),
    }),
);

export const StyleLinkIcon = styled(LinkIcon)(({ theme: { typography } }) => ({
    fontSize: typography.pxToRem(16),
}));

export const StyleCountDetails = styled(Box)(() => ({
    display: 'flex',
}));

export const StyleSubCountHeadingDetails = styled(Box)(
    ({ theme: { spacing, palette, typography } }) => ({
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: typography.pxToRem(14),
        border: `1px ${palette.primary.dark}`,
        padding: `0 ${spacing(1)}`,
    }),
);

export const StyleNumberDetails = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

export const StyleRepoDetails = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        maxHeight: '88vh',

        display: 'flex',
        flexDirection: 'column',
        gap: spacing(4),
        overflowY: 'auto',
        boxShadow: `0 0 0 0.2px ${palette.text.primary}`,
        borderRadius: spacing(2),
        minWidth: '40%',
        padding: `${spacing(4)} ${spacing(10)}`,
    }),
);
export const StyleRepoCard = styled(Box)(({ theme: { spacing, palette } }) => ({
    boxShadow: `0 0 0 0.2px ${palette.text.primary}`,

    cursor: 'pointer',
    borderRadius: spacing(4),
    padding: `${spacing(2)} ${spacing(4)}`,
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
export const StyleRepoDescription = styled(Box)(
    ({ theme: { typography } }) => ({
        fontSize: typography.pxToRem(14),
    }),
);
export const StyleRepoMoreDetails = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        marginTop: spacing(4),
        padding: `0 ${spacing(10)}`,
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

        padding: `${spacing(4)} ${spacing(6)}`,
        maxWidth: '30%',
        maxHeight: '88vh',

        [breakpoints.down('lg')]: {
            maxWidth: '100%',
        },
    }),
);
export const StyleFollowersBox = styled(Box)(({ theme: { spacing } }) => ({
    minHeight: '42%',
    height: spacing(110),
    display: 'flex',
    flexDirection: 'column',

    marginBottom: spacing(3),
}));
export const StyleFollowingBox = styled(Box)(({ theme: { spacing } }) => ({
    minHeight: '42%',
    height: spacing(110),

    display: 'flex',
    flexDirection: 'column',
}));
export const StyleFollowHeading = styled(Box)(({ theme: { typography } }) => ({
    fontWeight: 700,
    fontSize: typography.pxToRem(20),
}));

export const StyleFollowersNameBox = styled(Box)(() => ({
    wordBreak: 'break-word',
}));

export const StyleListBox = styled(Box)(() => ({
    overflowY: 'auto',
    overflowX: 'hidden',
}));

export const StyleListItemBox = styled(ListItem)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        gap: spacing(20),
        borderBottom: `1px solid ${palette.background.paper}`,
        // width: spacing(70),
    }),
);

export const StyleListLeftPart = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));

export const StyleListButton = styled(Button)(({ theme: { palette } }) => ({
    textTransform: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    color: palette.secondary.dark,
}));

export const StyleNotDataText = styled(Box)(({ theme: { palette } }) => ({
    color: palette.text.secondary,
}));

export const StyleCardLink = styled('a')(() => ({
    textDecoration: 'none',
    color: 'initial',
}));

export const StyleGitHubLink = styled('a')(
    ({ theme: { palette, spacing } }) => ({
        textDecoration: 'none',
        background: palette.secondary.dark,
        color: palette.secondary.main,
        display: 'flex',
        justifyContent: 'center',
        padding: `${spacing(2)} ${spacing(6)}`,
        gap: spacing(2),

        '&:hover': {
            opacity: 0.5,
        },
    }),
);
