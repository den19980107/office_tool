import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
}));

export default function CreateScript() {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div style={{ display: "flex", justifyContent: "stretch", flexDirection: "column", height: "100%" }}>
            <h1 style={{ color: "#C4C4C4" }}>新增腳本</h1>
            <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: "#C4C4C4", fontSize: "26px" }}>腳本名稱</span>
            </div>
            <div style={{ marginBottom: "2rem" }}>
                <Input size="small" placeholder=" 請輸入腳本名稱" variant="filled" fullWidth />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#C4C4C4", fontSize: "26px" }}>流程</span>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    <AddIcon />
                    新增應用程式
                </Button>
            </div>

            <div style={{ marginBottom: "0.5rem", background: "#39393A", minHeight: "400px" }}>
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
                        <ModalContent></ModalContent>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

const ModalContent = () => {
    return (
        <div style={{ display: "flex", justifyContent: "stretch", flexDirection: "column", height: "100%" }}>
            <h1 style={{ color: "#C4C4C4" }}>新增應用程式</h1>
            <div style={{ display: "flex", height: "100%" }}>
                <div style={{ background: "#353535", width: "25%", height: "100%" }}>
                </div>
                <div style={{ width: "75%", height: "100%" }}>
                </div>
            </div>
        </div>
    )
}