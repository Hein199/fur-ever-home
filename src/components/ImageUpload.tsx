"use client";
import React, { useRef, useState } from "react";
import { IKImage, IKVideo, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "../lib/config";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Authentication failed: ${errorText}`);
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const ImageUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState<string>();

  const styles = {
    button: cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
      variant === "dark"
        ? "bg-gray-800 text-white hover:bg-gray-700"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    ),
    placeholder: variant === "dark" ? "text-gray-400" : "text-gray-600",
    text: variant === "dark" ? "text-gray-300" : "text-gray-700",
  };

  const onError = (error: any) => {
    toast({
      title: `${type} upload failed`,
      description: "There was an error uploading the file.",
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    setFileId(res.fileId);
    toast({
      title: `${type} uploaded successfully`,
      description: res.filePath,
    });
  };

  const onValidate = (file: File) => {
    const maxSize = type === "image" ? 20 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File size too large",
        description: `Please upload a file smaller than ${
          maxSize / 1024 / 1024
        }MB`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        validateFile={onValidate}
        useUniqueFileName
        folder={folder}
        accept={accept}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) =>
          setProgress(Math.round((loaded / total) * 100))
        }
      />

      <Button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          // @ts-ignore
          ikUploadRef.current?.click();
        }}
      >
        <p className={styles.placeholder}>{placeholder}</p>
      </Button>

      {progress > 0 && (
        <div className="w-full mt-2 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {file && (
        <div className="mt-4">
          {type === "image" ? (
            <IKImage
              alt="Uploaded Image"
              path={file.filePath}
              width={1000}
              height={800}
              className="rounded-lg shadow-md"
            />
          ) : (
            <IKVideo
              path={file.filePath}
              controls
              className="rounded-lg shadow-md w-full h-96"
            />
          )}
        </div>
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
