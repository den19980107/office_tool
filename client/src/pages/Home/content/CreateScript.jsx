import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import axios from 'axios';
import config from '../../../config/default';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#3E3E3E",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "80%",
        height: "80%"
    },
    list: {
        width: '25%',
        height: '100%',
        color: "white",
        overflow: "auto",
        fontSize: 36,
        backgroundColor: "#353535",
    }
}));

export default function CreateScript() {
    const [open, setOpen] = useState(false);
    const [instructions, setInstruction] = useState([]);
    const [name, setName] = useState("");
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addInstruction = (instruction) => {
        let newInstruction = [...instructions]
        newInstruction.push(instruction)
        setInstruction(newInstruction)
    }

    const createNewScript = async () => {
        const data = {
            name: name,
            contents: instructions
        }
        let res = await axios.post(`/api/script/create`, data);
        console.log(res)
    }
    return (
        <div style={{ display: "flex", justifyContent: "stretch", flexDirection: "column", height: "100%" }}>
            <h1 style={{ color: "#C4C4C4" }}>新增腳本</h1>
            <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: "#C4C4C4", fontSize: "26px" }}>腳本名稱</span>
            </div>
            <div style={{ marginBottom: "2rem" }}>
                <Input value={name} onChange={(e) => setName(e.target.value)} size="small" placeholder=" 請輸入腳本名稱" variant="filled" fullWidth />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#C4C4C4", fontSize: "26px" }}>流程</span>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    <AddIcon />
                    新增應用程式
                </Button>
            </div>

            <div style={{ marginBottom: "0.5rem", background: "#39393A", minHeight: "400px" }}>
                {instructions.map((instruction, idx) => (
                    <div key={idx} style={{ display: "inline-flex", background: "#838383", borderRadius: "1rem", margin: "1rem", overflow: "hidden" }}>
                        <div style={{ background: "black", padding: "1rem", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <img style={{ width: "3rem", height: "3rem" }} src={instruction.icon}></img>
                        </div>
                        <div style={{ padding: "1rem", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <h3 style={{ color: "white", padding: 0, margin: 0 }}>{instruction.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" onClick={createNewScript}>新增</Button>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ModalContent onSubmit={addInstruction}></ModalContent>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

const ModalContent = ({ onSubmit }) => {
    const [applications, setApplications] = useState([]);
    const [selectedAppication, setSelectedAppication] = useState(null);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const classes = useStyles();

    useEffect(() => {
        getScriptList()
    }, [])

    const getScriptList = async () => {
        let applications = await (await axios.get(`/api/script/applications`)).data.data
        console.log(applications)
        setApplications(applications)
        setSelectedAppication(applications[0])
    }
    const handelSelectApp = (app) => {
        setSelectedAppication(app)
    }

    const addInstruction = () => {
        onSubmit({
            name,
            url: `${selectedAppication.openUrl}/${url}`,
            applicationId: selectedAppication.applicationId,
            icon: selectedAppication.icon
        })
    }
    return (
        <div style={{ display: "flex", justifyContent: "stretch", flexDirection: "column", height: "100%" }}>
            <h1 style={{ color: "#C4C4C4", height: "10%" }}>新增應用程式</h1>
            <div style={{ display: "flex", height: "90%" }}>
                <List className={classes.list} component="nav">
                    {selectedAppication && applications.map((app, idx) => (
                        <ListItem
                            key={idx}
                            selected={selectedAppication.applicationId === app.applicationId}
                            onClick={(event) => handelSelectApp(app)}
                        >
                            <ListItemAvatar>
                                <img style={{ width: "3rem", height: "3rem" }} src={app.icon} />
                            </ListItemAvatar>
                            <ListItemText style={{ marginLeft: "1rem" }} primary={app.name} />
                        </ListItem>
                    ))}
                </List>
                <div style={{ width: "75%", height: "100%" }}>
                    {selectedAppication &&
                        <div>
                            <div style={{ display: "flex" }}>
                                <div style={{ padding: "1rem", height: "104px", width: "104px" }}>
                                    <img style={{ width: "100%", height: "100%" }} src={selectedAppication.icon}></img>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", }}>
                                    <h1 style={{ padding: 0, margin: 0, marginTop: "-0.5rem", fontSize: "60px", color: "white" }}>{selectedAppication.name}</h1>
                                </div>
                            </div>
                            <div style={{ padding: "1rem" }}>
                                <div style={{ marginBottom: "0.5rem" }}>
                                    <span style={{ color: "#C4C4C4", fontSize: "20px" }}>請將要開起的檔案位址貼到下方輸入匡</span>
                                </div>
                                <div style={{ marginBottom: "4rem" }}>
                                    <Input size="small" placeholder="請輸入檔案位址" variant="filled" fullWidth onChange={(e) => setUrl(e.target.value)} />
                                </div>
                                <div style={{ marginBottom: "0.5rem" }}>
                                    <span style={{ color: "#C4C4C4", fontSize: "20px" }}>指令名稱</span>
                                </div>
                                <div style={{ marginBottom: "4rem" }}>
                                    <Input size="small" placeholder="請輸入指令名稱" variant="filled" fullWidth onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" color="primary" style={{ fontSize: "20px" }} onClick={addInstruction}>確認</Button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}