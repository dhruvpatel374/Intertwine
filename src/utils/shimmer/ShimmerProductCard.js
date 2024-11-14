const ShimmerProductCard = () => {
  return (
    <div className="cursor-pointer hover:scale-95 transition ease-in-out duration-300">
      <div className="relative">
        <div className="w-full h-48 bg-gray-300 animate-pulse rounded-t-lg"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0"></div>
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
        <div className="h-4 bg-gray-300 animate-pulse rounded mb-1"></div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded ml-1 w-16"></div>
          </div>
          <button className="p-1 rounded-md transition-colors duration-200">
            <div className="w-6 h-6 bg-gray-300 animate-pulse rounded"></div>
          </button>
        </div>
        <button className="bg-gray-300 animate-pulse rounded-md py-1 px-3 mt-2 w-full h-8"></button>
      </div>
    </div>
  );
};

export default ShimmerProductCard;
