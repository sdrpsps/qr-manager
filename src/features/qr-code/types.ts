import { Options } from "qr-code-styling";

export interface QRCodeData {
  id: string;
  name: string;
  imageKey: string | null;
  sourceFileKey: string | null;
  styleOptions: Options | null;
}

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  data: QRCodeData;
  setData: (data: QRCodeData) => void;
}
