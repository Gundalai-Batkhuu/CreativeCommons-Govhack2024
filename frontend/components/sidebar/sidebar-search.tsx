import React, { useState } from 'react'
import {ThemeToggle} from "@/components/theme-toggle";
import {useSidebar} from "@/lib/hooks/use-sidebar";
import {cn} from "@/lib/utils";
import { SearchOptionSwitch } from '@/components/sidebar/sidebar-search-option-switch'
import { SearchOptions, SearchOptionsProps } from '@/components/sidebar/search-options'
import { ManualDocumentUploader } from '@/components/sidebar/manual-document-uploader'

export function SidebarSearch({
                                  country, setCountry,
                                  countrySpecificSearch, setCountrySpecificSearch,
                                  searchType, setSearchType,
                                  fileType, setFileType,
                                  results, setResults,
                                  before, setBefore,
                                  after, setAfter,
                                  site, setSite, className, userId
                              }: SearchOptionsProps) {

    const {isSidebarOpen, isLoading} = useSidebar()
    const [isSearchMode, setIsSearchMode] = useState(true)

    const handleSwitchChange = (checked: boolean) => {
      setIsSearchMode(checked);
    }

    return (
      <div
        className={cn(
          className,
          'h-full flex-col dark:bg-zinc-950',
          isSidebarOpen && !isLoading ? 'translate-x-0' : '-translate-x-full',
          'transition-transform duration-300 ease-in-out'
        )}
      >
        <div className="flex flex-col h-full inset-y-0 border-r lg:w-[250px] xl:w-[300px] bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl overflow-hidden">
          <div className="w-full h-full overflow-y-auto">
            <div className="p-4">
              <SearchOptionSwitch onCheckedChange={handleSwitchChange} isSearchMode={isSearchMode}/>
            </div>

            {isSearchMode ? (
            <SearchOptions
              country={country} setCountry={setCountry}
              countrySpecificSearch={countrySpecificSearch} setCountrySpecificSearch={setCountrySpecificSearch}
              searchType={searchType} setSearchType={setSearchType}
              fileType={fileType} setFileType={setFileType}
              results={results} setResults={setResults}
              before={before} setBefore={setBefore}
              after={after} setAfter={setAfter}
              site={site} setSite={setSite} userId={userId}
            />
          ) : (
            <ManualDocumentUploader userId={userId} />
          )}
          </div>
          <div className="p-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    )
}