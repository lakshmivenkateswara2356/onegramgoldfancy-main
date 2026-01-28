const ProductGridSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3">
      {/* Image */}
      <div className="h-36 w-full bg-gray-200 rounded-lg animate-pulse" />

      {/* Text */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Price */}
      <div className="mt-3 h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
    </div>
  );
};

export default ProductGridSkeleton;
