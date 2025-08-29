"use client"
import React, { useEffect, useState } from 'react';
import DimentionLoading from './ui/dimention-loading';
import { useCart } from '@/context/CartContext';
import { api } from '@/lib/api';

const Product = ({ product, selectedColor, onColorChange }) => {


  const [data, setData] = useState({});
  const [colors, setColors] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [heights, setHeights] = useState([]);
  const [widths, setWidths] = useState([]);

  const { addToCart } = useCart();


  // Message
  const [dimensionMessage, setDimensionMessage] = useState(null);
  const [colorMessage, setColorMessage] = useState(null);


  // Attributes
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [attribute, setAttribute] = useState(null);
  const [special, setSpecial] = useState(false);

  const [spinner, setSpinner] = useState(false);

  const [isDirty, setIsDirty] = useState(false);


  const [price, setPrice] = useState();

  const [code, setCode] = useState(null);

  const [dimension, setDimension] = useState()

  useEffect(() => {
    getData();
    if (attributes.length > 0) {
      changeAttribute({ target: { value: attributes[0].id } });
    }
    setPrice(product.price);
  }, []);



  function validation() {
    if (colors.length > 0 && (!color)) {
      setColorMessage("Obligatoire de sélectionner une couleur");
      return false;
    }
    setColorMessage(null);

    if (heights.length > 0 && height === null) {
      setDimensionMessage("Obligatoire de sélectionner la hauteur");
      return false;
    }

    if (widths.length > 0 && width === null) {
      setDimensionMessage("Obligatoire de sélectionner la largeur");
      return false;
    }

    if (dimensions.length > 0 && !width && !height) {
      setDimensionMessage("Obligatoire de sélectionner la dimension");
      return false;
    }

    if (attributes.length > 0 && !attribute) {
      setDimensionMessage("Obligatoire de sélectionner la type de facad");
      return false;
    }


    if (special && !width && !height) {
      setDimensionMessage("Largeur et hauteur obligatoires");
      return false;
    }

    setDimensionMessage(null);
    return true

  }



  async function getData() {
    try {
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
    }
  }

  const findDimension = () => {
    const validDimensions = color
      ? dimensions.filter(
        (dim) =>
          dim.width >= width &&
          dim.height >= height &&
          dim.color_id == color
      )
      : dimensions.filter((dim) => dim.width >= width && dim.height >= height)

    if (validDimensions.length === 0) {
      setDimensionMessage(
        `La dimension ${height} x ${width} n'est pas disponible. (1)`
      )
      setPrice(null)
      return
    }

    const current = validDimensions.reduce((best, current) => {
      const bestArea = best.width * best.height
      const currentArea = current.width * current.height
      return currentArea < bestArea ? current : best
    })

    setDimension(current)
    setPrice(current.price)
    setCode(current.code)
    setDimensionMessage(null)
    return current
  }


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


  function handleAddToCart() {

    if (!validation()) {
      return;
    }

    setSpinner(true);

    const cart = {
      id: `${product.slug}${width}-${height}${dimension?.id}${color}${attribute?.id || ''}${special ? 'special' : ''}`,
      name: product.name,
      price: price,
      quantity: quantity,
      attributes: {
        color: color || null,
        color_name:
          color && dimension
            ? dimension.color
            : color
              ? colors.find((item) => item.id === color)?.name
              : null,
        image: product.images[0]?.image,
        height: height || null,
        width: width || null,
        dimension: height && width ? `${height} * ${width}` : null,
        slug: product.slug,
        attribute: attributes.length > 0 ? attribute.name : null,
        product_id: data.id,
        dimension_id: dimension?.id || null,
        special: special,
      },
    }

    addToCart(cart);

    setTimeout(() => {
      setSpinner(false);
    }, 1000)
  }



  function changeAttribute(e) {
    const selectedValue = parseInt(e.target.value, 10);



    // if (isNaN(selectedValue)) return;

    const valide_dimensions = dimensions.filter(item => item?.attribute_id === selectedValue);

    setAttribute(attributes.find((attribute) => attribute.id === selectedValue));

    setHeights([...new Set(valide_dimensions.map(item => item?.height))]);
    setWidths([...new Set(valide_dimensions.map(item => item?.width))]);
  }


  return (
    <div>
      {/* <ul>
        <li>Attribute: {JSON.stringify(attribute.name)}</li>
        <li>Color: {color}</li>
        <li>width: {width}</li>
        <li>hieght: {height}</li>
      </ul> */}
      {!data ? (
        <DimentionLoading />
      ) : (
        <div className='flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-5 gap-y-3 flex-wrap'>
          <div className='flex items-center'>
            <div className='font-manrope font-semibold sm:text-2xl text-xl leading-9 text-gray-900'>
              <span>{price}</span> MAD
            </div>
            <span className='ml-3 font-semibold text-lg text-green-600'>
              {' '}
              {product.status}{' '}
            </span>
          </div>

          <svg
            className='mx-5 max-[400px]:hidden'
            xmlns='http://www.w3.org/2000/svg'
            width='2'
            height='36'
            viewBox='0 0 2 36'
            fill='none'
          >
            <path d='M1 0V36' stroke='#E5E7EB'></path>
          </svg>

          <button className='flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_12657_16865)'>
                <path
                  d='M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z'
                  fill='white'
                ></path>
                <g clipPath='url(#clip1_12657_16865)'>
                  <path
                    d='M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z'
                    fill='white'
                  ></path>
                </g>
              </g>
              <defs>
                <clipPath id='clip0_12657_16865'>
                  <rect width='18' height='18' fill='white'></rect>
                </clipPath>
                <clipPath id='clip1_12657_16865'>
                  <rect width='18' height='18' fill='white'></rect>
                </clipPath>
              </defs>
            </svg>
            <span className='text-base font-medium text-white'>0</span>
          </button>
        </div>
      )}

      <div className='md:flex text-left'>
        {attributes.length > 0 ? (
          <div>
            <p className='font-bold text-gray-900'>Type de Façade</p>
            <select
              onChange={changeAttribute}
              name='attribute'
              id='attribute'
              className='text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-64 border-2'
            >
              <option>
                Select type
              </option>
              {attributes.map((attribute, index) => {
                return (
                  <option key={index} value={attribute.id}>
                    {attribute.name}
                  </option>
                )
              })}
            </select>
          </div>
        ) : (
          ''
        )}

        {attributes.length > 0 ? (
          <div className='md:ms-4 text-left'>
            <div>
              <p className='font-bold text-gray-900'>Special</p>
              <div className='text-black/70 mb-3 bg-white px-3 py-3 flex items-center font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-64 border-2'>
                <input
                  checked={special}
                  onChange={(e) => setSpecial(e.target.checked)}
                  id='bordered-checkbox-1'
                  type='checkbox'
                  name='bordered-checkbox'
                  className='h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded'
                />
                <label
                  htmlFor='bordered-checkbox-1'
                  className='w-full h-4 ms-2 text-sm font-medium text-gray-900'
                >
                  Special
                </label>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>


      {colors.length > 0 && (
        <div className='text-left'>
          <p className='font-bold text-gray-900'>Couleur</p>
          <ul className='flex flex-wrap gap-2 mb-4'>
            {colors.map((color, index) => (
              <li
                key={index}
                onClick={() => {
                  onColorChange(color.id)
                  setColor(color.id)
                  if (dimensions.length > 0) {
                    changeDimension()
                    findDimension()
                  }
                }}
                className='color-box group text-center me-3 relative'
              >
                <input
                  type='radio'
                  value={color.id}
                  id={`color-${color.id}`}
                  name='color'
                  className='hidden peer'
                />
                <label
                  htmlFor={`color-${color.id}`}
                  className='inline-flex items-center justify-between w-full p-4 text-gray-500 border-gray-500 rounded-lg cursor-pointer peer-checked:border-red-600 peer-checked:border-2 border-2 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100'
                  style={{
                    backgroundImage: `url('https://intercocina.com/storage/public/${color.image}')`,
                  }}
                />
                <div
                  id={`tooltip-${color.id}`}
                  className='-top-56 hidden absolute overflow-hidden bg-neutral-950 left-1/2 p-0 border-black border-2 peer-focus:block peer-hover:block rounded text-center text-sm text-white transition-all w-40 whitespace-nowrap z-10'
                  role='tooltip'
                >
                  {color.name}
                  <img
                    className='w-full'
                    src={`https://intercocina.com/storage/public/${color.image}`}
                    alt={color.name}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}



      {colorMessage ? (
        <div className='my-2 text-red-700 font-semibold flex items-center gap-2 text-left'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M12 9v4'></path>
            <path d='M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z'></path>
            <path d='M12 16h.01'></path>
          </svg>
          {colorMessage}
        </div>
      ) : (
        ''
      )}

      {!special && heights.length > 0 && (
        <div className='text-left'>
          <div className='font-bold'>
            Hauteur {product.unit ? `(${product.unit})` : ''}
          </div>
          <ul className='flex flex-wrap w-full gap-3'>
            {heights.sort((a, b) => a - b).map((height) => (
              <li
                key={height}
                onClick={() => {
                  setHeight(height)
                  changeDimension()
                }}
              >
                <input
                  type='radio'
                  id={`height-${height}`}
                  value={height}
                  name='height'
                  className='hidden peer'
                />
                <label
                  htmlFor={`height-${height}`}
                  className='border-2 cursor-pointer inline-flex items-center justify-between p-2 px-3 text-gray-500 bg-white border-gray-200 rounded-lg peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100'
                >
                  <div className='block'>
                    <div className='w-full text-md font-semibold'>
                      {height}
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!special && widths.length > 0 ? (
        <div className='text-left'>
          <div className='font-bold'>
            Largeur {product.unit ? `(${product.unit})` : ''}
          </div>
          <ul className='flex flex-wrap w-full gap-3'>
            {widths.sort((a, b) => a - b).map((width) => (
              <li
                key={width}
                onClick={() => {
                  changeDimension()
                  setWidth(width)
                }}
              >
                <input
                  type='radio'
                  id={`width-${width}`}
                  value={width}
                  name='width'
                  className='hidden peer'
                />
                <label
                  htmlFor={`width-${width}`}
                  className='border-2 cursor-pointer inline-flex items-center justify-between p-2 px-3 text-gray-500 bg-white border-gray-200 rounded-lg peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100'
                >
                  <div className='block'>
                    <div className='w-full text-md font-semibold'>
                      {width}
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}

      {special ? (
        <div className='text-left md:flex gap-3'>
          <div>
            <label htmlFor='height-input'>Hauteur</label>
            <br />
            <input
              id='height-input'
              type='number'
              min='70'
              max='2800'
              className='text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-64 border-2'
              onChange={(e) => {
                const newHeight = parseInt(e.target.value, 10)
                setHeight(newHeight)
                setIsDirty(true)
              }}
            />
          </div>
          <div>
            <label htmlFor='width-input'>Largeur</label>
            <br />
            <input
              id='width-input'
              type='number'
              min='70'
              max='2100'
              className='text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-64 border-2'
              onChange={(e) => {
                const newWidth = parseInt(e.target.value, 10)
                setWidth(newWidth)
                setIsDirty(true)
              }}
            />
          </div>
        </div>
      ) : (
        ''
      )}

      {dimensionMessage ? (
        <div className='mt-2 font-semibold text-red-700 flex gap-2 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M12 9v4'></path>
            <path d='M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z'></path>
            <path d='M12 16h.01'></path>
          </svg>
          {dimensionMessage}
        </div>
      ) : (
        ''
      )}

      <div className='mt-6 sm:flex flex-initial space-y-4 sm:space-y-0 items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8'>
        <div className='flex items-center justify-center border border-gray-400 rounded-full'>
          <button
            onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
            className='group cursor-pointer text-3xl py-2 px-3 w-full border-r border-gray-400 rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300'
          >
            -
          </button>

          <label className='hidden' htmlFor='qty'>
            Quantity:
          </label>
          <input
            type='number'
            name='qty'
            id='qty'
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(0, parseInt(e.target.value, 10) || 0))
            }
            className='font-semibold text-gray-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-gray-900 text-center hover:text-red-600 outline-0 hover:placeholder:text-red-600 cursor-pointer'
          />

          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className='group text-3xl py-2 px-3 w-full border-l border-gray-400 rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300 cursor-pointer'
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className='cursor-pointer group border-2 border-red-400 py-3 px-5 rounded-full bg-red-50 text-red-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-red-300 hover:bg-red-100'
        >
          {spinner ? (
            <svg
              aria-hidden='true'
              className='inline w-6 h-6 text-gray-200 animate-spin fill-red-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          ) : (
            <svg
              className='stroke-red-600 transition-all duration-500 group-hover:stroke-red-600'
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75'
                stroke='currentColor'
                strokeWidth='1.6'
                strokeLinecap='round'
              />
            </svg>
          )}
          Ajouter au panier
        </button>
      </div>
    </div>
  )
};

export default Product;