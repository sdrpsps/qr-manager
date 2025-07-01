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
