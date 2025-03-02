'use client'

import React, { useState, useEffect } from 'react';

interface Props {
    className?: string;
    onSelect?: (address: string) => void;
}

export const AddressInput: React.FC<Props> = ({ className, onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=UA&accept-language=uk`;
            try {
                const response = await fetch(url, {
                    headers: { "User-Agent": "MyApp/1.0 (contact@example.com)" }
                });
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error('Error fetching address suggestions:', error);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (address: string) => {
        setQuery(address);
        setShowSuggestions(false);
        if (onSelect) onSelect(address);
    };

    return (
        <div className={className} style={{ position: 'relative' }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введіть адресу..."
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    width: '100%',
                    background: 'white',
                    border: '1px solid #ccc',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000
                }}>
                    {suggestions.map((sugg, index) => (
                        <li key={index} style={{ padding: '8px', cursor: 'pointer' }}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSelect(sugg.display_name)}>
                            {sugg.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
