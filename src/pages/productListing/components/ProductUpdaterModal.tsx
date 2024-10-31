import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ALL_CATEGORY_ID, categories } from "@/constants";
import { IProduct } from "@/lib/products/type";
import { uploadImage } from "@/utils/imageUpload";
import { useUpdateProductsStore } from "@/lib/products/hooks/useUpdateProducts";
import { X, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ProductUpdaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
}

interface ProductFormInputs {
  title: string;
  price: number;
  quantity: number;
  description: string;
  categoryId: string;
}

interface ImagePreview {
  file: File;
  previewUrl: string;
}

export const ProductUpdaterModal: React.FC<ProductUpdaterModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { mutateAsync, isPending: isLoading } = useUpdateProductsStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProductFormInputs>({
    defaultValues: {
      title: product.productName,
      price: product.productPrice,
      quantity: product.productQuantity,
      description: product.productDescription,
      categoryId: product.productCategory.id,
    },
  });

  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [existingImage, setExistingImage] = useState<string[]>(
    product.productImage || [],
  );

  const onSubmit = async (data: ProductFormInputs) => {
    setSubmissionError(null);
    try {
      let imageUrls: string[] = existingImage.filter(
        (img): img is string => img !== null,
      );

      if (images.length > 0) {
        const uploadedImages = await Promise.all(
          images.map(({ file }) => uploadImage(file)),
        );
        imageUrls = [
          ...imageUrls,
          ...uploadedImages.filter((url): url is string => url !== null),
        ];
      }

      const selectedCategory = categories.find(
        (category) => category.id === data.categoryId,
      );

      if (!selectedCategory) {
        throw new Error("유효한 카테고리를 선택해주세요.");
      }

      const updatedProduct: IProduct = {
        ...product,
        productName: data.title,
        productPrice: Number(data.price),
        productQuantity: Number(data.quantity),
        productDescription: data.description,
        productCategory: {
          id: selectedCategory.id,
          name: selectedCategory.name,
        },
        productImage: imageUrls,
        updatedAt: new Date().toISOString(),
      };

      await mutateAsync({
        productId: product.id,
        updatedProduct,
        existingImageUrl: product.productImage[0] || "",
      });

      reset();
      setImages([]);
      onClose();
    } catch (error) {
      const typeError = error as Error;
      console.error("물품 수정에 실패했습니다.", typeError);
      setSubmissionError(typeError.message || "물품 수정에 실패했습니다.");
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-gray-100 p-8">
        <DialogHeader>
          <DialogTitle className="text-yellow-500">상품 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input
              className="bg-gray-700 border-gray-600"
              {...register("title", { required: "상품명을 입력해주세요." })}
              placeholder="상품명"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <Input
              className="bg-gray-700 border-gray-600"
              type="number"
              {...register("price", { required: "가격을 입력해주세요." })}
              placeholder="가격"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
            <Input
              className="bg-gray-700 border-gray-600"
              type="number"
              {...register("quantity", { required: "수량을 입력해주세요." })}
              placeholder="수량"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
            <Textarea
              className="bg-gray-700 border-gray-600 resize-none"
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
                    <SelectContent className="bg-gray-700 border-gray-600">
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
            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImage.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Existing Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                ))}
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
              {isLoading ? "수정 중..." : "수정"}
            </Button>
            {submissionError && (
              <p className="text-red-500 text-sm">{submissionError}</p>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
