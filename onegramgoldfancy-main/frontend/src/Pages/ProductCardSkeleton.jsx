const ProductCardSkeleton = () => {
  return (
    <div className="min-w-[160px] bg-white rounded-xl shadow-sm p-3">
      
      {/* Image shimmer */}
      <div className="h-32 w-full rounded-lg bg-gray-200 animate-pulse" />

      {/* Text shimmer */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Price shimmer */}
      <div className="mt-3 h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
    </div>
  );
};

export default ProductCardSkeleton;
