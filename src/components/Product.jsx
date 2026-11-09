"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { LoaderCircle, ShoppingCart, Star, TriangleAlert } from "lucide-react"
import DimentionLoading from "./ui/dimention-loading"
import ColorDisclaimer from "./ColorDisclaimer"
import { useCart } from "@/context/CartContext"
import { api } from "@/lib/api"

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL ?? "https://app.intercocina.com/storage"

const INPUT_CLASS =
  "text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 w-full border-2"

/* ----------------------------- helpers ----------------------------- */

const toNumber = (value) => {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : null
}

// Safe id comparison (string vs number)
const same = (a, b) => a != null && b != null && String(a) === String(b)

const uniqueSorted = (items, key) =>
  [...new Set(items.map((item) => item[key]).filter((v) => v != null))].sort((a, b) => a - b)

const normalizeDimensions = (dims) =>
  dims.map((d) => ({
    ...d,
    width: toNumber(d.width),
    height: toNumber(d.height),
    color_id: toNumber(d.color_id),
    attribute_id: toNumber(d.attribute_id),
  }))

/* ------------------------- small components ------------------------- */

function ErrorMessage({ message, className = "" }) {
  if (!message) return null
  return (
    <div className={`my-2 text-red-700 font-semibold flex items-center gap-2 text-left ${className}`}>
      <TriangleAlert />
      {message}
    </div>
  )
}

