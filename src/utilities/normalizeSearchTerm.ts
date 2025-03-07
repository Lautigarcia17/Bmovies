export const normalizeSearchTerm = (term: string) => {
    return term.trim().replace(/\s+/g, ' ');
  };