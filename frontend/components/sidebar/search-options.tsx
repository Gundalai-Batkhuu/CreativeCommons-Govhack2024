import CountrySelector from '@/components/country-selector'
import React from 'react'
import { COUNTRIES, Country } from '@/lib/countries'

export interface SearchOptionsProps extends React.ComponentProps<'div'> {
    country: string;
    setCountry: (country: string) => void;
    countrySpecificSearch: boolean;
    setCountrySpecificSearch: (value: boolean) => void;
    searchType: "strict" | "medium" | "open";
    setSearchType: (value: "strict" | "medium" | "open") => void;
    fileType: "pdf" | "docx" | null;
    setFileType: (value: "pdf" | "docx" | null) => void;
    results: number;
    setResults: (value: number) => void;
    before: number | null;
    setBefore: (value: number | null) => void;
    after: number | null;
    setAfter: (value: number | null) => void;
    site: string | null;
    setSite: (value: string | null) => void;
    userId: string;
}

export function SearchOptions({
                                  country, setCountry,
                                  countrySpecificSearch, setCountrySpecificSearch,
                                  searchType, setSearchType,
                                  fileType, setFileType,
                                  results, setResults,
                                  before, setBefore,
                                  after, setAfter,
                                  site, setSite, className
                              }: SearchOptionsProps) {

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const selectedCountry =
    COUNTRIES.find((option: Country) => option.value === country) ||
    COUNTRIES[0]

  return (
    <div className="w-full max-w-md p-4 space-y-5">
      <div className="mb-6">
        <label className="block text-xs font-medium mb-1">
          Country specific search
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={countrySpecificSearch}
            onChange={e => setCountrySpecificSearch(e.target.checked)}
            className="form-checkbox size-4 text-primary border-input"
          />
        </div>
      </div>

      <div className="mb-10">
        <label
          className="block text-xs font-medium mb-1"
          htmlFor="country-selector"
        >
          Select a country
        </label>
        <CountrySelector
          id="country-selector"
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={setCountry}
          selectedValue={selectedCountry}
        />
      </div>

      <div className="mb-10">
        <label className="block text-xs font-medium mb-1" htmlFor="search-type">
          Search type
        </label>
        <select
          id="search-type"
          value={searchType}
          onChange={e =>
            setSearchType(e.target.value as 'strict' | 'medium' | 'open')
          }
          className="w-full bg-background text-foreground border border-input rounded-md shadow-sm pl-2 pr-8 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="strict">Strict</option>
          <option value="medium">Medium</option>
          <option value="open">Open</option>
        </select>
      </div>

      <div className="mb-10">
        <label className="block text-xs font-medium mb-1" htmlFor="file-type">
          File type
        </label>
        <select
          id="file-type"
          value={fileType || ''}
          onChange={e => {
            const value = e.target.value
            setFileType(value === '' ? null : (value as 'pdf' | 'docx'))
          }}
          className="w-full bg-background text-foreground border border-input rounded-md shadow-sm pl-2 pr-8 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="">Any</option>
          <option value="pdf">PDF</option>
          <option value="docx">DOCX</option>
        </select>
      </div>

      <div className="mb-10">
        <label className="block text-xs font-medium mb-1" htmlFor="results">
          Number of search results
        </label>
        <input
          id="results"
          type="number"
          value={results}
          onChange={e => setResults(Number(e.target.value))}
          min={1}
          max={16}
          className="w-full bg-background text-foreground border border-input rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="mb-10">
        <label className="block text-xs font-medium mb-1" htmlFor="before">
          Before year
        </label>
        <input
          id="before"
          type="number"
          value={before || ''}
          onChange={e =>
            setBefore(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full bg-background text-foreground border border-input rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="mb-10">
        <label className="block text-xs font-medium mb-1" htmlFor="after">
          After year
        </label>
        <input
          id="after"
          type="number"
          value={after || ''}
          onChange={e =>
            setAfter(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full bg-background text-foreground border border-input rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="mb-10">
        <label className="block text-xs font-medium mb-1" htmlFor="site">
          Site specific search
        </label>
        <input
          id="site"
          type="text"
          value={site || ''}
          onChange={e => setSite(e.target.value || null)}
          className="w-full bg-background text-foreground border border-input rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>
    </div>
  )
}