function OptionList({ label, unit, name, options, value, onChange, className = "" }) {
  return (
    <div className={`text-left ${className}`}>
      <div className="font-bold">
        {label} {unit ? `(${unit})` : ""}
      </div>
      <ul className="flex flex-wrap w-full gap-3">
        {options.map((option) => (
          <li key={option}>
            <input
              type="radio"
              id={`${name}-${option}`}
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="hidden peer"
            />
            <label
              htmlFor={`${name}-${option}`}
              className="border-2 cursor-pointer inline-flex items-center p-1 px-2 text-gray-500 bg-white border-gray-200 rounded-lg peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <span className="text-md font-semibold">{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

function QuantityInput({ value, onChange }) {
  const buttonClass =
    "text-3xl py-1 md:py-2 px-2 md:px-3 w-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300 cursor-pointer"

  return (
    <div className="flex items-center justify-center border border-gray-400 rounded-full">
      <button
        type="button"
        aria-label="Diminuer la quantité"
        onClick={() => onChange(Math.max(1, value - 1))}
        className={`${buttonClass} border-r border-gray-400 rounded-l-full`}
      >
        -
      </button>
      <input
        type="number"
        min={1}
        value={value}
        aria-label="Quantité"
        onChange={(e) => onChange(Math.max(1, parseInt(e.target.value, 10) || 1))}
        className="font-semibold text-gray-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent text-center hover:text-red-600 outline-0"
      />
      <button
        type="button"
        aria-label="Augmenter la quantité"
        onClick={() => onChange(value + 1)}
        className={`${buttonClass} border-l border-gray-400 rounded-r-full`}
      >
        +
      </button>
    </div>
  )
}

/* ----------------------------- component ----------------------------- */

const Product = ({ product, onColorChange, initialCode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { addToCart } = useCart()

  // API data
  const [colors, setColors] = useState([])
  const [attributes, setAttributes] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [baseCode, setBaseCode] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Selections (everything else is derived from these)
  const [attribute, setAttribute] = useState(null)
  const [color, setColor] = useState(null)
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [special, setSpecial] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // UI
  const [spinner, setSpinner] = useState(false)
  const [colorError, setColorError] = useState(null)
  const [dimensionError, setDimensionError] = useState(null)

  const colorImageCache = useRef(new Map())

  /* ----------------------------- load data ----------------------------- */

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const { data } = await api.get(`products/dimensions/${product.slug}`)
        if (cancelled) return

        const allDimensions = normalizeDimensions(Array.isArray(data.dimensions) ? data.dimensions : [])
        const allAttributes = data.attributes ?? []

        setColors(data.colors ?? [])
        setAttributes(allAttributes)
        setDimensions(allDimensions)
        setBaseCode(data.data?.code ?? null)

        // Preselect from ?code=... otherwise the first attribute
        const matched = initialCode
          ? allDimensions.find((d) => same(d.code, initialCode))
          : null

        if (matched) {
          setHeight(matched.height)
          setWidth(matched.width)
          setAttribute(allAttributes.find((a) => same(a.id, matched.attribute_id)) ?? null)
          if (matched.color_id != null) {
            setColor(matched.color_id)
            onColorChange?.(matched.color_id)
          }
        } else if (allAttributes.length > 0) {
          setAttribute(allAttributes[0])
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug])

  /* --------------------------- derived values --------------------------- */

  const visibleDimensions = useMemo(() => {
    if (attributes.length === 0) return dimensions
    if (!attribute) return []
    return dimensions.filter((d) => same(d.attribute_id, attribute.id))
  }, [dimensions, attributes, attribute])

  const heights = useMemo(() => uniqueSorted(visibleDimensions, "height"), [visibleDimensions])
  const widths = useMemo(() => uniqueSorted(visibleDimensions, "width"), [visibleDimensions])

  // The dimension matching the current selections
  const dimension = useMemo(() => {
    if (visibleDimensions.length === 0) return null

    // Filter by color only when dimensions actually carry a color
    const filterByColor = color != null && visibleDimensions.some((d) => d.color_id != null)
    const pool = filterByColor
      ? visibleDimensions.filter((d) => same(d.color_id, color))
      : visibleDimensions

    // Special size: smallest dimension that is large enough
    if (special) {
      if (!height || !width) return null
      return pool
        .filter((d) => d.width >= width && d.height >= height)
        .reduce(
          (best, cur) =>
            !best || cur.width * cur.height < best.width * best.height ? cur : best,
          null
        )
    }

    if (height == null && width == null && color == null) return null

    return (
      pool.find(
        (d) =>
          (height == null || d.height === height) &&
          (width == null || d.width === width)
      ) ?? null
    )
  }, [visibleDimensions, special, height, width, color])

  const isUnavailable =
    dimensions.length > 0 && height != null && width != null && !dimension

  const availabilityMessage = isUnavailable
    ? `La dimension ${height} x ${width} n'est pas disponible`
    : null

  const price = isUnavailable ? null : dimension?.price ?? product.price_format
  const hasPrice = parseFloat(price) > 0
  const code = dimension?.code ?? (dimensions.length === 0 ? baseCode : null)

  /* --------------------------------- effects --------------------------------- */

  // Keep ?code= in the URL in sync (replace: no history spam)
  useEffect(() => {
    if (isLoading) return
    router.replace(code ? `${pathname}?code=${code}` : pathname, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, isLoading])

  // Clear validation messages when the selection changes
  useEffect(() => {
    setColorError(null)
    setDimensionError(null)
  }, [attribute, color, height, width, special])

  /* -------------------------------- handlers -------------------------------- */

  function handleAttributeChange(e) {
    setAttribute(attributes.find((a) => same(a.id, e.target.value)) ?? null)
    setHeight(null)
    setWidth(null)
  }

  function handleColorChange(colorId) {
    setColor(colorId)
    onColorChange?.(colorId)
  }

  function handleSpecialChange(checked) {
    setSpecial(checked)
    setHeight(null)
    setWidth(null)
  }

  function handleSizeInput(setter) {
    return (e) => {
      const value = toNumber(e.target.value)
      setter(value !== null && value > 0 ? value : null)
    }
  }

  function validate() {
    let nextColorError = null
    let nextDimensionError = null

    if (colors.length > 0 && color == null) {
      nextColorError = "Obligatoire de sélectionner une couleur"
    }

    if (attributes.length > 0 && !attribute) {
      nextDimensionError = "Obligatoire de sélectionner le type de façade"
    } else if (special) {
      if (!height || !width) nextDimensionError = "Largeur et hauteur obligatoires"
    } else if (heights.length > 0 && height == null) {
      nextDimensionError = "Obligatoire de sélectionner la hauteur"
    } else if (widths.length > 0 && width == null) {
      nextDimensionError = "Obligatoire de sélectionner la largeur"
    } else if (dimensions.length > 0 && !dimension) {
      nextDimensionError = "Obligatoire de sélectionner la dimension"
    }

    setColorError(nextColorError)
    setDimensionError(nextDimensionError)
    return !nextColorError && !nextDimensionError
  }

  // Product image whose color_id = colorId (cached), or null
  async function fetchColorImage(colorId) {
    const key = `${product.id}-${colorId}`
    const cache = colorImageCache.current
    if (cache.has(key)) return cache.get(key)

    try {
      const { data } = await api.get(`products/${product.id}/color-image/${colorId}`)
      const image = data?.image ?? null
      cache.set(key, image)
      return image
    } catch (error) {
      console.error("Color image request failed", error)
      return null
    }
  }

  async function handleAddToCart() {
    if (spinner || !validate()) return

    setSpinner(true)

    try {
      const colorImage = color != null ? await fetchColorImage(color) : null
      const image = colorImage ?? product.images?.[0]?.image

      addToCart({
        id: [
          product.slug,
          width ?? "",
          height ?? "",
          dimension?.id ?? "",
          color ?? "",
          attribute?.id ?? "",
          special ? "special" : "",
        ].join("-"),
        name: product.name,
        price,
        quantity,
        attributes: {
          family_id: product.family_id,
          color: color ?? null,
          color_name: colors.find((c) => same(c.id, color))?.name ?? null,
          image,
          height: height ?? null,
          width: width ?? null,
          dimension: height && width ? `${height} * ${width}` : null,
          slug: product.slug,
          attribute: attributes.length > 0 ? attribute?.name : null,
          product_id: product.id,
          dimension_id: dimension?.id ?? null,
          special,
        },
      })
    } finally {
      setSpinner(false)
    }
  }

  /* ---------------------------------- render ---------------------------------- */

  return (
    <div>
      {isLoading ? (
        <DimentionLoading />
      ) : (
        <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-5 gap-y-3 flex-wrap">
          {hasPrice && (
            <div className="font-manrope font-semibold sm:text-2xl text-xl leading-9 text-gray-900">
              <span>{price}</span> MAD
            </div>
          )}

          <svg
            className="mx-5 hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="36"
            viewBox="0 0 2 36"
            fill="none"
          >
            <path d="M1 0V36" stroke="#E5E7EB" />
          </svg>

          <button
            type="button"
            className="hidden md:flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max"
          >
            <Star color="white" size={20} />
            <span className="text-base font-medium text-white">10</span>
          </button>
        </div>
      )}

      {attributes.length > 0 && (
        <div className="md:flex text-left">
          <div>
            <p className="font-bold text-gray-900">Type de Façade</p>
            <select
              id="attribute"
              name="attribute"
              value={attribute?.id ?? ""}
              onChange={handleAttributeChange}
              className={`${INPUT_CLASS} md:w-64 cursor-pointer appearance-none`}
            >
              <option value="">Select type</option>
              {attributes.map((attr) => (
                <option key={attr.id} value={attr.id}>
                  {attr.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:ms-4">
            <p className="font-bold text-gray-900">Special</p>
            <label
              htmlFor="special"
              className="text-black/70 mb-3 bg-white px-3 py-3 flex items-center font-semibold cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg w-full md:w-64 border-2"
            >
              <input
                id="special"
                type="checkbox"
                checked={special}
                onChange={(e) => handleSpecialChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <span className="ms-2 text-sm font-medium text-gray-900">Special</span>
            </label>
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="text-left">
          <p className="font-bold text-gray-900">Couleur</p>
          <ul className="flex flex-wrap gap-0 md:gap-2 mb-4">
            {colors.map((c) => (
              <li key={c.id} className="group text-center me-3 relative">
                <input
                  type="radio"
                  id={`color-${c.id}`}
                  name="color"
                  value={c.id}
                  checked={same(color, c.id)}
                  onChange={() => handleColorChange(c.id)}
                  className="hidden peer"
                />
                <label
                  htmlFor={`color-${c.id}`}
                  title={c.name}
                  style={{ backgroundImage: `url('${STORAGE_URL}/${c.image}')` }}
                  className="inline-flex items-center justify-between w-full p-4 bg-cover bg-center text-gray-500 border-gray-500 rounded-lg cursor-pointer border-2 peer-checked:border-red-600 hover:bg-gray-100"
                />
                <div
                  role="tooltip"
                  className="-top-56 hidden group-hover:block absolute overflow-hidden bg-neutral-950 left-1/2 border-black border-2 rounded text-center text-sm text-white w-40 whitespace-nowrap z-10"
                >
                  {c.name} <br />
                  <small>{c.code}</small>
                  <Image
                    className="w-full"
                    width={100}
                    height={100}
                    src={`${STORAGE_URL}/${c.image}`}
                    alt={c.name}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ErrorMessage message={colorError} />

      {!special && heights.length > 0 && (
        <OptionList
          label="Hauteur"
          unit={product.unit}
          name="height"
          options={heights}
          value={height}
          onChange={setHeight}
        />
      )}

      {!special && widths.length > 0 && (
        <OptionList
          label="Largeur"
          unit={product.unit}
          name="width"
          options={widths}
          value={width}
          onChange={setWidth}
          className="mt-2"
        />
      )}

      {special && (
        <div className="text-left flex gap-2">
          <div className="w-1/2">
            <label htmlFor="height-input">Hauteur</label>
            <input
              id="height-input"
              type="number"
              min="70"
              max="2800"
              value={height ?? ""}
              onChange={handleSizeInput(setHeight)}
              className={INPUT_CLASS}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="width-input">Largeur</label>
            <input
              id="width-input"
              type="number"
              min="70"
              max="2100"
              value={width ?? ""}
              onChange={handleSizeInput(setWidth)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
      )}

      <ErrorMessage message={dimensionError ?? availabilityMessage} />

      <div className="mt-6 sm:flex flex-initial space-y-4 sm:space-y-0 items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
        <QuantityInput value={quantity} onChange={setQuantity} />

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!hasPrice || spinner}
          className="cursor-pointer group border-2 border-red-400 py-2 md:py-3 px-5 rounded-full bg-red-50 text-red-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-red-300 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
        >
          {spinner ? (
            <LoaderCircle className="inline w-6 h-6 animate-spin stroke-red-600" />
          ) : (
            <ShoppingCart className="stroke-red-600" />
          )}
          Ajouter au panier
        </button>
      </div>

      <ColorDisclaimer />
    </div>
  )
}

export default Product