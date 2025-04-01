// src/components/QueryEditor.jsx
import MonacoEditor from "react-monaco-editor";
import { useQuery } from "../context/QueryContext";
import styled from "styled-components";

const EditorWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  height: 200px;
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const QueryEditor = () => {
  const { currentQuery, setCurrentQuery } = useQuery();

  return (
    <EditorWrapper>
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
        }}
      />
    </EditorWrapper>
  );
};

export default QueryEditor;