import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseCompletion } from '../../api';
import { useAuthContext } from '../../AuthContext';

const CompletionPage = () => {
    const { completionId } = useParams<{ completionId: string }>();
    const [completion, setCompletion] = useState<BaseCompletion|null>(null);
    const { user } = useAuthContext();

    useEffect(() => {
        apios.get(`/completion/${completionId}`)
            .then(response => {
                setCompletion(response.data); // stringify the response to show it as JSON
            })
            .catch(error => {
                console.error(error);
            });
    }, [user]);

    if (!completion) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Completion: {completionId}</h1>
            <pre>{JSON.stringify(completion)}</pre>  // show the JSON data here
        </div>
    );
}

export default CompletionPage;
