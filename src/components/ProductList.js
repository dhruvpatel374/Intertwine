import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ShimmerProductCard from "../utils/shimmer/ShimmerProductCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useFetchProducts from "../utils/hooks/useFetchProducts";

const ProductList = () => {
  const { products, isLoading } = useFetchProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = filteredProducts.length / itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchClick = () => {
    const newFilteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <>
        <div className="flex gap-4 max-w-[560px] w-[95%] mx-auto m-5 h-12 px-5 lg:w-[500px]">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search products..."
            className="p-2 px-4 rounded-md border outline-none focus-within:border-orange-400 border-gray-200 grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            className="bg-orange-400 basis-2/12 text-center text-white p-2 flex justify-center gap-2 items-center md:px-8 rounded-md text-sm md:text-base"
            onClick={handleSearchClick}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span className="hidden md:block">Search</span>
          </button>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4 md:gap-6 lg:gap-8 mx-auto max-w-screen-xl p-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <ShimmerProductCard key={index} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-5 pb-5">
      <div className="flex gap-4 max-w-[560px] w-[95%] mx-auto m-5 h-12 lg:w-[500px]">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search products..."
          className="p-2 px-4 rounded-md border outline-none focus-within:border-orange-400 border-gray-200 grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className="bg-orange-400 basis-2/12 text-center text-white p-2 flex justify-center gap-2 items-center md:px-8 rounded-md text-sm md:text-base"
          onClick={handleSearchClick}
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          <span className="hidden md:block">Search</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4 md:gap-6 lg:gap-8">
        {currentItems.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-orange-400 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
