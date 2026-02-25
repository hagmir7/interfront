"use client"
import React, { useEffect, useState } from 'react';
import DimentionLoading from './ui/dimention-loading';
import { useCart } from '@/context/CartContext';
import { api } from '@/lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoaderCircle, ShoppingCart, Star, TriangleAlert } from 'lucide-react';


const Product = ({ product, selectedColor, onColorChange, initialCode }) => {

  const [data, setData] = useState({});
  const [colors, setColors] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [heights, setHeights] = useState([]);
  const [widths, setWidths] = useState([]);

  const { addToCart } = useCart();
  const [code, setCode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (code) {
      router.push(`?code=${code}`);
    }else{
      router.push('')
    }
  }, [code])

  const [dimensionMessage, setDimensionMessage] = useState(null);
  const [colorMessage, setColorMessage] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [attribute, setAttribute] = useState(null);
  const [special, setSpecial] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [price, setPrice] = useState();
  const [dimension, setDimension] = useState()

  useEffect(() => {
    getData();
    if (attributes.length > 0) {
      changeAttribute({ target: { value: attributes[0].id } });
    }
    setPrice(product.price_format);
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
    return true;
  }

  async function getData() {
    try {
      const response = await api.get(`products/dimensions/${product.slug}`)
      const data = response.data;
      setAttributes(data.attributes || []);
      setColors(data.colors || []);
      setDimensions(Array.isArray(data.dimensions) ? data.dimensions : []);
      setData(data);
      setPrice(product.price_format);

      if (data.dimensions?.length === 0) {
        setCode(data.data?.code);
      }

      const allDimensions = Array.isArray(data.dimensions) ? data.dimensions : [];

      const allAttributes = data.attributes || [];

      if (initialCode && allDimensions.length > 0) {
        const matched = allDimensions.find(dim => String(dim.code) === String(initialCode));
        if (matched) {
          setDimension(matched);
          setPrice(matched.price);
          setCode(matched.code);
          setHeight(matched.height);
          setWidth(matched.width);

          // Auto-select attribute if dimension has one
          if (matched.attribute_id && allAttributes.length > 0) {
            const matchedAttribute = allAttributes.find(a => a.id === matched.attribute_id);
            if (matchedAttribute) {
              setAttribute(matchedAttribute);
              // Filter heights/widths by this attribute
              const attrDimensions = allDimensions.filter(d => d.attribute_id === matched.attribute_id);
              setHeights([...new Set(attrDimensions.map(d => d.height).filter(h => h != null))]);
              setWidths([...new Set(attrDimensions.map(d => d.width).filter(w => w != null))]);
            }
          }

          if (matched.color_id) {
            setColor(matched.color_id);
            onColorChange(matched.color_id);
          }
        }
      } else if (allAttributes.length > 0) {
        // No initialCode — select first attribute by default
        const firstAttr = allAttributes[0];
        setAttribute(firstAttr);
        const attrDimensions = allDimensions.filter(d => d.attribute_id === firstAttr.id);
        setHeights([...new Set(attrDimensions.map(d => d.height).filter(h => h != null))]);
        setWidths([...new Set(attrDimensions.map(d => d.width).filter(w => w != null))]);
      }

      if (allDimensions.length > 0 && data.attributes?.length === 0) {
        setHeights([...new Set(allDimensions.map(item => item?.height).filter(h => h != null))]);
        setWidths([...new Set(allDimensions.map(item => item?.width).filter(w => w != null))]);
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
      setDimensionMessage(`La dimension ${height} x ${width} n'est pas disponible. (1)`)
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
    if (color) {
      setColorMessage(null);
    }

    const updateDimensionState = (dimension) => {
      setPrice(dimension.price);
      setDimension(dimension);
      setCode(dimension.code);
      setDimensionMessage(null);
    };

    const findMatchingDimension = () => {
      if (color && height && width) {
        return dimensions.find(
          item => item.width === width &&
            item.height === height &&
            item.color_id === color
        );
      }

      if (height && width) {
        return dimensions.find(
          item => item.width === width &&
            item.height === height
        );
      }

      if (height && widths.length === 0) {
        return dimensions.find(item => item.height === height);
      }

      if (width && heights.length === 0) {
        return dimensions.find(item => item.width === width);
      }

      return null;
    };

    const matchedDimension = findMatchingDimension();

    if (matchedDimension) {
      updateDimensionState(matchedDimension);
    } else if (height && width) {
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
        color_name: color && dimension ? dimension.color.name : color ? colors.find((item) => item.id === color)?.name : null,
        image: product.images[0]?.image,
        height: height || null,
        width: width || null,
        dimension: height && width ? `${height} * ${width}` : null,
        slug: product.slug,
        attribute: attributes.length > 0 ? attribute.name : null,
        product_id: product.id,
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
    const valide_dimensions = dimensions.filter(item => item?.attribute_id === selectedValue);
    setAttribute(attributes.find((attribute) => attribute.id === selectedValue));
    setHeights([...new Set(valide_dimensions.map(item => item?.height))]);
    setWidths([...new Set(valide_dimensions.map(item => item?.width))]);
  }

  function getStatus(value) {
    const statuses = {
      1: "En stock",
      2: "Cacher",
      3: "En rupture de stock",
      4: "À venir",
      5: "Sur demande",
    };
    return statuses[value] || "Inconnu";
  }

  return (
    <div>
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
              {getStatus(product.status)}{' '}
            </span>
          </div>

          <svg
            className='mx-5 hidden md:block'
            xmlns='http://www.w3.org/2000/svg'
            width='2'
            height='36'
            viewBox='0 0 2 36'
            fill='none'
          >
            <path d='M1 0V36' stroke='#E5E7EB'></path>
          </svg>

          <button className='hidden md:flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max'>
            <Star color='white' size={20} />
            <span className='text-base font-medium text-white'>10</span>
          </button>
        </div>
      )}

      <div className='md:flex text-left'>
        {attributes.length > 0 && (
          <div>
            <p className='font-bold text-gray-900'>Type de Façade</p>
            <select
              onChange={changeAttribute}
              value={attribute?.id || ''}
              name='attribute'
              id='attribute'
              className='text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-full md:w-64 border-2'
            >
              <option value=''>Select type</option>
              {attributes.map((attr, index) => (
                <option key={index} value={attr.id}>
                  {attr.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {attributes.length > 0 && (
          <div className='md:ms-4 text-left'>
            <div>
              <p className='font-bold text-gray-900'>Special</p>
              <div className='text-black/70 mb-3 bg-white px-3 py-3 flex items-center font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-full md:w-64 border-2'>
                <input
                  checked={special}
                  onChange={(e) => setSpecial(e.target.checked)}
                  id='bordered-checkbox-1'
                  type='checkbox'
                  name='bordered-checkbox'
                  className='h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded'
                />
                <label htmlFor='bordered-checkbox-1' className='w-full h-4 ms-2 text-sm font-medium text-gray-900'>
                  Special
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {colors.length > 0 && (
        <div className='text-left'>
          <p className='font-bold text-gray-900'>Couleur</p>
          <ul className='flex flex-wrap gap-0 md:gap-2 mb-4'>
            {colors.map((c, index) => (
              <li
                key={index}
                onClick={() => {
                  onColorChange(c.id)
                  setColor(c.id)
                  if (dimensions.length > 0) {
                    changeDimension()
                    findDimension()
                  }
                }}
                className='color-box group text-center me-3 relative'
              >
                <input
                  type='radio'
                  value={c.id}
                  id={`color-${c.id}`}
                  name='color'
                  checked={color === c.id}
                  onChange={() => { }}
                  className='hidden peer'
                />
                <label
                  htmlFor={`color-${c.id}`}
                  className='inline-flex items-center justify-between w-full p-4 text-gray-500 border-gray-500 rounded-lg cursor-pointer peer-checked:border-red-600 peer-checked:border-2 border-2 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100'
                  style={{
                    backgroundImage: `url('https://interapi.facepy.com/storage/${c.image}')`,
                  }}
                />
                <div
                  id={`tooltip-${c.id}`}
                  className='-top-56 hidden absolute overflow-hidden bg-neutral-950 left-1/2 p-0 border-black border-2 peer-focus:block peer-hover:block rounded text-center text-sm text-white transition-all w-40 whitespace-nowrap z-10'
                  role='tooltip'
                >
                  {c.name}
                  <Image
                    className='w-full'
                    width={100}
                    height={100}
                    src={`https://interapi.facepy.com/storage/${c.image}`}
                    alt={c.name}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {colorMessage && (
        <div className='my-2 text-red-700 font-semibold flex items-center gap-2 text-left'>
          <TriangleAlert />
          {colorMessage}
        </div>
      )}

      {!special && heights.length > 0 && (
        <div className='text-left'>
          <div className='font-bold'>
            Hauteur {product.unit ? `(${product.unit})` : ''}
          </div>
          <ul className='flex flex-wrap w-full gap-3'>
            {heights.sort((a, b) => a - b).map((h) => (
              <li
                key={h}
                onClick={() => {
                  setHeight(h)
                  changeDimension()
                }}
              >
                <input
                  type='radio'
                  id={`height-${h}`}
                  value={h}
                  name='height'
                  checked={height === h}
                  onChange={() => { }}
                  className='hidden peer'
                />
                <label
                  htmlFor={`height-${h}`}
                  className='border-2 cursor-pointer inline-flex items-center justify-between p-1 px-2 text-gray-500 bg-white border-gray-200 rounded-lg peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100'
                >
                  <div className='block'>
                    <div className='w-full text-md font-semibold'>{h}</div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!special && widths.length > 0 ? (
        <div className='text-left mt-2'>
          <div className='font-bold'>
            Largeur {product.unit ? `(${product.unit})` : ''}
          </div>
          <ul className='flex flex-wrap w-full gap-3'>
            {widths.sort((a, b) => a - b).map((w) => (
              <li
                key={w}
                onClick={() => {
                  changeDimension()
                  setWidth(w)
                }}
              >
                <input
                  type='radio'
                  id={`width-${w}`}
                  value={w}
                  name='width'
                  checked={width === w}
                  onChange={() => { }}
                  className='hidden peer'
                />
                <label
                  htmlFor={`width-${w}`}
                  className='border-2 cursor-pointer inline-flex items-center justify-between p-1 px-2 text-gray-500 bg-white border-gray-200 rounded-lg peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100'
                >
                  <div className='block'>
                    <div className='w-full text-md font-semibold'>{w}</div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}

      {special && (
        <div className='text-left flex gap-2'>
          <div className='w-1/2'>
            <label htmlFor='height-input'>Hauteur</label>
            <br />
            <input
              id='height-input'
              type='number'
              min='70'
              max='2800'
              className='text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-full border-2'
              onChange={(e) => {
                const newHeight = parseInt(e.target.value, 10)
                setHeight(newHeight)
                setIsDirty(true)
              }}
            />
          </div>
          <div className='w-1/2'>
            <label htmlFor='width-input'>Largeur</label>
            <br />
            <input
              id='width-input'
              type='number'
              min='70'
              max='2100'
              className='text-black/70 mb-3 bg-white px-3 py-2 font-semibold transition-all cursor-pointer hover:border-blue-600/30 border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30 w-full border-2'
              onChange={(e) => {
                const newWidth = parseInt(e.target.value, 10)
                setWidth(newWidth)
                setIsDirty(true)
              }}
            />
          </div>
        </div>
      )}

      {dimensionMessage && (
        <div className='mt-2 font-semibold text-red-700 flex gap-2 items-center'>
          <TriangleAlert />
          {dimensionMessage}
        </div>
      )}

      <div className='mt-6 sm:flex flex-initial space-y-4 sm:space-y-0 items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8'>
        <div className='flex items-center justify-center border border-gray-400 rounded-full'>
          <button
            onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
            className='group cursor-pointer text-3xl py-1 md:py-2 px-2 md:px-3 w-full border-r border-gray-400 rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300'
          >
            -
          </button>
          <label className='hidden' htmlFor='qty'>Quantity:</label>
          <input
            type='number'
            name='qty'
            id='qty'
            value={quantity}
            onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className='font-semibold text-gray-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-gray-900 text-center hover:text-red-600 outline-0 hover:placeholder:text-red-600 cursor-pointer'
          />
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className='group text-3xl py-1 md:py-2 px-2 md:px-3 w-full border-l border-gray-400 rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300 cursor-pointer'
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className='cursor-pointer group border-2 border-red-400 py-2 md:py-3 px-5 rounded-full bg-red-50 text-red-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-red-300 hover:bg-red-100'
        >
          {spinner ? (
            <LoaderCircle className='inline w-6 h-6 text-gray-200 animate-spin stroke-red-600' />
          ) : (
            <ShoppingCart className='stroke-red-600 transition-all duration-500 group-hover:stroke-red-600' />
          )}
          Ajouter au panier
        </button>
      </div>
    </div>
  )
};

export default Product;