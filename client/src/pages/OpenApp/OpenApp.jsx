import React from 'react'
import { useEffect } from 'react'
import history from '../../history'

export default function OpenApp({ match }) {
    const url = atob(match.url.replace("/app/", ""))
    useEffect(() => {
        openApp()
    }, [])

    const openApp = async () => {
        await waitUntilClose(url)
        window.close();
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
            {url}
        </div>
    )
}
