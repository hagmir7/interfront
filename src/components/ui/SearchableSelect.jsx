"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function SearchableSelect({
  options = [],
  label = "Select",
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    if (selectedOption) {
      setSearch(selectedOption.label);
    }
  }, [selectedOption]);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all focus-within:border-red-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-100">
          <input
            type="text"
            value={search}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            className="w-full bg-transparent text-sm outline-none"
          />

          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {open && (
          <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setSearch(option.label);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm transition hover:bg-red-50"
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}