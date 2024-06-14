import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig} from 'axios';



const useFetch = <T>( config: AxiosRequestConfig, loadOnStart : boolean = true): [boolean, T | undefined , string, () => void] => {

    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const fetchFunction = async () => {
        try {
            setIsLoading(true);

            const response = await axios(config);

            setData(response.data);

            setIsLoading(false);
            
        } catch (err) {
            console.log(err);
            if(axios.isAxiosError(err)){
                setError(err.response?.data?.message);
            }else if(err instanceof Error){
                setError(err.message);
            }else{
                setError('');
            }
            setIsLoading(false);
        }

        
    };
    
    useEffect(() => {
        if(loadOnStart) fetchFunction();
    }, []);

    const request = () => {
        fetchFunction();
    }
        
    return [isLoading, data, error, request];
};

export default useFetch;