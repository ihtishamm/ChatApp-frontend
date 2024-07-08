
import axios from '@/Actions/axois';
import { useAuth } from '@/context/AuthProvider';
import { AuthState } from '@/Types';

const useRefreshToken = () => {
    const { token } = useAuth();

    const refresh = async ():Promise<string> => {
        const response = await axios.get('/user/refreshToken', {
            withCredentials: true
        });
        ((prev: AuthState): AuthState => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;