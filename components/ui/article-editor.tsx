"use client";

import Editor from "@/components/shared/editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon } from "lucide-react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";

// Define Quill module interfaces for TypeScript
interface QuillRange {
  index: number;
  length: number;
}

interface QuillToolbar {
  addHandler: (format: string, handler: () => void) => void;
}

// Add Image Uploader module for Quill
const ImageUploader = {
  id: 'imageUploader',
  init: function(quill: Quill) {
    try {
      // Create toolbar button
      const toolbar = quill.getModule('toolbar') as QuillToolbar;
      
      toolbar.addHandler('image', function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        // When a file is selected
        input.onchange = async () => {
          if (!input.files || !input.files[0]) return;
          
          const file = input.files[0];
          
          try {
            // Create a temporary local preview
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result && quill) {
                const range = quill.getSelection() as QuillRange | null;
                if (range) {
                  quill.insertEmbed(range.index, 'image', event.target.result);
                } else {
                  // Insert at the end if no selection
                  quill.insertEmbed(quill.getLength(), 'image', event.target.result);
                }
              }
            };
            reader.readAsDataURL(file);
          } catch (error) {
            console.error('Error handling image:', error);
            alert('Failed to handle image. Please try again.');
          }
        };
      });
    } catch (error) {
      console.error('Error initializing image uploader:', error);
    }
  }
};

// Register the image upload module
Quill.register('modules/imageUploader', ImageUploader);

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

  // Set up the editor with image upload capability
  useEffect(() => {
    if (quillRef.current && !editorInitialized.current) {
      try {
        // Set up custom toolbar options if needed
        const toolbar = quillRef.current.getModule('toolbar') as QuillToolbar;
        
        toolbar.addHandler('image', function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();
          
          input.onchange = async () => {
            if (!input.files || !input.files[0]) return;
            
            const file = input.files[0];
            
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result && quillRef.current) {
                // Insert the image at current cursor position
                const range = quillRef.current.getSelection() as QuillRange | null;
                if (range) {
                  const imageUrl = event.target.result as string;
                  quillRef.current.insertEmbed(range.index, 'image', imageUrl);
                } else if (quillRef.current) {
                  // Insert at the end if no selection
                  const imageUrl = event.target.result as string;
                  quillRef.current.insertEmbed(quillRef.current.getLength(), 'image', imageUrl);
                }
              }
            };
            reader.readAsDataURL(file);
          };
        });
        
        editorInitialized.current = true;
      } catch (error) {
        console.error('Error setting up image handler:', error);
      }
    }
  }, [quillRef.current]);

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
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="ml-4"
              onClick={() => {
                // Manually trigger image upload
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();
                
                input.onchange = async (e: any) => {
                  if (!e.target?.files?.[0] || !quillRef.current) return;
                  
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target?.result && quillRef.current) {
                      const range = quillRef.current.getSelection() || { index: quillRef.current.getLength(), length: 0 };
                      quillRef.current.insertEmbed(range.index, 'image', event.target.result);
                    }
                  };
                  reader.readAsDataURL(file);
                };
              }}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Add Image
            </Button>
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