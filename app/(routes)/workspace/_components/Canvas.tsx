"use client";

import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
function Canvas({
  onSaveTrigger,
  fileData,
  fileId,
}: {
  onSaveTrigger: any;
  fileData: FILE;
  fileId: any;
}) {
  const [whiteboardData, setWhiteboardData] = useState<any>();
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  useEffect(() => {
    onSaveTrigger && saveWhiteBoard();
  }, [onSaveTrigger]);
  const saveWhiteBoard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteboardData),
    }).then((resp) => console.log(resp));
  };
  return (
    <div style={{ height: "670px" }}>
      {fileData && (
        <Excalidraw
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteboardData(excalidrawElements)
          }
        />
      )}
    </div>
  );
}

export default Canvas;
