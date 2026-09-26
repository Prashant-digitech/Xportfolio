"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, X, Film, FileText, Palette, Award, CheckCircle2,
  Sparkles, ArrowRight, RefreshCw, AlertCircle, Eye, Cpu
} from "lucide-react";
import confetti from "canvas-confetti";
import { ClassifiedAsset } from "@/lib/assetClassifier";

interface SmartUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetUploaded?: (asset: ClassifiedAsset) => void;
}

export default function SmartUploadModal({
  isOpen,
  onClose,
  onAssetUploaded,
}: SmartUploadModalProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [classification, setClassification] = useState<ClassifiedAsset | null>(null);
  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedAsset, setUploadedAsset] = useState<ClassifiedAsset | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Editable overrides
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("video");
  const [tags, setTags] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle file selection and instant classification preview
  const handleFileProcess = useCallback(async (file: File) => {
    setSelectedFile(file);
    setErrorMessage(null);
    setUploadedAsset(null);

    // Create preview URL for images/videos
    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    // Call classification preview
    setIsClassifying(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          sizeBytes: file.size,
          mimeType: file.type,
        }),
      });

      const data = await res.json();
      if (data.success && data.preview) {
        setClassification(data.preview);
        setTitle(data.preview.title);
        setCategory(data.preview.category);
        setTags(data.preview.tags.join(", "));
      } else {
        throw new Error(data.error || "Failed to classify asset");
      }
    } catch (err: unknown) {
      console.error("Classification error:", err);
      setErrorMessage((err as Error).message);
    } finally {
      setIsClassifying(false);
    }
  }, []);

  // Drag handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileProcess(e.dataTransfer.files[0]);
      }
    },
    [handleFileProcess]
  );

  // Submit actual file upload
  const handleUploadSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("tags", tags);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedAsset(data.asset);
      if (onAssetUploaded) {
        onAssetUploaded(data.asset);
      }

      // Confetti celebrate
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#9D4EDD", "#10B981", "#3B82F6"],
      });
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setErrorMessage((err as Error).message || "An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setClassification(null);
    setUploadedAsset(null);
    setErrorMessage(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const scrollToTargetSection = (targetSection: string) => {
    onClose();
    setTimeout(() => {
      const targetMap: Record<string, string> = {
        motion: "motion",
        deck: "canva-deck",
        figma: "figma",
        graphics: "visual-systems",
        certificates: "about",
        resume: "about",
      };
      const elementId = targetMap[targetSection] || targetSection;
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Intelligent Portfolio Upload Engine"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl w-full rounded-2xl bg-white dark:bg-[#0F1118] border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 text-[#111318] dark:text-white my-8 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 w-64 h-64 bg-[#9D4EDD]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#111318] dark:text-white">
                  Asset Intelligence Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] font-mono font-bold text-[#D4AF37]">
                  AUTO-ROUTER
                </span>
              </div>
              <p className="text-xs text-[#667085] dark:text-gray-400 mt-0.5">
                Drop any video, presentation deck, UX case study, or visual asset. AI classifies and places it automatically.
              </p>
            </div>
          </div>

          {/* Success State */}
          {uploadedAsset ? (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 block mb-1">
                  Asset Successfully Integrated
                </span>
                <h4 className="text-2xl font-black text-[#111318] dark:text-white">
                  {uploadedAsset.title}
                </h4>
                <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto">
                  Routed to <span className="font-bold text-[#D4AF37]">{uploadedAsset.targetSection.toUpperCase()}</span> section at <span className="font-mono text-gray-300">{uploadedAsset.publicUrl}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-left max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Target Section:</span>
                  <span className="font-bold font-mono text-[#D4AF37] uppercase">{uploadedAsset.targetSection}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Category Tag:</span>
                  <span className="font-mono text-gray-200">{uploadedAsset.category}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">File Size:</span>
                  <span className="font-mono text-gray-200">{(uploadedAsset.sizeBytes / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => scrollToTargetSection(uploadedAsset.targetSection)}
                  className="btn-primary w-full sm:w-auto text-xs flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View in {uploadedAsset.targetSection.toUpperCase()} Section</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 text-xs font-bold transition-colors w-full sm:w-auto"
                >
                  Upload Another File
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Dropzone */}
              {!selectedFile ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 ${
                    dragActive
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.01]"
                      : "border-black/20 dark:border-white/20 hover:border-[#D4AF37]/60 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileProcess(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4 shadow-lg">
                    <Upload className="w-8 h-8" />
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[#111318] dark:text-white">
                    Drag &amp; Drop Any Asset Here
                  </h4>
                  <p className="text-xs text-[#667085] dark:text-gray-400 mt-1 max-w-sm mx-auto">
                    MP4/WebM Videos, PDF Canva Decks, PNG/JPG Designs, Resumes, or Certificates
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[10px] font-mono text-gray-400">
                      <Film className="w-3 h-3 text-[#D4AF37]" />
                      <span>Videos</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[10px] font-mono text-gray-400">
                      <FileText className="w-3 h-3 text-blue-400" />
                      <span>PDF Decks</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[10px] font-mono text-gray-400">
                      <Palette className="w-3 h-3 text-purple-400" />
                      <span>UX &amp; Graphics</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[10px] font-mono text-gray-400">
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>Certificates</span>
                    </span>
                  </div>
                </div>
              ) : (
                /* Selected File Preview & Intelligence Diagnosis */
                <div className="space-y-4">
                  {/* File Info Bar */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                        {selectedFile.type.startsWith("video/") ? (
                          <Film className="w-5 h-5" />
                        ) : selectedFile.type.includes("pdf") ? (
                          <FileText className="w-5 h-5" />
                        ) : (
                          <Palette className="w-5 h-5" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold truncate block text-[#111318] dark:text-white">
                          {selectedFile.name}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || "binary"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="text-xs text-gray-400 hover:text-red-400 transition-colors p-1"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Media Visual Preview */}
                  {previewUrl && (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-black/10 dark:border-white/10">
                      {selectedFile.type.startsWith("video/") ? (
                        <video src={previewUrl} controls className="w-full h-full object-contain" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                      )}
                    </div>
                  )}

                  {/* AI Classification Card */}
                  {isClassifying ? (
                    <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center space-x-3 text-xs text-gray-400">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                      <span>Classifying asset semantics and determining destination...</span>
                    </div>
                  ) : classification ? (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/10 via-[#9D4EDD]/10 to-transparent border border-[#D4AF37]/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                            AI Routing Decision: {classification.targetSection.toUpperCase()}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                          {Math.round(classification.confidenceScore * 100)}% Confidence
                        </span>
                      </div>

                      <p className="text-xs text-gray-300">
                        {classification.reasoning}
                      </p>

                      <div className="text-[11px] font-mono text-gray-400">
                        Destination: <span className="text-white font-semibold">{classification.targetDirectory}/{classification.safeName}</span>
                      </div>
                    </div>
                  ) : null}

                  {/* Form Overrides */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                        Asset Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#111318] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                        Portfolio Section Target
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                        {[
                          { id: "video", label: "Motion" },
                          { id: "ppt", label: "Canva Deck" },
                          { id: "ux", label: "UX / Figma" },
                          { id: "graphics", label: "Graphics" },
                          { id: "cert", label: "Certificate" },
                          { id: "doc", label: "Resume" },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id)}
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                              category === cat.id
                                ? "bg-[#D4AF37] text-black shadow-md"
                                : "bg-black/5 dark:bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="After Effects, 4K Master, Commercial"
                        className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#111318] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center space-x-2 text-xs text-red-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 text-xs font-bold transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      disabled={isUploading || isClassifying}
                      onClick={handleUploadSubmit}
                      className="btn-primary text-xs flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isUploading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Routing &amp; Deploying...</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>Publish to Portfolio</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
