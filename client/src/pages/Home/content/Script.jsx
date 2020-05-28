import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button';
import history from '../../../history';
import axios from 'axios';
import config from '../../../config/default';
import UserProvider from '../../../context/UserProvider';

export default function Script() {
    const [scripts, setScripts] = useState([]);
    const user = useContext(UserProvider.context);
    useEffect(() => {

        getScriptData();

    }, [])

    const getScriptData = async () => {
        let res = await axios.get(`/api/script/user`);
        setScripts(res.data.data)
    }

    const openApp = async (script) => {
        let contents = script.contents
        console.log(contents)

        for (let i = 0; i < contents.length; i++) {
            window.open(`/${btoa(contents[i].url)}`, "_blank");
        }
    }

    async function waitUntilClose(url) {
        return await new Promise(resolve => {
            let win = window.open("/app", "'_blank'");

            let timer = setInterval(async function () {
                if (win.closed) {
                    clearInterval(timer);
                    await delay(5000)
                    resolve(true);
                }
            }, 500);
        });
    }

    const delay = (interval) => {
        return new Promise((resolve) => {
            setTimeout(resolve, interval);
        });
    };

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
            {scripts.map((script, idx) => (
                <Button key={idx} variant="contained" color="primary" style={{ fontSize: "35px", margin: "0 1rem 1rem 0" }} onClick={() => openApp(script)}>
                    {script.name}
                </Button>
            ))}
        </div>
    )
}