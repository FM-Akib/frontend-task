
const Ratings = ({rating, reviews}) => {
    return (
        <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-2xl ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
        <span className="text-gray-600">({reviews} Reviews)</span>
      </div>
    );
};

export default Ratings;