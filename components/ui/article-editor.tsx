"use client";

import Editor from "@/components/shared/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useRef, useState } from "react";

// Define Quill module interfaces for TypeScript
interface QuillRange {
  index: number;
  length: number;
}

interface QuillToolbar {
  addHandler: (format: string, handler: () => void) => void;
}

interface ArticleEditorProps {
  content: string;
  onChange: (content: string) => void;
  initialContent?: string;
}

export function ArticleEditor({ content, onChange, initialContent }: ArticleEditorProps) {
  const quillRef = useRef<Quill>(null);
  const editorInitialized = useRef(false);
  const [readOnly, setReadOnly] = useState(false);
  const [range, setRange] = useState<any>();
  const [lastChange, setLastChange] = useState<any>();
  const Delta = Quill.import('delta');

  // When content changes in the editor, update the content state
  const handleContentChange = (delta: any, oldDelta: any, source: string) => {
    setLastChange(delta);
    if (quillRef.current) {
      onChange(quillRef.current.root.innerHTML);
    }
  };

  return (
    <Tabs defaultValue="editor">
      <TabsList className="mb-4">
        <TabsTrigger value="editor">Rich Editor</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="editor">
        <div>
          <Editor
            ref={quillRef}
            readOnly={readOnly}
            defaultValue={initialContent ? initialContent : new Delta()
              .insert('Hello')
              .insert('\n', { header: 1 })
              .insert('Start writing your article here...')
              .insert('\n')}
            onSelectionChange={setRange}
            onTextChange={handleContentChange}
          />
          <div className="flex border border-t-0 border-gray-300 p-2.5">
            <label className="flex items-center">
              Read Only:{' '}
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => setReadOnly(e.target.checked)}
                className="ml-2"
              />
            </label>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="preview">
        <div className="prose max-w-none border rounded-md p-4 min-h-[300px]">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p className="text-muted-foreground">No content to preview</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
} 