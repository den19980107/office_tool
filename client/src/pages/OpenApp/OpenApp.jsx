import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
export default function OpenApp({ match }) {
    const url = atob(match.url.replace("/", ""))
    const [isMatch, setIsMatch] = useState(false)
    useEffect(() => {
        openApp()
    }, [])

    const getScriptList = async () => {
        let applications = await (await axios.get(`/api/script/applications`)).data.data
        return applications
    }

    const openApp = async () => {
        let applications = await getScriptList();
        for (let i = 0; i < applications.length; i++) {
            if (url.startsWith(applications[i].applicationId)) {
                setIsMatch(true)
                await waitUntilClose(url)
                window.close();
                break;
            }
        }
    }

    async function waitUntilClose(url) {
        return await new Promise(resolve => {
            let win = window.open(url, "_blank");
            let timer = setInterval(async function () {
                if (win.closed) {
                    clearInterval(timer);
                    resolve(true);
                }
            }, 500);
        });
    }
    return (
        <div>
            {isMatch ? url : <h1>url 錯誤！</h1>}
        </div>
    )
}
