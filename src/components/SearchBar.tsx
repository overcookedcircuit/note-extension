import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#888888]" strokeWidth={1.8} />
      <input
        aria-label="Search notes"
        className="h-10 w-full rounded-[11px] border border-transparent bg-[#F1F1EE] pl-9 pr-9 text-[13px] text-[#242424] outline-none transition-[background-color,border-color,box-shadow] duration-150 placeholder:text-[#92928E] focus:border-[#F5B942]/70 focus:bg-white focus:shadow-[0_0_0_3px_rgba(245,185,66,0.12)] dark:bg-[#222222] dark:text-[#F5F5F5] dark:placeholder:text-[#777] dark:focus:border-[#F5B942]/60 dark:focus:bg-[#252525]"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search your notes..."
        type="search"
        value={value}
      />
      {value ? (
        <button
          aria-label="Clear search"
          className="icon-button absolute right-1.5 top-1/2 size-7 -translate-y-1/2 text-[#888888] hover:bg-[#E5E5E1] hover:text-[#242424] dark:hover:bg-[#333333] dark:hover:text-[#F5F5F5]"
          onClick={() => onChange('')}
          type="button"
        >
          <X aria-hidden="true" className="size-3.5" strokeWidth={2} />
        </button>
      ) : null}
    </div>
  )
}
