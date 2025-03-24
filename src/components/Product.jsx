"use client"

import Carousel from '@/components/Carousel';
import React, { useEffect, useState } from 'react';

const Product = () => {


    const [data, setData] = useState({});
    const [colors, setColors] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [dimensions, setDimensions] = useState([]);

    const [heights, setHeights] = useState([]);
    const [widths, setWidths] = useState([]);
    const [images, setImages] = useState([])


    // Message
    const [dimensionMessage, setDimensionMessage] = useState(null);
    const [colorMessage, setColorMessage] = useState(null);


    // Attributes
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState(null);
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [attribute, setAttribute] = useState('');
    const [special, setSpecial] = useState(false);
    const [auth, SetAuth] = useState(false);

    const [spinner, setSpinner] = useState(false);


    const [price, setPrice] = useState();

    const [code, setCode] = useState(null);

    const [dimension, setDimension] = useState()

    useEffect(() => {
        getData();
        if (attributes.length > 0) {
            changeAttribute({ target: { value: attributes[0].id } });
        }
    }, []);


    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    function validation() {
        if (colors.length > 0 && (!color)) {
            setColorMessage("Obligatoire de sélectionner une couleur");
            return false;
        }
        setColorMessage(null);

        if(heights.length > 0 && height === null){
            setDimensionMessage("Obligatoire de sélectionner la hauteur");
            return false;
        }

        if(widths.length > 0 && width === null){
            setDimensionMessage("Obligatoire de sélectionner la largeur");
            return false;
        }
        setDimensionMessage(null);
        return true

    }


    async function getData() {



        try {
            const response = await fetch("https://interapi.facepy.com/api/products/facade-laca-g1-atania");
            const data = await response.json();

            setAttributes(data.data.attributes || []);
            setColors(data.data.colors || []);
            setDimensions(Array.isArray(data.data.dimensions) ? data.data.dimensions : []);
            setData(data.data);
            setPrice(data.data.price);
            setImages((data.data.images || []).map(image => `https://intercocina.com/storage/public/${image}`));

            if (data.data.attributes?.length > 0) {
                setAttribute(data.data.attributes[0]);
            }

            if (data.data.dimensions?.length > 0) {
                setHeights([...new Set(data.data.dimensions.map(item => item?.height).filter(h => h != null))]);
                setWidths([...new Set(data.data.dimensions.map(item => item?.width).filter(w => w != null))]);
            }
            

            if(data.data.dimensions?.length === 0){
                setCode(data.data?.code);
            }

        } catch (error) {

        }
    }




    const [isDirty, setIsDirty] = useState(false);

    const findDimension = () => {

        const validDimensions = color ? dimensions.filter(dim => dim.width >= width && dim.height >= height && dim.color_id == color) :
            dimensions.filter(dim => dim.width >= width && dim.height >= height);


        if (validDimensions.length === 0) {
            setDimensionMessage(`La dimension ${height} x ${width} n'est pas disponible.`);
            setPrice(null);
            return;
        }

        const current = validDimensions.reduce((best, current) => {
            const bestArea = best.width * best.height;
            const currentArea = current.width * current.height;
            return currentArea < bestArea ? current : best;
        });

        setDimension(current);
        setPrice(current.price);
        setCode(current.code);
        setDimensionMessage(null);
        return current;
    };

    useEffect(() => {
        if (isDirty && height && width) {
            findDimension();
            setIsDirty(false);
        }
    }, [height, width, isDirty]);





    function changeDimension() {
        // Reset color message if color is selected
        if (color) {
            setColorMessage(null);
        }
    
        // Helper function to update state with dimension details
        const updateDimensionState = (dimension) => {
            setPrice(dimension.price);
            setDimension(dimension);
            setCode(dimension.code);
            setDimensionMessage(null);
        };
    
        // Find matching dimension based on available parameters
        const findMatchingDimension = () => {
            // Prioritize full match with color, height, and width
            if (color && height && width) {
                return dimensions.find(
                    item => item.width === width && 
                            item.height === height && 
                            item.color_id === color
                );
            }
    
            // Match with height and width
            if (height && width) {
                return dimensions.find(
                    item => item.width === width && 
                            item.height === height
                );
            }
    
            // Match with only height
            if (height && widths.length === 0) {
                return dimensions.find(item => item.height === height);
            }
    
            // Match with only width
            if (width && heights.length === 0) {
                return dimensions.find(item => item.width === width);
            }
    
            return null;
        };
    
        // Find and process matching dimension
        const matchedDimension = findMatchingDimension();
    
        if (matchedDimension) {
            updateDimensionState(matchedDimension);
        } else if (height && width) {
            // Set error message for unavailable dimension
            setDimensionMessage(`La dimension ${height} x ${width} n'est pas disponible`);
            setCode(null);
        }
    }


    function addToCart() {

        if (!validation()) {
            return;
        }




        setSpinner(true);
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const cart = {
            id: `${data.slug}${width}-${height}${dimension?.id}${color}${attribute?.id}`,
            name: data.name,
            price: price,
            quantity: quantity,
            attributes: {
                color: color ? color : null,
                color_name: color && dimension ? dimension.color : color ? colors.find(item => item.id === color).name : null,
                image: data.images[0],
                height: height ? height : null,
                width : width ? width : null,
                dimension: height && width ? `${height} * ${width}` : null,
                slug: data.slug,
                attribute: attributes.length ? attribute : null,
                product_id: data.id,
                dimension_id: dimension ? dimension.id : null,
                special: special

            }

        }

        // console.log(JSON.stringify({ cart }));
        

        fetch("/add-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ cart })
        })
            .then(response => response.json())
            .then(result => {
                setSpinner(false);
                if (window.Livewire) {
                    window.Livewire.dispatch('add-to-cart');
                } else {
                    console.error("Livewire is not loaded");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setSpinner(false);
            });

    }



    function changeAttribute(e) {
        const selectedValue = parseInt(e.target.value, 10);


        if (isNaN(selectedValue)) return;
        const valide_dimensions = dimensions.filter(item => item?.attribute_id === selectedValue);
        setAttribute(attributes.find((attribute) => attribute.id === selectedValue));

        setHeights([...new Set(valide_dimensions.map(item => item?.height))]);
        setWidths([...new Set(valide_dimensions.map(item => item?.width))]);
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50 py-6 rounded-xl border">
            <div className='w-full px-4' style={{ margin: '0 auto' }}>
                {
                    !isEmpty(data) ? <Carousel images={images} /> :
                     (<div className='h-96'>
                        <div className="flex items-center justify-center bg-gray-300 rounded-sm sm:w-96 animate-pulse w-full mr-4" style={{width: "100%", height: "400px"}}>
                            <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                        </div>
                        <div className='grid grid-cols-4 gap-2 mt-4'>
                            <div className="flex items-center justify-center bg-gray-300 rounded-sm sm:w-96 animate-pulse w-full mr-4 h-20" style={{width: "100%"}}>
                                <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                            <div className="flex items-center justify-center bg-gray-300 rounded-sm sm:w-96 animate-pulse w-full mr-4 h-20" style={{width: "100%"}}>
                                <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                            <div className="flex items-center justify-center bg-gray-300 rounded-sm sm:w-96 animate-pulse w-full mr-4 h-20" style={{width: "100%"}}>
                                <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                            <div className="flex items-center justify-center bg-gray-300 rounded-sm sm:w-96 animate-pulse w-full mr-4 h-20" style={{width: "100%"}}>
                                <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                        </div>
                     </div>)
                }
            </div>
            <div className="flex justify-center">
                <div className="pro-detail w-full md:max-lg:max-w-[608px] lg:pl-8 xl:pl-12 max-lg:mx-auto max-lg:mt-6 px-3">
                    <div className="sm:flex flex-initial items-center justify-between gap-6 mb-4">
                        {
                            !isEmpty(data) ? (
                                <div className="text-left">
                                    <h1 className="font-manrope font-bold sm:text-3xl text-2xl leading-10 text-gray-900 mb-2">{data?.name}</h1>
                                    <h2 className="font-normal text-base text-gray-500 text-left">
                                        {data.type} {code ? `, Ref: ${code}` : ""}
                                    </h2>
                                </div>
                            ) : (
                                <div role="status" className="bg-gray-300 rounded-sm sm:w-96 animate-pulse w-full mr-4 h-10">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )
                        }

                
                        {
                            auth ?
                                <a href={`/admin/products/${data.id}/edit`} className="group transition-all duration-500 p-0.5 sm:block hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                            <path className="stroke-green-600 transition-all duration-500 group-hover:stroke-green-700" d="M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z"></path>
                                            <path className="stroke-green-600 transition-all duration-500 group-hover:stroke-green-700" d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"></path>
                                        </g>
                                    </svg>
                                </a> : ""
                        }

                    </div>
                    
                    {
                        !isEmpty(data) ? 
                         (<p className="mb-3 text-left">{data.description}</p>) : 
                         (<div role="status" className="bg-gray-300 rounded-sm animate-pulse w-full mr-4 h-10">
                            <span className="sr-only">Loading...</span>
                        </div>)
                    }

                    {
                        isEmpty(data) ?
                        (<div>
                            <div role="status" className="bg-gray-300 rounded-sm animate-pulse w-full mr-4 h-16 mt-5">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="bg-gray-300 rounded-sm animate-pulse w-full mr-4 h-16 mt-5">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="bg-gray-300 rounded-sm animate-pulse w-full mr-4 h-16 mt-5">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>) :
                            (<div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-5 gap-y-3 flex-wrap">

                                <div className="flex items-center">
                                    <div className="font-manrope font-semibold sm:text-2xl text-xl leading-9 text-gray-900">
                                        <span>{price}</span> MAD
                                    </div>
                                    <span className="ml-3 font-semibold text-lg text-green-600"> {data.status} </span>
                                </div>

                                <svg className="mx-5 max-[400px]:hidden" xmlns="http://www.w3.org/2000/svg" width="2" height="36" viewBox="0 0 2 36" fill="none">
                                    <path d="M1 0V36" stroke="#E5E7EB"></path>
                                </svg>

                                <button className="flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_12657_16865)">
                                            <path d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z" fill="white"></path>
                                            <g clipPath="url(#clip1_12657_16865)">
                                                <path d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z" fill="white"></path>
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_12657_16865">
                                                <rect width="18" height="18" fill="white"></rect>
                                            </clipPath>
                                            <clipPath id="clip1_12657_16865">
                                                <rect width="18" height="18" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="text-base font-medium text-white">0</span>
                                </button>

                            </div>)
                     }

                    <div className="md:flex text-left">
                        {
                            attributes.length > 0 ?
                                (<div>
                                    <p className="font-bold text-gray-900">Type de  Façade</p>
                                    <select onChange={changeAttribute} name="attribute" id="attribute" className="text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-64 border-2">
                                        {
                                            attributes.map((attribute, index) => {
                                                return (
                                                    <option key={index} value={attribute.id}>{attribute.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>) : ""
                        }

                        {
                            attributes.length > 0 ?
                                (<div className="md:ms-4 text-left">
                                    <div>
                                        <p className="font-bold text-gray-900">Special</p>
                                        <div className="text-black/70 mb-3 bg-white px-3 py-3 flex items-center font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-64 border-2">
                                            <input
                                                checked={special}
                                                onChange={(e) => setSpecial(e.target.checked)}
                                                id="bordered-checkbox-1"
                                                type="checkbox"
                                                name="bordered-checkbox"
                                                className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                            />
                                            <label htmlFor="bordered-checkbox-1" className="w-full h-4 ms-2 text-sm font-medium text-gray-900">
                                                Special
                                            </label>
                                        </div>
                                    </div>
                                </div>) : ""
                        }
                    </div>


                    {

                        colors.length > 0 ?
                            (<div className='text-left'>
                                <p className="font-bold text-gray-900">Couleur</p>
                                <ul className="flex flex-wrap gap-2 mb-4">
                                    {
                                        colors.map((color, index) => {
                                            return (
                                                <li onClick={() => {
                                                    setColor(color.id);
                                                    if (dimensions.length > 0) {
                                                        changeDimension();
                                                        findDimension();
                                                    }
                                                }} className="color-box group text-center me-3 relative" key={index}>
                                                    <input type="radio" value={color.id} id={`color-${color.id}`} name="color" className="hidden peer" />
                                                    <label htmlFor={`color-${color.id}`} className="inline-flex items-center justify-between w-full p-4 text-gray-500 border-gray-500 rounded-lg cursor-pointer peer-checked:border-red-600 peer-checked:border-4 border-2 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100" style={{ 'backgroundImage': `url('https://intercocina.com/storage/public/${color.image}')` }}></label>
                                                    <div id="tooltipExample" className="-top-56 hidden absolute overflow-hidden bg-neutral-950 ease-out left-1/2 p-0 border-black border-2 peer-focus:block peer-hover:block rounded text-center text-sm text-white transition-all w-40 whitespace-nowrap z-10" role="tooltip">
                                                        {color.name}
                                                        <img className="w-full" src={`https://intercocina.com/storage/public/${color.image}`} alt={color.name} />
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>) : ""
                    }


                    {
                        colorMessage ? <div className="my-2 text-red-700 font-semibold flex items-center gap-2 text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 9v4"></path>
                                <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"></path>
                                <path d="M12 16h.01"></path>
                            </svg>
                            {colorMessage}
                        </div> : ""
                    }

                        {!special && heights.length > 0 && (
                            <div className='text-left'>
                                <div className="font-bold">Hauteur {data.unit ? `(${data.unit})` : ""}</div>
                                <ul className="flex flex-wrap w-full gap-3">
                                    {heights.sort().map((height) => (
                                        <li key={height} onClick={() => { 
                                            setHeight(height);
                                            changeDimension(); 
                                        }}>
                                            <input 
                                                type="radio" 
                                                id={`height-${height}`} 
                                                value={height} 
                                                name="height" 
                                                className="hidden peer" 
                                            />
                                            <label 
                                                htmlFor={`height-${height}`} 
                                                className="border-2 cursor-pointer inline-flex items-center justify-between p-2 px-3 text-gray-500 bg-white border-gray-200 rounded-lg peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                                            >
                                                <div className="block">
                                                    <div className="w-full text-md font-semibold">{height}</div>
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}


                    {
                        !special &&
                            widths.length > 0 ?
                            (<div className='text-left'>
                                <div className="font-bold">Largeur { data.unit ? `(${data.unit})` : ""}</div>
                                <ul className="flex flex-wrap w-full gap-3">
                                    {widths.sort().map((width) => (
                                        <li key={width} onClick={() => { changeDimension(); setWidth(width) }}>
                                            <input type="radio" id={`width-${width}`} value={width} name="width" className="hidden peer" />
                                            <label htmlFor={`width-${width}`} className="border-2 cursor-pointer inline-flex items-center justify-between p-2 px-3 text-gray-500 bg-white border-gray-200 rounded-lg peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                                <div className="block">
                                                    <div className="w-full text-md font-semibold">{width}</div>
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>) : ""
                    }

                    {special ?
                        <div className='text-left md:flex gap-3'>
                            <div>
                                <label htmlFor="height-input">Hauteur</label><br />
                                <input
                                    id="height-input"
                                    type="number"
                                    min="70"
                                    max="2800"
                                    className="text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-64 border-2"
                                    onChange={(e) => {
                                        const newHeight = parseInt(e.target.value, 10);
                                        setHeight(newHeight);
                                        setIsDirty(true);
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="width-input">Largeur</label><br />
                                <input
                                    id="width-input"
                                    type="number"
                                    min="70"
                                    max="2100"
                                    className="text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-64 border-2"
                                    onChange={(e) => {
                                        const newWidth = parseInt(e.target.value, 10);
                                        setWidth(newWidth);
                                        setIsDirty(true);
                                    }}
                                />
                            </div>
                        </div>
                        : ""
                    }

                    {
                        dimensionMessage ? (<div className="mt-2 font-semibold text-red-700 flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 9v4"></path>
                                <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"></path>
                                <path d="M12 16h.01"></path>
                            </svg>
                            {dimensionMessage}
                        </div>) : ""
                    }


                    <div className="mt-6 sm:flex flex-initial space-y-4 sm:space-y-0 items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
                        <div className="flex items-center justify-center border border-gray-400 rounded-full">
                            <button
                                onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
                                className="group cursor-pointer text-3xl py-2 px-3 w-full border-r border-gray-400 rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300">
                                -
                            </button>

                            <label className="hidden" htmlFor="qty">Quantity:</label>
                            <input type="number" name="qty" id="qty" value={quantity} onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value, 10) || 0))}
                                className="font-semibold text-gray-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-gray-900 text-center hover:text-red-600 outline-0 hover:placeholder:text-red-600 cursor-pointer"
                            />

                            <button
                                onClick={() => setQuantity((prev) => prev + 1)}
                                className="group text-3xl py-2 px-3 w-full border-l border-gray-400 rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300 cursor-pointer">
                                +
                            </button>
                        </div>
                        <button onClick={addToCart} className="cursor-pointer group border-2 border-red-400 py-3 px-5 rounded-full bg-red-50 text-red-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-red-300 hover:bg-red-100">
                            {spinner ? (
                                <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="stroke-red-600 transition-all duration-500 group-hover:stroke-red-600"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}

                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;