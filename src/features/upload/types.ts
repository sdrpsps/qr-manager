import { Options } from "qr-code-styling";

export interface QRCodeData {
  name: string;
  qrShortUrl: string;
  fileKey: string;
  fileName: string;
  styleOptions: Options;
}

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  data: QRCodeData;
  setData: (data: QRCodeData) => void;
}

export interface MaxSizeResponse {
  message: string;
  data: number;
}

export interface FileUploadResponse {
  message: string;
  data: {
    key: string;
    fileName: string;
    fileSize: number;
    fileType: string;
  };
}
