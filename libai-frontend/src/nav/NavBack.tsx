import React, { useEffect, useState } from 'react';
import { useLocationHistory } from './HistoryProvider';

const BackButton = () => {
    const history = useLocationHistory();
    const [histBtn, setHistBtn] = useState<string>('')

    useEffect(() => {
        let histStr: string = history.slice(-2, -1).toString(); // Get the second last item in history
        if (histStr === '/') {
            histStr = 'home'
        }

        const preStr: string = '← go back to';
        const backText: string = `${preStr} ${histStr}`;

        setHistBtn(backText);
    }, [history]);

    return (
        <>
            {history.length >= 2 &&
                <button id='nav-top-back-btn' onClick={() => window.history.back()}>
                    {histBtn}
                </button>
            }
        </>
    );
}

export default BackButton;
