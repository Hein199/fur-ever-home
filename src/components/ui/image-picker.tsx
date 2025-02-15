"use client"

import { cn } from "@/lib/utils"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useRef, useState, useEffect } from "react"

interface ImagePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string
  onImageChange?: (file: File | null) => void
  editable?: boolean // New prop
}

export function ImagePicker({
  className,
  defaultValue,
  onImageChange,
  editable = true, // Default value for new prop
  ...props
}: ImagePickerProps) {
  const [preview, setPreview] = useState<string>(defaultValue ?? "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue)
    }
  }, [defaultValue])

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageChange?.(file)
    }
  }, [onImageChange])

  const handleRemoveImage = useCallback(() => {
    setPreview("")
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    onImageChange?.(null)
  }, [onImageChange])

  return (
    <div className={cn("relative", className)}>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        ref={inputRef}
        {...props}
      />
      <div
        onClick={() => editable && inputRef.current?.click()}
        className={cn(
          "flex aspect-square w-full items-center justify-center rounded-lg border border-dashed",
          editable && "cursor-pointer"
        )}
      >
        {preview ? (
          <div className="relative flex h-full w-full items-center justify-center p-2">
            <Image
              src={preview}
              alt="Preview"
              className="rounded-lg object-cover"
              width={160}
              height={160}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
            {editable && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveImage()
                }}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon size={40} />
            <p>{editable ? "Click to upload image" : "No image available"}</p>
          </div>
        )}
      </div>
    </div>
  )
}
