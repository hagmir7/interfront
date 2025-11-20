"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
import Alert from "./ui/Alert"
import AddToCartSketelon from "./ui/AddToCartSketelon"

export function AddToCartModal({ open, onOpenChange, product, onAddToCart }) {

    const [selectedColor, setSelectedColor] = useState("")
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [colors, setColors] = useState([])
    const [dimensions, setDimensions] = useState([])
    const [code, setCode] = useState();
    const [price, setPrice] = useState(product.price_format)
    const [widths, setWidths] = useState([]);
    const [heights, setHeights] = useState([]);
    const [selectedHieght, setSelectedHieght] = useState("")
    const [selectedWidth, setSelectedWidth] = useState("")
    const [selectedAttribute, setSelectedAttribute] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [dimension, setDimension] = useState('');
    const [error, setError] = useState('')


    const handleAddToCart = () => {
        if(!validation()){
            return;
        };
        onAddToCart({
            quantity,
            id: `${product.name}-${product.id}-${selectedWidth || ''}-${selectedHieght || ''}-${selectedColor || ''}`,
            name: product.name,
            price,
            attributes: {
                color: selectedColor,
                color_name: colors.find(c => c.id === selectedColor)?.name,
                image: product.images?.[0]?.image,
                height: selectedHieght,
                width: selectedWidth,
                dimension: selectedHieght && selectedWidth ? `${selectedHieght} * ${selectedWidth}` : null,
                slug: product.slug,
                attribute: selectedAttribute?.name,
                product_id: product.id,
                dimension_id: dimension?.id || "",
                special: false
            }
        })
        
        // Reset state
        setSelectedWidth("")
        setSelectedHieght("")
        setSelectedColor("")
        setQuantity(1)
        setDimension('')
        // onOpenChange(false)
    }


    async function getData() {
        try {
            setIsLoading(true);
            const response = await api.get(`products/dimensions/${product.slug}`)
            const data = response.data;
            setAttributes(data.attributes || []);
            setColors(data.colors || []);
            setDimensions(Array.isArray(data.dimensions) ? data.dimensions : []);
            setData(data);
            setPrice(product.price);

            if (data.dimensions?.length === 0) {
                setCode(data.data?.code);
            }

            if (data.dimensions?.length > 0 && data.attributes?.length === 0) {
                setHeights([...new Set(data.dimensions.map(item => item?.height).filter(h => h != null))]);
                setWidths([...new Set(data.dimensions.map(item => item?.width).filter(w => w != null))]);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (open) {
            getData();
        }
    }, [product, open]);



    function changeAttribute(e) {
        const selectedValue = parseInt(e.target.value, 10);

        const valide_dimensions = dimensions.filter(item => item?.attribute_id === selectedValue);

        setSelectedAttribute(attributes.find((attribute) => attribute.id === selectedValue));

        setHeights([...new Set(valide_dimensions.map(item => item?.height))]);
        setWidths([...new Set(valide_dimensions.map(item => item?.width))]);
    }

    // Find matching dimension and update price
    useEffect(() => {
        if (dimensions.length > 0) {

            const matchingDimension = dimensions.find((dim) => {
                let matches = true;
                
                if (widths.length > 0 && selectedWidth) {
                    matches = matches && dim.width === selectedWidth;
                }
                

                if (heights.length > 0 && selectedHieght) {
                    matches = matches && dim.height === selectedHieght;
                }
                

                if (colors.length > 0 && selectedColor) {
                    matches = matches && dim.color_id === selectedColor;
                }
                
                return matches;
            });

 
            if (matchingDimension) {
                setDimension(matchingDimension);
                
                if (matchingDimension.price) {
                    setPrice(matchingDimension.price);
                }
                if (matchingDimension.code) {
                    setCode(matchingDimension.code);
                }
            }
        }
    }, [selectedWidth, selectedHieght, selectedColor, dimensions, widths, heights, colors]);



    function validation() {
        if (colors.length > 0 && (!selectedColor)) {
            setError("Obligatoire de sélectionner une couleur");
            return false;
        }
        // setError(null);

        if (heights.length > 0 && selectedHieght === "") {
            setError("Obligatoire de sélectionner la hauteur");
            return false;
        }

        if (widths.length > 0 && selectedWidth === "") {
            setError("Obligatoire de sélectionner la largeur");
            return false;
        }

        if (dimensions.length > 0 && !selectedWidth && !selectedHieght) {
            setError("Obligatoire de sélectionner la dimension");
            return false;
        }

        if (attributes.length > 0 && !selectedAttribute) {
            setError("Obligatoire de sélectionner la type de facad");
            return false;
        }

        setError('');
        return true

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Alert message={error} type="error" />

                {isLoading ? (
                  <AddToCartSketelon />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-6 col-span-2">
                                <div>
                                    <p className="text-xl font-bold text-red-600">{price || product.price_format} MAD</p>

                                    {
                                        attributes.length > 0 && (<div><select
                                            name="attribute"
                                            id="attribute"
                                            className="border rounded-md px-3 py-2 text-sm w-full mt-2 animate-shake"
                                            onChange={changeAttribute}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Type de Façade
                                            </option>

                                            {attributes.map((attr) => (
                                                <option key={attr.id} value={attr.id}>
                                                    {attr.name}
                                                </option>
                                            ))}
                                        </select></div>)
                                    }
                                </div>
                            </div>
                            {
                                heights.length > 0 && (<div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hauteur</label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {heights.map((dim) => (
                                            <button
                                                key={dim}
                                                onClick={() => setSelectedHieght(dim)}
                                                className={`py-2 px-3 rounded-lg border-2 transition-colors text-sm font-medium ${selectedHieght === dim
                                                    ? "border-red-600 bg-red-50 text-red-600"
                                                    : "border-gray-200 bg-white text-gray-700 hover:border-red-300"
                                                    }`}
                                            >
                                                {dim}
                                            </button>
                                        ))}
                                    </div>
                                </div>)
                            }

                            {
                                widths.length > 0 && (<div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Largeur</label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {widths.map((dim) => (
                                            <button
                                                key={dim}
                                                onClick={() => setSelectedWidth(dim)}
                                                className={`py-2 px-3 rounded-lg border-2 transition-colors text-sm font-medium ${selectedWidth === dim
                                                    ? "border-red-600 bg-red-50 text-red-600"
                                                    : "border-gray-200 bg-white text-gray-700 hover:border-red-300"
                                                    }`}
                                            >
                                                {dim}
                                            </button>
                                        ))}
                                    </div>
                                </div>)
                            }

                            {
                                colors.length > 0 && (<div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Couleurs {"  "}
                                        <strong>{selectedColor && (colors.find((c) => c.id === selectedColor)?.name)}</strong>
                                    </label>

                                    <div className="flex flex-wrap gap-2">
                                        {colors.map((color) => {
                                            const isSelected = selectedColor === color.id;

                                            return (
                                                <button
                                                    key={color.id}
                                                    onClick={() => setSelectedColor(color.id)}
                                                    className={`
                                                w-10 h-10 rounded-full border-2 shadow-sm 
                                                bg-cover bg-center transition-all duration-200
                                                ${isSelected
                                                            ? "border-gray-900 ring-4 ring-gray-300 scale-105"
                                                            : "border-gray-100 hover:border-gray-500 hover:scale-105"}
                                            `}
                                                    style={{
                                                        backgroundImage: `url(https://intercocina.com/storage/public/${color.image})`,
                                                    }}
                                                    title={color.name}
                                                    aria-label={`Select ${color.name} color`}
                                                />
                                            );
                                        })}
                                    </div>


                                </div>)
                            }
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 flex items-end justify-between sm:justify-between">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Quantité</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={handleAddToCart} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                                    Ajouter au panier
                                </Button>
                                <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                                    Annuler
                                </Button>

                            </div>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}