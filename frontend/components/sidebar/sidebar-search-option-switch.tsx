import React from 'react';
import * as Switch from '@radix-ui/react-switch';

interface SearchOptionSwitchProps {
  onCheckedChange: (checked: boolean) => void;
  isSearchMode: boolean;
}

export function SearchOptionSwitch({ onCheckedChange, isSearchMode }: SearchOptionSwitchProps) {
  return (
    <form>
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex-grow mr-4">
          <label
            className="text-foreground text-sm leading-none"
            htmlFor="upload-mode"
          >
            {isSearchMode ? "Upload document manually" : "Search Options"}
          </label>
        </div>
        <Switch.Root
          className="w-[42px] h-[25px] bg-gray-600 dark:bg-gray-400 rounded-full relative shadow-sm focus:outline-none cursor-default transition-colors duration-200 ease-in-out data-[state=checked]:bg-primary"
          id="upload-mode"
          onCheckedChange={onCheckedChange}
          checked={isSearchMode}
        >
          <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </div>
    </form>
  );
}