import { useState } from "react";
import { DaumPostcode } from "./DaumPostcode";

export const AddressSearch = () => {
  const [address, setAddress] = useState<string>("");
  console.log(address);

  const handleAddressComplete = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  return (
    <div className="address-search">
      <DaumPostcode onComplete={handleAddressComplete} />
      {/* {address && <p>선택된 주소: {address}</p>} */}
    </div>
  );
};
