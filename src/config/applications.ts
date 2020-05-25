type application = {
    appicationId: string,
    name: string,
    icon: string,
    openUrl: string
}


const applications: Array<application> = [
    {
        appicationId: "vscode",
        name: "vscode",
        icon: "",
        openUrl: "vscode://file"
    },
    {
        appicationId: "word",
        name: "word",
        icon: "",
        openUrl: "ms-word:ofv|u|file://"
    },
    {
        appicationId: "powerpoint",
        name: "powerpoint",
        icon: "",
        openUrl: "ms-powerpoint:ofv|u|file://"
    },
    {
        appicationId: "excel",
        name: "excel",
        icon: "",
        openUrl: "ms-excel:ofv|u|file://"

    }
]


export default applications