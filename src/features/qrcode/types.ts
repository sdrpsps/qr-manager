import { Options } from "qr-code-styling";

export interface QRCodeData {
  name: string;
  qrShortUrl: string;
  qrFile: File | null;
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
