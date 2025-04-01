// src/components/QueryEditor.jsx

import { useQuery } from "../context/QueryContext";
import styled from "styled-components";

const EditorWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  height: 200px;
  min-height: 200px; /* Prevents layout shift */
  overflow: hidden; /* Avoids content jumping */
  @media (max-width: 768px) {
    height: 150px;
    min-height: 150px;
  }
`;

// Lazy load MonacoEditor
import { lazy, Suspense } from "react";
const MonacoEditor = lazy(() => import("react-monaco-editor"));

const QueryEditor = () => {
  const { currentQuery, setCurrentQuery } = useQuery();

  return (
    <EditorWrapper>
      <Suspense fallback={<div>Loading Editor...</div>}>
        <MonacoEditor
          height="100%"
          language="sql"
          theme="vs-light"
          value={currentQuery}
          onChange={(value) => setCurrentQuery(value)}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            readOnly: false,
          }}
          onPaste={(e) => {
            e.stopPropagation(); // Allow paste events
          }}
        />
      </Suspense>
    </EditorWrapper>
  );
};

export default QueryEditor;
