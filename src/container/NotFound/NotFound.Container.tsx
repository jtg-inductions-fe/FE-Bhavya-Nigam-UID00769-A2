import { useNavigate } from 'react-router-dom';

import dummyNotFoundImg from '@assets/images/dummyNotFoundImg.webp';
import NotFoundTextImg from '@assets/images/NotFoundTextImg.webp';
import { HOME_PAGE_URL } from '@constant';

import {
    StyleButton,
    StyleContainer,
    StyleMainBox,
    StyleMessageBox,
} from './NotFound.Container.Style';

export const NotFoundContainer = () => {
    const navigate = useNavigate();

    const handleOpenHome = () => {
        void navigate(HOME_PAGE_URL);
    };
    return (
        <StyleMainBox>
            <StyleContainer>
                <StyleContainer>
                    <img src={NotFoundTextImg} alt="" />
                    <img src={dummyNotFoundImg} alt="" />
                </StyleContainer>
            </StyleContainer>
            <StyleMessageBox>
                Back to{' '}
                <StyleButton onClick={handleOpenHome} variant="contained">
                    {' '}
                    Home
                </StyleButton>{' '}
            </StyleMessageBox>
        </StyleMainBox>
    );
};
