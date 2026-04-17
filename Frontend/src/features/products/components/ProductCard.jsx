import React from 'react'



const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);




export default function ProductCard({ product, onEdit, onDelete }) {

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col">
      {/* Image */}
      <div className="w-full aspect-4/3 overflow-hidden bg-[#f5f4f2]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "https://placehold.co/400x300/f0ede8/aaa?text=Product"; }}
        />
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-5 flex flex-col gap-3">
        <div>
          <h3 className="text-[#1a1a1a] font-semibold text-[15px] leading-snug">{product.name}</h3>
          <p className="text-[#1a1a1a] text-[15px] font-medium mt-2">₹{product.price.toLocaleString("en-IN")}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-[#ddd] rounded-md text-[#444] text-xs font-medium hover:border-[#b8963c] hover:text-[#b8963c] transition-colors duration-150"
          >
            <EditIcon />
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex items-center justify-center w-8 h-8 border border-[#ddd] rounded-md text-[#888] hover:border-red-300 hover:text-red-400 transition-colors duration-150"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
