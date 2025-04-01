// src/utils/search.js
export const advancedSearch = (items, searchTerm) => {
    if (!searchTerm) return items;
  
    // Split the search term into parts
    const terms = searchTerm.toLowerCase().split(/\s+/);
    let exactPhrases = [];
    let excludeTerms = [];
    let includeTerms = [];
  
    // Parse the search terms
    let currentPhrase = "";
    let inQuotes = false;
  
    terms.forEach((term) => {
      if (term.startsWith('"') && term.endsWith('"')) {
        exactPhrases.push(term.slice(1, -1));
      } else if (term.startsWith('"')) {
        inQuotes = true;
        currentPhrase = term.slice(1);
      } else if (term.endsWith('"')) {
        inQuotes = false;
        currentPhrase += " " + term.slice(0, -1);
        exactPhrases.push(currentPhrase);
        currentPhrase = "";
      } else if (inQuotes) {
        currentPhrase += " " + term;
      } else if (term.startsWith("-")) {
        excludeTerms.push(term.slice(1));
      } else {
        includeTerms.push(term);
      }
    });
  
    // Filter items
    return items.filter((item) => {
      const text = item.query ? item.query.toLowerCase() : item.toLowerCase();
  
      // Check for exact phrases
      if (exactPhrases.length > 0) {
        const hasAllPhrases = exactPhrases.every((phrase) => text.includes(phrase));
        if (!hasAllPhrases) return false;
      }
  
      // Check for excluded terms
      if (excludeTerms.length > 0) {
        const hasExcluded = excludeTerms.some((term) => text.includes(term));
        if (hasExcluded) return false;
      }
  
      // Check for included terms
      if (includeTerms.length > 0) {
        const hasIncluded = includeTerms.every((term) => text.includes(term));
        if (!hasIncluded) return false;
      }
  
      return true;
    });
  };