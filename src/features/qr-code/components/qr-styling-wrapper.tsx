import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import QRCodeStyling, { Options } from "qr-code-styling";

export interface QRStylingHandle {
  download: (options?: {
    name?: string;
    extension?: "png" | "jpeg" | "webp" | "svg";
  }) => void;
  export: (
    extension?: "png" | "jpeg" | "webp" | "svg"
  ) => Promise<Blob | Buffer | null>;
}

export const QRStyling = forwardRef<
  QRStylingHandle,
  { options: Options; className?: string }
>(({ options, className = "" }, ref) => {
  const divRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | undefined>(undefined);

  // 只在首次挂载时 new 一次
  useEffect(() => {
    if (!qrCodeRef.current && divRef.current) {
      qrCodeRef.current = new QRCodeStyling(options);
      qrCodeRef.current.append(divRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // options 变化时 update
  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.update(options);
    }
  }, [options]);

  // 导出方法
  useImperativeHandle(ref, () => ({
    download: (downloadOptions) => {
      qrCodeRef.current?.download(downloadOptions);
    },
    export: (extension) => {
      if (!qrCodeRef.current) {
        throw new Error("QR code not initialized");
      }
      return qrCodeRef.current.getRawData(extension);
    },
  }));

  return <div ref={divRef} className={className} />;
});

QRStyling.displayName = "QRStyling";
