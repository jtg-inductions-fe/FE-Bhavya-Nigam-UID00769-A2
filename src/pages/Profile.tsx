import { useSelector } from 'react-redux';

import { RootState } from '@store/store';

export const Profile = () => {
    const user = useSelector((state: RootState) => state.user.user);

    if (!user) {
        return <div>Please Login First</div>;
    }

    return (
        <div>
            Login successful
            <div>{user.login}</div>
        </div>
    );
};
