"use client";

import { getImagekitAuthParams } from "@/actions/get-image-kit-auth-params";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useCallback, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Image } from "@imagekit/next";
import { X } from "lucide-react";

type ImageKitResponse = {
  data: {
    url: string;
  };
};

type Image = {
  order: number;
  url: string;
};

interface ImageUploadProps {
  images: Image[];
  onChange: (images: Image[]) => void;
}

type UploadingFile = {
  file: File;
  progress: number;
};

export const ImageUpload = ({ images, onChange }: ImageUploadProps) => {
  const [uploadingFile, setUploadingFile] = useState<UploadingFile | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);

      startTransition(async () => {
        try {
          const uploadedImages: Image[] = [];

          for (let index = 0; index < acceptedFiles.length; index++) {
            const file = acceptedFiles[index];
            setUploadingFile({ file, progress: 0 });

            const result = await getImagekitAuthParams();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append("signature", result.signature);
            formData.append(
              "publicKey",
              process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            );
            formData.append("token", result.token);
            formData.append("expire", result.expire.toString());
            formData.append("folder", "/airbnb");

            const response: ImageKitResponse = await axios.post(
              "https://upload.imagekit.io/api/v1/files/upload",
              formData,
              {
                onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total || 1),
                  );
                  setUploadingFile({ file, progress: percentCompleted });
                },
              },
            );

            uploadedImages.push({
              order: images.length + uploadedImages.length + 1,
              url: response.data.url,
            });
          }

          setUploadingFile(null);
          onChange([...images, ...uploadedImages]);
        } catch (error) {
          console.error("Image upload failed", error);
        } finally {
          setIsUploading(false);
        }
      });
    },
    [onChange, images],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  const handleRemove = (url: string) => {
    const filtered = images
      .filter((item) => item.url !== url)
      .map((item, index) => ({
        url: item.url,
        order: index + 1,
      }));
    onChange(filtered);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.url === active.id);
    const newIndex = images.findIndex((img) => img.url === over.id);

    const reordered = arrayMove(images, oldIndex, newIndex).map(
      (img, index) => ({
        ...img,
        order: index + 1,
      }),
    );

    onChange(reordered);
  };

  return (
    <div className={cn("space-y-4", isPending && "")}>
      <div
        {...getRootProps()}
        className="text-muted-foreground hover:text-foreground flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-6 transition-colors"
      >
        <input {...getInputProps()} />
        <p className="text-center">
          {isUploading && uploadingFile
            ? `Uploading "${uploadingFile.file.name}" — ${uploadingFile.progress}%`
            : "Drag & drop images or click to select."}
        </p>
        {isUploading && uploadingFile && (
          <div className="mt-2 h-2 w-[80%] overflow-hidden rounded bg-gray-200">
            <div
              className="bg-primary h-full transition-all duration-200"
              style={{ width: `${uploadingFile.progress}%` }}
            />
          </div>
        )}
      </div>

      {!!images.length && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img) => img.url)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-wrap gap-4">
              {images.map((image) => (
                <SortableImageCard
                  key={image.url}
                  image={image}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

const SortableImageCard = ({
  image,
  onRemove,
}: {
  image: Image;
  onRemove: (url: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id: image.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative cursor-move"
      >
        <Image
          src={image.url}
          alt="Uploaded"
          width={100}
          height={100}
          transformation={[{ height: 100, width: 100 }]}
          className="bg-accent rounded-md object-cover"
        />
      </div>
      {!isDragging && (
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => {
            onRemove(image.url);
          }}
          className="absolute top-0 right-0 size-7 rounded-full"
        >
          <X />
        </Button>
      )}
    </div>
  );
};
