export const setPaginationParams = (
  page: number,
  rowsPerPage: number,
  searchParams: any,
  setSearchParams: (value: any) => void
) => {
  const queryParams = Object.fromEntries(searchParams.entries());
  queryParams.page = page.toString();
  queryParams.limit = rowsPerPage.toString();
  setSearchParams(queryParams);
};

export const getPaginationParams = (
  location: any,
  setPage: (value: number) => void,
  setLimit: (value: number) => void
) => {
  const queryParams = location.search;

  const params = new URLSearchParams(queryParams);

  // Extract the values
  const queryPage = params.get("page");
  const queryLimit = params.get("limit");

  setPage(Number(queryPage ?? 1));
  setLimit(Number(queryLimit ?? 10));
};