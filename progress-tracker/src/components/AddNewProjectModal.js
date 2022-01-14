import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Card, CardContent, Fab, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const addStyle = {
    backgroundColor: "#61dafb"
}

export default function AddNewProjectModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [adminEmail, setAdminEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const object =
            {name: name,
            ownerEmail: ownerEmail,
            adminEmail: adminEmail}
        fetch("/project/add", {
            method: "POST",
            body: JSON.stringify(object),
            headers: {"Content-Type": "application/json"}
        })
            .then( ()=> handleClose())
        props.addNumberOfChanges(props.numberOfChanges + 1)
    }


    return (
        <div>

            <Card elevation={0}
                  sx={{minWidth: 275}}
                  style={{backgroundColor: "#5F636770"}}
                  onClick={handleOpen}
            >
                <CardContent>
                    <Fab style={addStyle} aria-label={"add"} variant={"extended"}>
                        Add new Project
                        <AddIcon sx={{ mr: 1 }}/>
                    </Fab>
                </CardContent>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new project
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                        <Box display={"flex"} alignItems={"center"} flexDirection={"column"} gap={1}>
                            <TextField
                                helperText="Project's name"
                                id="demo-helper-text-aligned"
                                label="Name"
                                onChange={(e) => setName(e.target.value)}

                            />
                            <TextField
                                helperText="Project owner's email"
                                id="demo-helper-text-aligned"
                                label="Email"
                                onChange={(e) => setOwnerEmail(e.target.value)}
                            />
                            <TextField
                                helperText="Project admin's email"
                                id="demo-helper-text-aligned"
                                label="Email"
                                onChange={(e) => setAdminEmail(e.target.value)}
                            />
                            <Button variant="contained" color="success" type={"submit"} onClick={handleSubmit}>
                                Create
                            </Button>
                        </Box>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
