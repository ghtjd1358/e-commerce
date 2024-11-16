import { Button } from "@/pages/common/ui/button";
import React, { useEffect } from "react";

declare global {
  interface Window {
    daum: any;
  }
}

interface AddressProps {
  onComplete: (address: string) => void;
}

export const DaumPostcode: React.FC<AddressProps> = ({ onComplete }) => {
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddress = data.address;
        onComplete(fullAddress);
      },
    }).open();
  };

  useEffect(() => {
    if (!window.daum) {
      const script = document.createElement("script");
      script.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <Button type="button" onClick={openPostcode} className="button mt-3">
      주소 검색
    </Button>
  );
};
