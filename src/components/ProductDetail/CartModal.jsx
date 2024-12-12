
const CartModal = ({ cart, cartTotal, cartQuantity, setIsCartOpen }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-4 sm:p-[44px] max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
          </div>
          {
            cart.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#8091A7]">
              <p>Item</p>    
              <div className="hidden sm:flex pe-4 justify-between">
                <p>Colour</p>    
                <p>Size</p>    
                <p>Qnt</p>    
                <p>Price</p>
              </div>    
            </div>
            )
          }

          {cart?.map((item) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t py-2  items-center">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between">
                <div className="sm:hidden">
                  <span className="text-[#8091A7]">Colour: </span>
                  <span>{item.color}</span>
                </div>
                <div className="sm:hidden">
                  <span className="text-[#8091A7]">Size: </span>
                  <span className="text-[#364A63] font-medium">{item.size}</span>
                </div>
                <div className="sm:hidden">
                  <span className="text-[#8091A7]">Quantity: </span>
                  <span className="text-[#364A63] font-medium">{item.quantity}</span>
                </div>
                <div className="hidden sm:block">{item.color}</div>
                <div className="hidden sm:block text-[#364A63] font-medium">{item.size}</div>
                <div className="hidden sm:block text-[#364A63] font-medium">{item.quantity}</div>
                <div className="text-right">
                  <div className="font-medium">${item.price * item.quantity}.00</div>
                </div>
              </div>
            </div>
          ))}
          {cart.length > 0 ? (
            <div className="border-t pt-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <div className="flex gap-5 md:gap-14">
                <span> <span className="md:hidden">Total Quantity: </span> {cartQuantity}</span>
                <span>${cartTotal}.00</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className=" px-4 py-2 border text-gray-800 rounded hover:bg-gray-300 transition-colors"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
                <button className=" px-4 py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <>
            <p className="text-center py-4">Your cart is empty</p>
            <button
            className=" px-4 py-2 border text-gray-800 rounded hover:bg-gray-300 transition-colors"
            onClick={() => setIsCartOpen(false)}
          >
            Continue Shopping
          </button>
          </>
          )}
        </div>
      </div>
    );
};

export default CartModal;