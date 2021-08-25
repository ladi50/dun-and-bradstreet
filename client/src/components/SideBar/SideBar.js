import { useEffect, useState } from "react";
import { AppBar, CssBaseline, Divider, Drawer, List, ListItem, Toolbar, IconButton } from "@material-ui/core";
import { Menu, ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search/Search";
import { getQueries, getQueryResults } from "../../store/actions";
import Highlight from "../Highlight/Highlight";

const SideBar = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [clickedQuery, setClickedQuery] = useState("");
    const { queries } = useSelector(store => store);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQueries());
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const searchQuery = (query) => {
        dispatch(getQueryResults(query, false));
        setClickedQuery(query);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <Menu />
                    </IconButton>
                    <Search clickedQuery={clickedQuery} />
                    <Highlight />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {queries?.length > 0 ? queries.map((query, index) => (
                            <ListItem button key={index} onClick={() => searchQuery(query)}>{query}</ListItem>
                        ))
                        : <div style={{ textAlign: "center", fontSize: "16px" }}>No queries found</div>
                    }
                </List>
            </Drawer>
        </div>
    );
};

export default SideBar;