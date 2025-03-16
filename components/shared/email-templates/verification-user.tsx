import React from 'react';

interface Props {
    code: string;
}

export const VerificationUser: React.FC<Props> = ({ code }) => (
    <div>
        <p>
            Код підтвердження: <h2>{code}</h2>
        </p>

        <p>
            <a href={`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/verify?code=${code}`}>Підтвердити реєстрацію</a>
        </p>
    </div>
);