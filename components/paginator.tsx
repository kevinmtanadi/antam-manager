"use client";

import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export default function Paginator({
  totalItems,
  rowsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / rowsPerPage));
  }, [totalItems, rowsPerPage]);

  // Generate page numbers to display
  const generatePagination = () => {
    // If total pages is 7 or less, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate range based on current page and sibling count
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Show dots when there's more than 1 page number hidden
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Default case: show first, last, and pages around current
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "leftDots", ...middleRange, "rightDots", totalPages];
    }

    // Show dots only on right side
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = Array.from({ length: 5 }, (_, i) => i + 1);
      return [...leftRange, "rightDots", totalPages];
    }

    // Show dots only on left side
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = Array.from(
        { length: 5 },
        (_, i) => totalPages - 4 + i
      );
      return [1, "leftDots", ...rightRange];
    }

    // Fallback to showing all pages (shouldn't reach here)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pages = generatePagination();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>

        {pages.map((page, index) => {
          if (page === "leftDots" || page === "rightDots") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
