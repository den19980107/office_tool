type application = {
    applicationId: string,
    name: string,
    icon: string,
    openUrl: string
}


const applications: Array<application> = [
    {
        applicationId: "vscode",
        name: "Visual Studio Code",
        icon: "http://shrinklink.ga/sBia99Wgz",
        openUrl: "vscode://file"
    },
    {
        applicationId: "word",
        name: "MicroSoft Word",
        icon: "http://shrinklink.ga/AUYxLBDtp",
        openUrl: "ms-word:ofv|u|file://"
    },
    {
        applicationId: "powerpoint",
        name: "MicroSoft PowerPoint",
        icon: "http://shrinklink.ga/1Z0pG8qmh",
        openUrl: "ms-powerpoint:ofv|u|file://"
    },
    {
        applicationId: "excel",
        name: "MicroSoft Excel",
        icon: "http://shrinklink.ga/1Vok-VWAw",
        openUrl: "ms-excel:ofv|u|file://"
    },
    {
        applicationId: "postman",
        name: "Postman",
        icon: "http://shrinklink.ga/yY1RUw3Rm",
        openUrl: "postman:"
    },
    {
        applicationId: "line",
        name: "Line",
        icon: "http://shrinklink.ga/Gc-OifP7I",
        openUrl: "line:"
    }
]


export default applications