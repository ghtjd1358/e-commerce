import { auth, storage } from "../../app/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadMetadata,
} from "firebase/storage";
import imageCompression from "browser-image-compression";

const MAX_WIDTH = 512;
const MAX_HEIGHT = 512;
const MAX_FILE_SIZE_MB = 1;
const WEBP_QUALITY = 0.4;

// 업로드할 파일의 형식 제한
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const convertToWebP = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to get canvas context"));
          return;
        }

        const targetWidth = Math.min(MAX_WIDTH, img.width);
        const targetHeight = Math.min(MAX_HEIGHT, img.height);
        const scale = Math.min(
          targetWidth / img.width,
          targetHeight / img.height,
        );
        const width = img.width * scale;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (webpBlob: Blob | null) => {
            if (!webpBlob) {
              reject(new Error("Failed to create WebP Blob"));
              return;
            }
            resolve(webpBlob);
          },
          "image/webp",
          WEBP_QUALITY,
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

const validateFileType = (file: File): boolean => {
  return ALLOWED_TYPES.includes(file.type);
};

export const uploadImage = async (file: File): Promise<string | null> => {
  if (!file) return null;

  // 파일 유형 체크
  if (!validateFileType(file)) {
    throw new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  // 파일 크기 및 리사이징 압축
  const compressedFile: File = await imageCompression(file, {
    maxSizeMB: MAX_FILE_SIZE_MB,
    maxWidthOrHeight: Math.max(MAX_WIDTH, MAX_HEIGHT),
    useWebWorker: true,
  });

  // 리사이징 후 WebP 변환
  const optimizedFile: Blob = await convertToWebP(compressedFile);

  // 최적화된 이미지 크기 로그 출력 (비교용)
  console.log(`기본 사이즈: ${file.size / 1024} KB`);
  console.log(`Compressed File Size: ${compressedFile.size / 1024} KB`);
  console.log(`Optimized (WebP) File Size: ${optimizedFile.size / 1024} KB`);

  const fileName = `${Date.now()}_${file.name.split(".")[0]}.webp`;
  const storageRef = ref(storage, `products/${fileName}`);

  const idToken = await user.getIdToken();

  const metadata: UploadMetadata = {
    contentType: "image/webp",
    cacheControl: "public, max-age=31536000",
    customMetadata: { token: idToken },
  };

  // Firebase Storage에 업로드
  await uploadBytes(storageRef, optimizedFile, metadata);

  // 다운로드 URL 반환
  return getDownloadURL(storageRef);
};
