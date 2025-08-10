"use client";

import { cn } from "@/lib/utils";
import "quill/dist/quill.snow.css";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Start typing here...",
  disabled = false,
  style,
}: RichTextEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [2, 3] }],
      ["bold", "italic", "underline", "strike"], // formatting
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const { quill, quillRef } = useQuill({
    modules,
    placeholder: "Write property description",
  });

  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value || "";
    }
  }, [quill, value]);

  useEffect(() => {
    if (!quill) return;

    const handler = () => {
      const html = quill.root.innerHTML;
      onChange(html === "<p><br></p>" ? "" : html);
    };

    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [quill, onChange]);

  return (
    <div
      style={style}
      className={cn(
        "overflow-hidden rounded-md border shadow-sm",
        disabled && "pointer-events-none opacity-60",
      )}
    >
      <div className="min-h-20" ref={quillRef} data-placeholder={placeholder} />
    </div>
  );
};
