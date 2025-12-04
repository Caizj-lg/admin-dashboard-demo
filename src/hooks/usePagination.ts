import { useState, useMemo } from 'react';
import { TABLE_CONFIG } from '../constants/table-config';

/**
 * 分页逻辑 Hook
 */
export function usePagination<T>(data: T[], defaultPageSize = TABLE_CONFIG.DEFAULT_PAGE_SIZE) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // 计算总页数
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data.length, pageSize]);

  // 获取当前页数据
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  // 跳转到指定页
  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  // 上一页
  const goToPrevPage = () => {
    goToPage(currentPage - 1);
  };

  // 下一页
  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  // 重置分页
  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    currentData,
    setPageSize,
    goToPage,
    goToPrevPage,
    goToNextPage,
    resetPagination,
  };
}
