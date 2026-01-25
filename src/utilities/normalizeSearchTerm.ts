export const normalizeSearchTerm = (term: string) => {
    if (!term) return '';
    return term.trim().replace(/\s+/g, ' ');
  };