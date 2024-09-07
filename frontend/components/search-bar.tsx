import React, { useState, FormEvent } from 'react';
import { COUNTRIES, Country } from "@/lib/countries";
import { ApiEndpoint } from '@/app/enums';
import { TextInputWithClearAndVoice } from '@/components/ui/text-input-with-clear-and-voice';

type SearchBarProps = {
    setResults: (value: any) => void;
    country: string;
    countrySpecificSearch: boolean;
    searchType: "strict" | "medium" | "open";
    fileType: string | null;
    results: number;
    before: number | null;
    after: number | null;
    site: string | null;
};

const SearchBar = ({
    setResults,
    country,
    countrySpecificSearch,
    searchType,
    fileType,
    results,
    before,
    after,
    site
}: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const selectedCountry = COUNTRIES.find((option: Country) => option.value === country)?.title ?? '';

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Searching with parameters:', {
            query,
            country: selectedCountry,
            countrySpecificSearch,
            searchType,
            fileType,
            results,
            before,
            after,
            site
        });

        try {
            const response = await fetch(ApiEndpoint.SEARCH_GOOGLE, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    country: selectedCountry,
                    country_specific_search: countrySpecificSearch,
                    search_type: searchType,
                    file_type: fileType,
                    results,
                    before,
                    after,
                    site
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
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