import React, { useState, FormEvent } from 'react';
import { TextInputWithClearAndVoice } from '@/components/ui/text-input-with-clear-and-voice';
import { documentService } from '@/lib/services/document-service';
import { SearchQuery } from '@/lib/types';

type SearchBarProps = {
    setResults: (value: any) => void;
};

const SearchBar = ({ setResults }: SearchBarProps) => {
    const [query, setQuery] = useState("");

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchQuery: SearchQuery = { query };

        try {
            const data = await documentService.searchDocuments(searchQuery);
            console.log('Search results:', data);
            setResults(data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-stretch">
            <div className="flex-grow">
                <TextInputWithClearAndVoice
                    placeholder="Type your keywords here ..."
                    onChange={setQuery}
                />
            </div>
            <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 rounded-r-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 transition duration-150 ease-in-out flex items-center"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;