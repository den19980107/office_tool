import React from 'react'
import Button from '@material-ui/core/Button';
import history from '../../../history';

export default function Script() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 style={{ color: "#C4C4C4" }}>腳本清單</h1>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <Button variant="contained" color="primary" onClick={() => { history.push("/home/script/create") }}>
                        新增
                    </Button>
                </div>
            </div>
            <ScriptButton name="script-1"></ScriptButton>
        </div>
    )
}

const ScriptButton = ({ name }) => {
    return (
        <div style={{ width: "12rem", height: "6rem", background: "#5E5A5A", borderRadius: "1rem", display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ padding: "0", margin: "0", color: "white" }}>{name}</h2>
            </div>
        </div>
    )
}