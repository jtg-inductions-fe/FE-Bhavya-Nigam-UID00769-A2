import { useSelector } from 'react-redux';
<<<<<<< HEAD

import { RootState } from '@store/store';
=======
import { RootState } from 'store/store';
>>>>>>> 22dcdef ([BN_A2_01]: Login Page)

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
