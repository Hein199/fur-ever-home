"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  totalPage: number;
  onPageChange?: (page: number) => void;
}

const AppPagination = ({ page, totalPage, onPageChange }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());

    // Update URL
    router.push(`${pathname}?${params.toString()}`);

    // Call onPageChange if provided
    onPageChange?.(pageNumber);
  };

  // Only show up to 5 page numbers, with ellipsis if needed
  const getVisiblePages = () => {
    if (totalPage <= 7) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPage];
    }

    if (page >= totalPage - 2) {
      return [1, '...', totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    }

    return [1, '...', page - 1, page, page + 1, '...', totalPage];
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {getVisiblePages().map((pageNumber, i) => (
          <PaginationItem key={i}>
            {pageNumber === '...' ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(pageNumber as number)}
                isActive={pageNumber === page}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(Math.min(totalPage, page + 1))}
            className={page >= totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;