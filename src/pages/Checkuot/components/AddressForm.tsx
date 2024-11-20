// AddressForm.tsx
import { useState } from "react";
import { DaumPostcode } from "./DaumPostcode";
import { Home } from "lucide-react";
import { IUser } from "@/features/auth/types";

export const AddressForm = ({ user }: { user: IUser | null }) => {
  const [address, setAddress] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");

  const handleAddressComplete = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  const handleSubmit = () => {
    const fullAddress = `${address} ${detailedAddress}`;
    console.log("최종 주소:", fullAddress);
  };

  return (
    <div>
      <DaumPostcode onComplete={handleAddressComplete} />
      <div className="flex gap-2">
        <Home />
        <span>배송지 주소 : </span>
        <span>{user?.address ?? "주소 없음"}</span>
      </div>
      <input
        type="text"
        value={detailedAddress}
        onChange={(e) => setDetailedAddress(e.target.value)}
        placeholder="상세 주소"
        className="input"
      />
      <button onClick={handleSubmit} className="button">
        저장
      </button>
    </div>
  );
};
