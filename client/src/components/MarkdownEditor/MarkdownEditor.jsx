import React from 'react'
import { useState, createRef } from 'react'
import Editor from "rich-markdown-editor";

export default function MarkdownEditor() {

    return (
        <Editor
            dark={true}
            defaultValue=""
        />
    )
}
