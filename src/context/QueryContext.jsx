// src/context/QueryContext.jsx
import { createContext, useState, useContext } from "react";
import { mockQueries, initialQuery } from "../data/mockData";

const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [queries, setQueries] = useState(mockQueries);
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [queryHistory, setQueryHistory] = useState([]);
  const [result, setResult] = useState([]);

  const runQuery = () => {
    const matchedQuery = queries.find((q) => q.query === currentQuery);
    if (matchedQuery) {
      setResult(matchedQuery.result);
    } else {
      setResult([]);
    }
    setQueryHistory((prev) => [currentQuery, ...prev.slice(0, 9)]); // Keep last 10 queries
  };

  const saveQuery = () => {
    if (!queries.some((q) => q.query === currentQuery)) {
      setQueries((prev) => [
        ...prev,
        { id: prev.length + 1, query: currentQuery, result: [] },
      ]);
    }
  };

  const clearQuery = () => setCurrentQuery("");

  return (
    <QueryContext.Provider
      value={{
        queries,
        currentQuery,
        setQueryHistory,
        setQueries,
        setCurrentQuery,
        queryHistory,
        result,
        setResult,
        runQuery,
        saveQuery,
        clearQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
