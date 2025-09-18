import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CSVUploadProps {
  onUploadComplete: (file: File) => void;
}

interface UploadResponse {
  message: string;
  file: string;
}

const CSVUpload = ({ onUploadComplete }: CSVUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a CSV file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8000/api/upload", {
  method: "POST",
  body: formData,
});


      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data: UploadResponse = await res.json();

      toast({
        title: "File uploaded successfully!",
        description: data.message,
      });

      setIsProcessing(false);
      onUploadComplete(file);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Upload Your Dataset
          </CardTitle>
          <CardDescription className="text-lg">
            Upload a CSV file to create your personalized RAG knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive
                ? "border-accent bg-accent/5"
                : uploadedFile
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-border hover:border-accent/50 hover:bg-accent/5"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />

            {isProcessing ? (
              <div className="space-y-4">
                <AlertCircle className="w-16 h-16 text-accent mx-auto animate-pulse" />
                <p className="text-lg font-medium">Processing your file...</p>
                <p className="text-muted-foreground">
                  Please wait while we prepare your data
                </p>
              </div>
            ) : uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-green-700 dark:text-green-400">
                    File uploaded successfully!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <File className="w-4 h-4" />
                    <span>{uploadedFile.name}</span>
                    <span>{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    Drag and drop your CSV file here
                  </p>
                  <p className="text-muted-foreground">
                    Or click to browse files (Max 10MB)
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4"
                >
                  Choose File
                </Button>
              </div>
            )}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm">Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• File format: CSV only</li>
              <li>• Maximum size: 10MB</li>
              <li>• Include headers in first row</li>
              <li>• Ensure data is clean and properly formatted</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSVUpload;
