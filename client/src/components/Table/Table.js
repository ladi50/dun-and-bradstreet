import { useState } from 'react';
import { useSelector } from "react-redux";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';
import Spinner from "../Spinner/Spinner";
import "./Table.css";

const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'urk', label: 'URL', minWidth: 100 },
];

const ItemsTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { items, loading } = useSelector(state => state);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <Spinner />;

    if (items.length === 0) return <div className={"emptyTable"}>No items found.</div>;

    return (
        <Paper style={{ marginTop: "85px" }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell>
                                        <a href={item.FirstURL}>{item.Text}</a>
                                    </TableCell>
                                    <TableCell>
                                        {item.FirstURL}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ItemsTable;