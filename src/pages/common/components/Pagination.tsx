import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onClick: (page: number | "prev" | "next") => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onClick,
}) => {
  // 표시할 페이지 계산
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);
  const pages = [
    1, // 항상 1페이지는 추가
    ...(startPage > 2 ? ["..."] : []), // 1페이지와 표시 구간 사이가 멀면 "..."
    ...Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx),
    ...(endPage < totalPages - 1 ? ["..."] : []), // 표시 구간과 마지막 페이지 사이가 멀면 "..."
    totalPages > 1 ? totalPages : null, // 마지막 페이지 추가 (1페이지일 경우 제외)
  ].filter(Boolean);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4 text-black">
      {/* 이전 버튼 */}
      <Button
        onClick={() => onClick("prev")}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed text-gray-500 border border-gray-300"
            : "bg-yellow-400 hover:bg-yellow-500 text-white border border-gray-300"
        }`}
      >
        &lt;
      </Button>

      {/* 페이지 버튼 */}
      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <Button
            key={idx}
            onClick={() => onClick(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-yellow-400 text-white font-bold border border-yellow-500"
                : "bg-gray-100 hover:bg-yellow-400 hover:text-white text-gray-700 border border-gray-300"
            }`}
          >
            {page}
          </Button>
        ) : (
          <span key={idx} className="px-3 py-1 text-gray-500">
            ...
          </span>
        )
      )}

      {/* 다음 버튼 */}
      <Button
        onClick={() => onClick("next")}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed text-gray-500 border border-gray-300"
            : "bg-yellow-400 hover:bg-yellow-500 text-white border border-gray-300"
        }`}
      >
        &gt;
      </Button>
    </div>
  );
};
