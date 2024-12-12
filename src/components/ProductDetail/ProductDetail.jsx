import  { useState, useEffect } from 'react';
import violet from '../../assets/violet.png';
import blue from '../../assets/blue.png';
import black from '../../assets/black.png';
import cyan from '../../assets/cyan.png';
import CartModal from './CartModal';
import Ratings from './Ratings';

const product = {
  name: "Classy Modern Smart watch",
  model: "Forerunner 290XT",
  price: 79.00,
  originalPrice: 99.00,
  description: "I must explain to you how all this mistaken idea of denouncing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
  rating: 3.5,
  reviews: 2,
  colors: [
    { name: 'Purple', value: '#9333EA', image: violet },
    { name: 'Cyan', value: '#06B6D4', image: cyan },
    { name: 'Blue', value: '#2563EB', image: blue },
    { name: 'Black', value: '#171717', image: black }
  ],
  sizes: [
    { name: 'S', price: 69 },
    { name: 'M', price: 79 },
    { name: 'L', price: 89 },
    { name: 'XL', price: 99 }
  ]
};

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = () => {
    const item = {
      id: `${product.name}-${selectedColor.name}-${selectedSize.name}`,
      name: product.name,
      color: selectedColor.name,
      size: selectedSize.name,
      price: selectedSize.price,
      quantity: quantity,
      image: selectedColor.image
    };

    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      updateCart(newCart);
    } else {
      updateCart([...cart, item]);
    }

    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <card className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full max-w-md mx-auto">
          <img
            src={selectedColor.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-sm"
          />
        </div>

        <div className="space-y-3 flex flex-col justify-center">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <Ratings rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="flex items-baseline gap-4">
          <span className="text-xl text-[#8091A7] line-through">${product.originalPrice}.00</span>
            <span className="text-3xl text-[#6576FF] font-bold">${selectedSize.price}.00</span>
          </div>

          <p className="text-[#8091A7] ">{product.description}</p>

          <div className="flex gap-6">
            <div>
                <p className="text-[#8091A7] text-sm">Type</p>
                <h3 className="font-bold mb-2 text-[#364A63] text-base">Watch</h3>
            </div>
            <div>
                <p className="text-[#8091A7] text-sm">Model Number</p>
                <h3 className="font-bold mb-2 text-[#364A63] text-base">Forerunner 290XT</h3>
            </div>
        </div>

          <div>
            <h3 className="font-bold text-[#364A63]  mb-2">Band Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className="w-5 h-5 rounded-full relative"
                  style={{ 
                    backgroundColor: color.value,
                    outline: selectedColor.name === color.name ? `2px solid ${color.value}` : 'none',
                    outlineOffset: '2px'
                  }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#364A63] mb-2">Wrist Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  className={`px-4 py-2 rounded-sm ${
                    selectedSize.name === size.name
                      ? 'border-[#6576FF] border-[1px] '
                      : 'border-[1px] text-gray-800'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  <span className='text-sm sm:text-base font-bold text-[#364A63]'>{size.name}</span> 
                  <span className="ml-1 text-xs sm:text-sm text-[#8091A7]">${size.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center border rounded-sm w-full sm:w-auto">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border-r"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 md:w-16 text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 border-l"
              >
                +
              </button>
            </div>
            <button 
              onClick={
                quantity > 0 ? addToCart : () => alert('Please set quantity')}
              className="w-full sm:w-auto bg-blue-500 font-semibold text-white py-2 px-4 rounded-sm hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
            <button className="p-2 hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </card>

      <div className="pt-5 md:pt-10 flex items-center justify-center">
        <button onClick={() => setIsCartOpen(true)} className='rounded-[20px] bg-[#FFBB5A] shadow-[0px_0px_15px_5px_rgba(0,_0,_0,_0.10)] py-2 px-6 font-semibold  '>
            Checkout <span className='bg-white px-[5px] py-[3px] rounded-md ml-2'>{cartQuantity}</span> </button>
      </div>

      {isCartOpen && (
        <CartModal cart={cart} cartTotal={cartTotal} cartQuantity={cartQuantity} setIsCartOpen={setIsCartOpen} />
      )}
    </section>
  );
}

