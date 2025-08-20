'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  className?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showPageNumbers = true,
  className = "" 
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic for larger sets
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Mobile: Compact pagination */}
      <div className="flex items-center justify-center space-x-2 md:hidden">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 text-sm font-medium text-text-secondary hover:text-primary disabled:text-text-muted disabled:cursor-not-allowed transition-all duration-300 border border-border hover:border-primary disabled:border-border-light rounded touch-manipulation"
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <div className="px-4 py-2 text-sm font-medium text-text-primary bg-white border border-border rounded">
          {currentPage} / {totalPages}
        </div>
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 text-sm font-medium text-text-secondary hover:text-primary disabled:text-text-muted disabled:cursor-not-allowed transition-all duration-300 border border-border hover:border-primary disabled:border-border-light rounded touch-manipulation"
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      
      {/* Desktop: Full pagination */}
      <div className="hidden md:flex items-center justify-center space-x-2">
        {/* Previous Button - Desktop */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary disabled:text-text-muted disabled:cursor-not-allowed transition-colors duration-300"
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-text-muted">
                    ...
                  </span>
                );
              }

              const pageNum = page as number;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 min-w-[40px] ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-primary hover:bg-gray-50'
                  }`}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary disabled:text-text-muted disabled:cursor-not-allowed transition-colors duration-300"
          aria-label="Next page"
        >
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      
      {/* Page Info - Always visible */}
      <div className="text-sm text-text-muted text-center">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
