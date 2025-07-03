import { Options } from "qr-code-styling";

export interface QRCodeData {
  qrId: string;
  qrName: string;
  qrImageKey: string;
  fileName: string;
  styleOptions: Options;
}

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  data: QRCodeData;
  setData: (data: QRCodeData) => void;
}
