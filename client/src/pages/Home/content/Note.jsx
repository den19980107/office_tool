import React from 'react'
import Editor from "rich-markdown-editor";
export default function Note() {
    return (
        <div style={{ display: "flex", height: "100%" }}>
            <div style={{ width: "20%", height: "100%" }}>

            </div>
            <div style={{ width: "80%", padding: "1rem 1rem 1rem 2.5rem", height: "100%", background: "rgb(23,25,25)" }}>
                <Editor
                    dark={true}
                    defaultValue=""
                />
            </div>
        </div>
    )
}
