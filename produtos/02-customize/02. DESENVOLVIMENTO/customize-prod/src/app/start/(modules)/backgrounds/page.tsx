import React from 'react'

export default function StartApp() {
  return (
    <div className="flex h-full w-[full] flex-col  items-center justify-center rounded-2xl bg-customize-signature-form-background shadow-customize-signature-form-shadow backdrop-blur-[20px]">
      <div className="flex h-[90%] w-[85%] flex-col gap-12 ">
        <h1 className="text-xl font-bold text-white">Temas</h1>
        <div className="grid h-full w-full grid-cols-3 items-start">
          <div className="h-40 w-56 rounded-2xl bg-white shadow-customize-bg-gallery-card-shadow" />
          <div className="h-40 w-56 rounded-2xl bg-white shadow-customize-bg-gallery-card-shadow" />
          <div className="h-40 w-56 rounded-2xl bg-white shadow-customize-bg-gallery-card-shadow" />
          <div className="h-40 w-56 rounded-2xl bg-white shadow-customize-bg-gallery-card-shadow" />
          <div className="h-40 w-56 rounded-2xl bg-white shadow-customize-bg-gallery-card-shadow" />
          <div className="h-40 w-56 rounded-2xl bg-white shadow-customize-bg-gallery-card-shadow" />
        </div>
      </div>
    </div>
  )
}
