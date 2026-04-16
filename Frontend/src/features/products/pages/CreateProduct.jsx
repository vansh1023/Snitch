import { useState, useRef } from "react";
import { useProduct } from '../hook/useProduct'

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 18h16.5M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
  </svg>
);



export default function CreateProduct() {

  const { handleCreateProduct } = useProduct()


  const fileInputRef = useRef(null);

  const initialState = {
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: ""
  }


  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);




  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleImageUpload = (files) => {
    const slots = 7 - images.length;
    const added = Array.from(files).slice(0, slots).map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...added]);
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit:", { ...form, images });
    
    await handleCreateProduct({
      title: form.title,
      description: form.description,
      priceAmount: form.priceAmount,
      priceCurrency: form.priceCurrency,
      images: images
    })

    setForm(initialState)
    setImages([])
  };

  const emptySlots = Math.max(0, 7 - images.length);



  return (
    <div className="h-screen w-full bg-[#0c0b09] flex flex-col items-center overflow-hidden font-sans">

      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-28 bg-[#c9a84c]/8 blur-3xl pointer-events-none" />

      {/* Brand label */}
      <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] uppercase font-semibold mt-7 mb-3 shrink-0">
        Atelier
      </p>

      {/* Centered card wrapper */}
      <div className="w-full max-w-130 px-4 flex flex-col flex-1 min-h-0">

        {/* Back button */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-[#aaa] hover:text-[#c9a84c] transition-colors duration-200 text-sm mb-3 self-start group shrink-0 cursor-pointer"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200"><ArrowLeftIcon /></span>
          Back
        </button>

        {/* Card */}
        <div className="flex-1 min-h-0 rounded-2xl bg-[#181510] border border-[#302a1f] shadow-[0_0_60px_rgba(0,0,0,0.7)] flex flex-col px-7 py-5 mb-5">

          {/* Heading */}
          <div className="text-center mb-4 shrink-0">
            <h1 className="text-white text-[26px] font-bold tracking-tight">Create Product</h1>
            <p className="text-[#7a7060] text-[13px] mt-0.5">Listing for Snitch Private Collection</p>
            <div className="mt-2.5 mx-auto w-52 h-px bg-linear-to-r from-transparent via-[#c9a84c]/70 to-transparent" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 flex-1 min-h-0">

            {/* Product Title */}
            <div className="shrink-0">
              <label className="block text-[10px] tracking-[0.2em] text-[#c9a84c] uppercase font-semibold mb-1.5">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Obsidian Silk Robe"
                className="w-full bg-[#141210] border border-[#3d3628] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#4a4438] outline-none focus:border-[#c9a84c] focus:shadow-[0_0_0_2px_rgba(201,168,76,0.15)] transition-all duration-200"
              />
            </div>

            {/* Description */}
            <div className="shrink-0">
              <label className="block text-[10px] tracking-[0.2em] text-[#c9a84c] uppercase font-semibold mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the craftsmanship..."
                rows={2}
                className="w-full bg-[#141210] border border-[#3d3628] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#4a4438] outline-none focus:border-[#c9a84c] focus:shadow-[0_0_0_2px_rgba(201,168,76,0.15)] transition-all duration-200 resize-none"
              />
            </div>

            {/* Price + Currency */}
            <div className="grid grid-cols-[1fr_120px] gap-3 shrink-0">

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#c9a84c] uppercase font-semibold mb-1.5">
                  Price Amount
                </label>
                <input
                  type="text"
                  name="priceAmount"
                  value={form.priceAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  className="w-full bg-[#141210] border border-[#3d3628] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#4a4438] outline-none focus:border-[#c9a84c] focus:shadow-[0_0_0_2px_rgba(201,168,76,0.15)] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#c9a84c] uppercase font-semibold mb-1.5">
                  Currency
                </label>
                <div className="relative">
                  <select
                    name="priceCurrency"
                    value={form.priceCurrency}
                    onChange={handleChange}
                    className="w-full bg-[#141210] border border-[#3d3628] rounded-lg px-4 py-2.5 text-white text-sm outline-none hover:border-[#c9a84c] transition-all duration-200 appearance-none cursor-pointer pr-8"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#666] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="shrink-0">
              <label className="block text-[10px] tracking-[0.2em] text-[#c9a84c] uppercase font-semibold mb-1.5">
                Product Images{" "}
                <span className="text-[#4a4438] normal-case tracking-normal">(Max 7)</span>
              </label>

              <div
                onClick={() => images.length < 7 && fileInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(e.dataTransfer.files); }}
                className={`border-2 border-dashed rounded-xl py-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "border-[#c9a84c] bg-[#c9a84c]/6"
                    : images.length >= 7
                    ? "border-[#2a2520] opacity-40 cursor-not-allowed"
                    : "border-[#3d3628] hover:border-[#c9a84c]/70 bg-[#111009]"
                }`}
              >
                <span className="text-[#c9a84c] text-2xl font-light leading-none">+</span>
                <p className="text-[#6a6050] text-xs">Drag &amp; drop or click to upload</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files)}
              />

              <div className="flex gap-2 mt-2.5">
                {images.map((img) => (
                  <div key={img.id} className="relative w-13 h-13 rounded-lg overflow-hidden border border-[#3d3628] shrink-0 group">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                      className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center text-white text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <div key={i} className="w-13 h-13rounded-lg border border-[#282318] bg-[#111009] flex items-center justify-center shrink-0">
                    <ImageIcon />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-auto pt-1 shrink-0">
              <button
                type="submit"
                className="w-full py-3 text-[11px] font-bold tracking-[0.22em] uppercase text-[#1a1200] bg-linear-to-r from-[#c9a84c] via-[#f0d060] to-[#c9a84c] hover:from-[#dbb94f] hover:via-[#f5da6a] hover:to-[#dbb94f] rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,76,0.25)] hover:shadow-[0_4px_32px_rgba(201,168,76,0.45)]"
              >
                Create Product
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}