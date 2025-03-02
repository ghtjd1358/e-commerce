import { Star } from "lucide-react";

export const StarButton = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-5 h-5 fill-gold text-gold" />
        ))}
      </div>
      <span className="text-sm text-gray-400">(24 reviews)</span>
    </div>
  );
};
