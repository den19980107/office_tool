import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import history from '../../history';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 240,
        height: '100%',
        color: "white",
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Navigator() {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const classes = useStyles();

    const handleChangeTab = (index, tabName) => {
        setSelectedIndex(index);
        history.push(`/home/${tabName}`)
    }
    return (
        <List
            component="nav"
            aria-labelledby="功能清單"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    功能清單
                </ListSubheader>
            }
            className={classes.root}
        >
            <ListItem
                button
                onClick={() => handleChangeTab(1, "script")}
                selected={selectedIndex === 1}
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="設定腳本" />
            </ListItem>
            <ListItem
                button
                onClick={() => handleChangeTab(2, "todo")}
                selected={selectedIndex === 2}
            >
                <ListItemIcon>
                    <PlaylistAddIcon />
                </ListItemIcon>
                <ListItemText primary="代辦事項" />
            </ListItem>
            <ListItem
                button
                onClick={() => handleChangeTab(3, "note")}
                selected={selectedIndex === 3}
            >
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="筆記" />
            </ListItem>
            <ListItem
                button
                onClick={() => handleChangeTab(4, "workingHourCalculator")}
                selected={selectedIndex === 4}
            >
                <ListItemIcon>
                    <AccessAlarmsIcon />
                </ListItemIcon>
                <ListItemText primary="工時計算" />
            </ListItem>
        </List>

    );
}
