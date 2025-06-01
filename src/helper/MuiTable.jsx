"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import useRequest from "@component/hooks/UseRequest";
import { apis } from "@component/apiendpoints/api";

const columns = [
    { id: "name", label: "USER Name", minWidth: 170 },
    { id: "user_country", label: "Country", minWidth: 100 },
    { id: "user_email", label: "Email", minWidth: 170, align: "right" },
    {
        id: "createdAt",
        label: "Created",
        minWidth: 170,
        align: "right",
        format: (value) => {
            const date = new Date(value);
            return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date.getFullYear()}`;
        },
    },
    { id: "Action", label: "Action", minWidth: 170, align: "right" },
];

export default function StickyHeadTable({ applied_users,setIsTrue,setShowModal }) {
    const {request,response,loading} = useRequest(true);
    const [page, setPage] = React.useState(0);
    const { countryData } = useSelector((state) => state.siteSetting);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);


    const findCountryName = (countryId) => {

        const country = countryData?.find((c) => c._id === countryId);

        return country ? country.country
            : "Unknown";
    };

    const handleOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleConfirm = () => {
        request("PUT",`${apis.DECLARE_WINNER_HOLIDAY}/${selectedUser?._id}`) 
    };

    React.useEffect(()=>{
        if(response){
            setIsTrue(true)
            setShowModal(false)
            handleClose();
        }
    },[response])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applied_users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {columns.map((column) => {
                                        let value = row[column.id];
                                        if (column.id === "name") {
                                            value = `${row.first_name} ${row.last_name}`;
                                        } else if (column.id === "user_country") {
                                            value = findCountryName(value);
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === "Action" ? (
                                                    <Button
                                                        variant="contained"
                                                        sx={{ backgroundColor: "red", color: "white" }}
                                                        onClick={() => handleOpen(row)}
                                                    >
                                                        Select
                                                    </Button>
                                                ) : column.format ? (
                                                    column.format(value)
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={applied_users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        Are you sure you want to declare {selectedUser?.first_name} as a winner?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Button variant="contained" color="success" onClick={handleConfirm}>
                            Yes
                        </Button>
                        <Button variant="contained" color="error" onClick={handleClose}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
