import React from 'react';

interface EllipsisTextProps {
    text: string
    //children: React.ReactNode;
}

const EllipsisText = ({ text }: EllipsisTextProps) => {
    return (
        <div style={{
            maxWidth: '100vw',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }}>
            {text}
        </div>
    );
};



export default EllipsisText;
