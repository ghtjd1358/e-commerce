import { auth, storage } from "../../app/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadMetadata,
} from "firebase/storage";

// 업로드할 파일의 형식 제한
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const validateFileType = (file: File): boolean => {
  return ALLOWED_TYPES.includes(file.type);
};

export const uploadImageOriginal = async (
  file: File,
): Promise<string | null> => {
  if (!file) return null;

  // 파일 유형 체크
  if (!validateFileType(file)) {
    throw new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const fileName = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `products/${fileName}`);

  const idToken = await user.getIdToken();

  const metadata: UploadMetadata = {
    contentType: file.type,
    cacheControl: "public, max-age=31536000",
    customMetadata: { token: idToken },
  };

  // Firebase Storage에 업로드
  await uploadBytes(storageRef, file, metadata);

  // 다운로드 URL 반환
  return getDownloadURL(storageRef);
};
