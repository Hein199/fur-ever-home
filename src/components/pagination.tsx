import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

const AppPagination = ({
  page,
  totalPage,
}: {
  page: number;
  totalPage: number;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${Math.min(totalPage, Math.max(1, page - 1))}`}
          />
        </PaginationItem>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((i) => (
          <PaginationItem key={i}>
            <PaginationLink href={`?page=${i}`} isActive={i === page}>
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={`?page=${Math.min(totalPage, page + 1)}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;