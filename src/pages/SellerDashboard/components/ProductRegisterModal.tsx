import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ALL_CATEGORY_ID, categories } from "@/shared/constants";
import { NewProductDTO } from "@/features/products/type";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { X, Upload } from "lucide-react";
import { useAddProducts } from "@/features/products/hooks/useAddProducts";
import { Button } from "@/pages/common/ui/button";
import { Input } from "@/pages/common/ui/input";
import { Label } from "@/pages/common/ui/label";
import { Textarea } from "@/pages/common/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/pages/common/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/pages/common/ui/dialog";
import { uploadImage } from "@/shared/utils/imageUpload";

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProductFormInputs {
  title: string;
  price: number;
  quantity: number;
  description: string;
  categoryId: string;
  authorName: string, 
  publisher: string,
}

interface ImagePreview {
  file: File;
  previewUrl: string;
}

export const ProductRegistrationModal: React.FC<
  ProductRegistrationModalProps
> = ({ isOpen, onClose }) => {
  const { mutateAsync, isPending: isLoading } = useAddProducts();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProductFormInputs>();

  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [images, setImages] = useState<ImagePreview[]>([]);

  const onSubmit = async (data: ProductFormInputs) => {
    setSubmissionError(null);
    try {
      if (images.length === 0) {
        throw new Error("이미지를 선택해야 합니다.");
      }

      // 이미지 업로드
      const imageUrls = (
        await Promise.all(images.map(({ file }) => uploadImage(file)))
      ).filter((url): url is string => url !== null);

      const selectedCategory = categories.find(
        (category) => category.id === data.categoryId,
      );

      if (!selectedCategory) {
        throw new Error("유효한 카테고리를 선택해주세요.");
      }

      const newProductData: NewProductDTO = {
        sellerId: user?.uid || "",
        productName: data.title || "",
        productPrice: Number(data.price) || 0,
        productQuantity: Number(data.quantity) || 0,
        productDescription: data.description || "",
        productAuthorName: data.authorName || "",
        productPublisher: data.publisher || "", 
        productCategory: {
          id: selectedCategory.id,
          name: selectedCategory.name,
        },
        productImage: imageUrls,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await mutateAsync(newProductData);
      reset();
      setImages([]); // 이미지 목록 초기화
      onClose(); // 다이얼로그 닫기
    } catch (error) {
      const typeError = error as Error;
      console.error("물품 등록에 실패했습니다.", typeError);
      setSubmissionError(typeError.message || "물품 등록에 실패했습니다.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ImagePreview[] = Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-50 border-gray-500 text-black p-8">
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input
              {...register("title", { required: "상품명을 입력해주세요." })}
              placeholder="상품명"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            <Input
              {...register("authorName")}
              placeholder="작가"
            />
            {errors.authorName && (
              <p className="text-red-500 text-sm">{errors.authorName.message}</p>
            )}

            <Input
              {...register("publisher")}
              placeholder="출판사"
            />
            {errors.publisher && (
              <p className="text-red-500 text-sm">{errors.publisher.message}</p>
            )}

            <Input
              type="number"
              {...register("price", { required: "가격을 입력해주세요." })}
              placeholder="가격"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}

            <Input
              type="number"
              {...register("quantity", { required: "수량을 입력해주세요." })}
              placeholder="수량"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}

            <Textarea
              {...register("description", {
                required: "상품 설명을 입력해주세요.",
              })}
              placeholder="상품 설명"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              rules={{ required: "카테고리를 선택해주세요." }}
              render={({ field }) => (
                <>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="border border-white"
                        placeholder="카테고리 선택"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((category) => category.id !== ALL_CATEGORY_ID)
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="text-red-500 text-sm">
                      {errors.categoryId.message}
                    </p>
                  )}
                </>
              )}
            />

            {/* New Image Upload Section */}
            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map(({ previewUrl }, index) => (
                  <div key={index} className="relative">
                    <img
                      src={previewUrl}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-md cursor-pointer hover:border-gold">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-400">
                    Upload Image
                  </span>
                  <Input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "등록 중..." : "등록"}
            </Button>
            {submissionError && (
              <p className="text-red-500 text-sm">{submissionError}</p>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};
