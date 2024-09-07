import {COUNTRIES, Country} from "../lib/countries";
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";

interface CountrySelectorProps {
    id: string;
    open: boolean;
    disabled?: boolean;
    onToggle: () => void;
    onChange: (value: string) => void;
    selectedValue: Country;
}

export default function CountrySelector({
                                            id,
                                            open,
                                            disabled = false,
                                            onToggle,
                                            onChange,
                                            selectedValue,
                                        }: CountrySelectorProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node) && open) {
                onToggle();
                setQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, open, onToggle]);

    const [query, setQuery] = useState<string>("");

    const handleClearSearch = () => {
        setQuery("");
        inputRef.current?.focus();
    };

    return (
        <div ref={ref}>
            <div className="mt-1 relative">
                <button
                    type="button"
                    className={`
            ${disabled ? "bg-muted" : "bg-background"}
            relative w-full border border-input rounded-md shadow-sm pl-3 pr-10 py-2 
            text-foreground cursor-default focus:outline-none focus:ring-1 focus:ring-primary 
            focus:border-primary sm:text-sm
          `}
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={onToggle}
                    disabled={disabled}
                >
          <span className="truncate flex items-center">
            <img
                alt={`${selectedValue.value}`}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
                className={"inline mr-2 h-4 rounded-sm"}
            />
              {selectedValue.title}
          </span>
                    <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
                            disabled ? "hidden" : ""
                        }`}
                    >
            <svg
                className="h-5 w-5 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
              <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
              />
            </svg>
          </span>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.1}}
                            className="absolute z-10 mt-1 w-full bg-popover text-popover-foreground shadow-lg max-h-80 rounded-md ring-1 ring-border focus:outline-none sm:text-sm"
                            tabIndex={-1}
                            role="listbox"
                            aria-labelledby="listbox-label"
                            aria-activedescendant="listbox-option-3"
                        >
                            <div className="sticky top-0 z-10 bg-popover">
                                <li className="cursor-default select-none relative py-2 px-3">
                                    <div className="relative">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            name="search"
                                            autoComplete="off"
                                            className="
                        w-full sm:text-sm bg-background text-foreground
                        border border-input rounded-md shadow-sm
                        pl-3 pr-10 py-2
                        focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary
                      "
                                            placeholder="Search a country"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                        {query && (
                                            <button
                                                type="button"
                                                onClick={handleClearSearch}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </li>
                                <hr className="border-border"/>
                            </div>

                            <div
                                className={
                                    "max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-muted/50 hover:scrollbar-thumb-muted-foreground/50"
                                }
                            >
                                {COUNTRIES.filter((country) =>
                                    country.title.toLowerCase().startsWith(query.toLowerCase())
                                ).length === 0 ? (
                                    <li className="cursor-default select-none relative py-2 pl-3 pr-9 text-muted-foreground">
                                        No countries found
                                    </li>
                                ) : (
                                    COUNTRIES.filter((country) =>
                                        country.title.toLowerCase().startsWith(query.toLowerCase())
                                    ).map((value, index) => {
                                        return (
                                            <li
                                                key={`${id}-${index}`}
                                                className="cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-accent hover:text-accent-foreground transition"
                                                id="listbox-option-0"
                                                role="option"
                                                onClick={() => {
                                                    onChange(value.value);
                                                    setQuery("");
                                                    onToggle();
                                                }}
                                            >
                                                <img
                                                    alt={`${value.value}`}
                                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                                                    className={"inline mr-2 h-4 rounded-sm"}
                                                />

                                                <span className="truncate">
                          {value.title}
                        </span>
                                                {value.value === selectedValue.value ? (
                                                    <span
                                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                              <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                              />
                            </svg>
                          </span>
                                                ) : null}
                                            </li>
                                        );
                                    })
                                )}
                            </div>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}