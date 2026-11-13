"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { useCart } from "@/context/CartContext"
import Alert from "./ui/Alert"
import AddToCartSketelon from "./ui/AddToCartSketelon"
import { AnimatedAlert } from "./ui/AnimatedAlert"

const STORAGE_URL =
    process.env.NEXT_PUBLIC_STORAGE_URL ?? "https://app.intercocina.com/storage"

/* ----------------------------- helpers ----------------------------- */

// Compares ids/values safely even if one side is a string and the other a number
const same = (a, b) => a != null && b != null && String(a) === String(b)

const unique = (items, key) => [
    ...new Set(items.map((item) => item?.[key]).filter((v) => v != null)),
]

/* ------------------------- small components ------------------------- */

function OptionGroup({ label, options, value, onChange }) {
    return (
        <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {options.map((option) => {
                    const isSelected = same(value, option)
                    return (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => onChange(option)}
                            className={`py-2 px-3 rounded-lg border-2 transition-colors text-sm font-medium ${isSelected
                                    ? "border-red-600 bg-red-50 text-red-600"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-red-300"
                                }`}
                        >
                            {option}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function ColorPicker({ colors, value, onChange }) {
    const selected = colors.find((c) => same(c.id, value))

    return (
        <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
                Couleurs <strong className="ml-1">{selected?.name}</strong>
            </label>
            <div className="flex flex-wrap gap-2">
                {colors.map((color) => {
                    const isSelected = same(color.id, value)
                    return (
                        <button
                            key={color.id}
                            type="button"
                            onClick={() => onChange(color.id)}
                            title={color.name}
                            aria-label={`Select ${color.name} color`}
                            aria-pressed={isSelected}
                            style={{ backgroundImage: `url(${STORAGE_URL}/${color.image})` }}
                            className={`w-10 h-10 rounded-full border-2 shadow-sm bg-cover bg-center transition-all duration-200 ${isSelected
                                    ? "border-gray-900 ring-4 ring-gray-300 scale-105"
                                    : "border-gray-100 hover:border-gray-500 hover:scale-105"
                                }`}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function QuantityStepper({ value, onChange }) {
    const buttonClass =
        "px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Quantité</label>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className={buttonClass}
                    onClick={() => onChange(Math.max(1, value - 1))}
                    aria-label="Diminuer la quantité"
                >
                    −
                </button>
                <span className="w-12 text-center font-semibold text-lg">{value}</span>
                <button
                    type="button"
                    className={buttonClass}
                    onClick={() => onChange(value + 1)}
                    aria-label="Augmenter la quantité"
                >
                    +
                </button>
            </div>
        </div>
    )
}

/* ------------------------------ modal ------------------------------ */

export function AddToCartModal({ open, onOpenChange, product }) {
    const { addToCart } = useCart()

    // Data from the API
    const [attributes, setAttributes] = useState([])
    const [colors, setColors] = useState([])
    const [dimensions, setDimensions] = useState([])

    // User selections
    const [selectedAttribute, setSelectedAttribute] = useState(null)
    const [selectedHeight, setSelectedHeight] = useState(null)
    const [selectedWidth, setSelectedWidth] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [quantity, setQuantity] = useState(1)

    // UI state
    const [isLoading, setIsLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [error, setError] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    // Cache of color images so each color is requested only once
    const colorImageCache = useRef(new Map())

    /* ----------------------- load product options ----------------------- */

    useEffect(() => {
        if (!open || !product?.slug) return

        let cancelled = false

        async function loadOptions() {
            setIsLoading(true)
            setError("")
            setSelectedAttribute(null)
            setSelectedHeight(null)
            setSelectedWidth(null)
            setSelectedColor(null)
            setQuantity(1)

            try {
                const { data } = await api.get(`products/dimensions/${product.slug}`)
                if (cancelled) return

                setAttributes(data.attributes ?? [])
                setColors(data.colors ?? [])
                setDimensions(Array.isArray(data.dimensions) ? data.dimensions : [])
            } catch (err) {
                console.error(err)
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        loadOptions()
        return () => {
            cancelled = true
        }
    }, [open, product?.slug])

    /* ------------------------- derived values ------------------------- */

    const hasAttributes = attributes.length > 0

    // Dimensions available for the current attribute choice
    const visibleDimensions = useMemo(() => {
        if (!hasAttributes) return dimensions
        if (!selectedAttribute) return []
        return dimensions.filter((d) => same(d.attribute_id, selectedAttribute.id))
    }, [dimensions, hasAttributes, selectedAttribute])

    const heights = useMemo(() => unique(visibleDimensions, "height"), [visibleDimensions])
    const widths = useMemo(() => unique(visibleDimensions, "width"), [visibleDimensions])

    // The dimension matching the current selections (null until something is picked)
    const dimension = useMemo(() => {
        if (selectedHeight === null && selectedWidth === null && selectedColor === null) {
            return null
        }

        return (
            visibleDimensions.find(
                (d) =>
                    (selectedWidth === null || same(d.width, selectedWidth)) &&
                    (selectedHeight === null || same(d.height, selectedHeight)) &&
                    (selectedColor === null || same(d.color_id, selectedColor))
            ) ?? null
        )
    }, [visibleDimensions, selectedWidth, selectedHeight, selectedColor])

    const price = dimension?.price ?? product.price ?? product.price_format

    /* ---------------------------- handlers ---------------------------- */

    function handleAttributeChange(e) {
        const attribute = attributes.find((a) => same(a.id, e.target.value)) ?? null

        setSelectedAttribute(attribute)
        // Dependent selections are no longer valid
        setSelectedHeight(null)
        setSelectedWidth(null)
        setSelectedColor(null)
        setError("")
    }

    function validate() {
        if (hasAttributes && !selectedAttribute) return "Obligatoire de sélectionner le type de façade"
        if (colors.length > 0 && selectedColor === null) return "Obligatoire de sélectionner une couleur"
        if (heights.length > 0 && selectedHeight === null) return "Obligatoire de sélectionner la hauteur"
        if (widths.length > 0 && selectedWidth === null) return "Obligatoire de sélectionner la largeur"
        return ""
    }

    // Returns the product image that has this color_id (cached), or null
    async function fetchColorImage(colorId) {
        const cacheKey = `${product.id}-${colorId}`
        const cache = colorImageCache.current
        if (cache.has(cacheKey)) return cache.get(cacheKey)

        try {
            const { data } = await api.get(`products/${product.id}/color-image/${colorId}`)
            const image = data?.image ?? null
            cache.set(cacheKey, image)
            return image
        } catch (err) {
            console.error("Color image request failed", err)
            return null
        }
    }

    async function handleAddToCart() {
        if (isAdding) return

        const validationError = validate()
        setError(validationError)
        if (validationError) return

        setIsAdding(true)

        try {
            // Color image if a color is selected, otherwise the first product image
            const colorImage = selectedColor !== null ? await fetchColorImage(selectedColor) : null
            const image = colorImage ?? product.image

            addToCart({
                quantity,
                id: `${product.name}-${product.id}-${selectedWidth ?? ""}-${selectedHeight ?? ""}-${selectedColor ?? ""}`,
                name: product.name,
                price,
                attributes: {
                    color: selectedColor ?? "",
                    color_name: colors.find((c) => same(c.id, selectedColor))?.name,
                    image,
                    height: selectedHeight ?? "",
                    width: selectedWidth ?? "",
                    dimension:
                        selectedHeight !== null && selectedWidth !== null
                            ? `${selectedHeight} * ${selectedWidth}`
                            : null,
                    slug: product.slug,
                    attribute: selectedAttribute?.name,
                    product_id: product.id,
                    dimension_id: dimension?.id ?? "",
                    special: false,
                    family_id: product.family_id,
                },
            })

            setShowAlert(true)

            // Reset the selections (the attribute choice is kept)
            setSelectedHeight(null)
            setSelectedWidth(null)
            setSelectedColor(null)
            setQuantity(1)
        } finally {
            setIsAdding(false)
        }
    }

    /* ------------------------------ render ------------------------------ */

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <Alert message={error} type="error" />

                {showAlert && (
                    <AnimatedAlert
                        type="success"
                        title="Produit ajouté au panier"
                        dismissible
                        autoClose={3000}
                        onDismiss={() => setShowAlert(false)}
                    />
                )}

                {isLoading ? (
                    <AddToCartSketelon />
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <p className="text-xl font-bold text-red-600">{price} MAD</p>

                                {hasAttributes && (
                                    <select
                                        id="attribute"
                                        name="attribute"
                                        value={selectedAttribute?.id ?? ""}
                                        onChange={handleAttributeChange}
                                        className="border rounded-md px-3 py-2 text-sm w-full mt-2"
                                    >
                                        <option value="" disabled>
                                            Type de Façade
                                        </option>
                                        {attributes.map((attr) => (
                                            <option key={attr.id} value={attr.id}>
                                                {attr.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {heights.length > 0 && (
                                <OptionGroup
                                    label="Hauteur"
                                    options={heights}
                                    value={selectedHeight}
                                    onChange={setSelectedHeight}
                                />
                            )}

                            {widths.length > 0 && (
                                <OptionGroup
                                    label="Largeur"
                                    options={widths}
                                    value={selectedWidth}
                                    onChange={setSelectedWidth}
                                />
                            )}

                            {colors.length > 0 && (
                                <ColorPicker
                                    colors={colors}
                                    value={selectedColor}
                                    onChange={setSelectedColor}
                                />
                            )}
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 flex items-end justify-between sm:justify-between">
                            <QuantityStepper value={quantity} onChange={setQuantity} />

                            <div className="flex gap-3">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {isAdding ? "Ajout..." : "Ajouter au panier"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    className="w-full sm:w-auto"
                                >
                                    Fermer
                                </Button>
                            </div>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}