"use client";
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const SidebarSection = ({ title, items, selected, onChange }) => {
    return (
        <div className="mb-6">
            <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {title}
            </div>

            <div className="space-y-2 pl-1">
                {items.map((item, idx) => {
                    const id = `${title}-${idx}`;
                    const isChecked = selected.includes(item.value);

                    return (
                        <label
                            key={id}
                            htmlFor={id}
                            className="flex items-center gap-3 cursor-pointer text-sm text-gray-700 hover:text-gray-900 select-none"
                        >
                            <input
                                id={id}
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => onChange(item.value)}
                                className="w-5 h-5 rounded-md border-gray-300 checked:bg-green-600 checked:border-green-600 transition duration-200 focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
                            />
                            {item.label}
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

const ShopFilter = ({ onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const toggleFilter = (value) => {
        const updated = selectedFilters.includes(value)
            ? selectedFilters.filter((f) => f !== value)
            : [...selectedFilters, value];

        setSelectedFilters(updated);

        if (onFilterChange) {
            onFilterChange(updated);
        }
    };

    const sections = [
        {
            title: "Caisson de cuisine",
            items: [
                { label: "Caisson Bas", value: "caisson-bas" },
                { label: "Caisson Haut", value: "caisson-haut" },
                { label: "Caisson Colonne", value: "caisson-colonne" },
            ],
        },
        {
            title: "Caisson Hydrofuge",
            items: [
                { label: "Caisson Hydrofuge Bas", value: "hydrofuge-bas" },
                { label: "Caisson Hydrofuge Haut", value: "hydrofuge-haut" },
                { label: "Caisson Hydrofuge Colonne", value: "hydrofuge-colonne" },
            ],
        },
        {
            title: "Façade",
            items: [
                { label: "AstiPRO", value: "astipro" },
                { label: "AstiMP", value: "astimp" },
                { label: "Façade Laca", value: "facade-laca" },
                { label: "Polilaminado", value: "polilaminado" },
                { label: "LEO 18", value: "facade-leo-18-mm" },
                { label: "Intermate 22", value: "intermate-22" },
                { label: "Intermate 18", value: "intermate" },
                { label: "Intermate 16", value: "intermate-16" },
                { label: "Lacado+", value: "lacado" },
            ],
        },
        {
            title: "Parquets",
            items: [
                { label: "Classe 31/AC3", value: "parquettes-classe-31ac3" },
                { label: "Classe 32/AC4", value: "parquettes-classe-32ac4" },
                { label: "Classe 33/AC5", value: "parquettes-classe-33ac5" },
            ],
        },
        {
            title: "Accessoires de cuisine",
            items: [
                { label: "Poignées", value: "poignees" },
                { label: "Caisson", value: "racrocheurs" },
                { label: "Tiroir", value: "tiroir" },
                { label: "Charnières", value: "charneir" },
                { label: "Placard", value: "placard" },
                { label: "Ecological", value: "ecological" },
                { label: "Protection", value: "protection" },
                { label: "Plan de travail", value: "plan-de-travail" },
                { label: "Egoutoire", value: "egoutoire" },
            ],
        },
    ];

    return (
        <aside className="w-1/4 hidden md:block">
            <div className="sticky top-10 h-[70vh] overflow-auto rounded-lg bg-white border p-4 ps-4">
                {sections.map((section, idx) => (
                    <SidebarSection
                        key={idx}
                        title={section.title}
                        items={section.items}
                        selected={selectedFilters}
                        onChange={toggleFilter}
                    />
                ))}

                <div className="mt-4 p-2 bg-gray-100 rounded">
                    <strong>Filtre sélectionné :</strong>
                    <div>{selectedFilters.join(", ") || "Aucun"}</div>
                </div>
            </div>
        </aside>
    );
};

export default ShopFilter;
