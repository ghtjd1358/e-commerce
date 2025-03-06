import { CreditCard, Home, PhoneIcon, User, UserCircle } from "lucide-react";
import { Button } from "@/pages/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";

export const ProfileSkeleton: React.FC = () => {

  return (
    <Card className="bg-white border border-gray-300 rounded-lg shadow-md animate-pulse mb-5">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gray-300">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[User, CreditCard, UserCircle, Home, PhoneIcon].map((Icon, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon className="w-5 h-5 text-gray-300" />
            <span className="text-gray-300 w-16">정보 :</span>
            <div className="h-5 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
        <Button
          disabled
          className="w-full h-10 bg-gray-200 rounded mt-2"
        ></Button>
      </CardContent>
    </Card>
  );
};
