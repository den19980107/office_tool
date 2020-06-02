import React from 'react'
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import marked from "marked";
import './markdown.css'

// import cmoponent
import { Icon } from 'antd';
const Spinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;

export default function Document() {
   const [markdown, setMarkdwon] = useState("")
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      const readmePath = require("./doc.md");

      fetch(readmePath)
         .then(response => {
            return response.text()
         })
         .then(text => {
            setLoading(false)
            setMarkdwon(text)
         })
   }, [])
   return (
      <div className="container pt-4" id="markdwon">
         {loading && <div style={{ display: "flex", justifyContent: "center" }}>{Spinner}</div>}
         <ReactMarkdown
            source={markdown}
            escapeHtml={false}
         />
      </div>
   )
}
