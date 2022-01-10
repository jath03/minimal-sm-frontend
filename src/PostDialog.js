import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [img_url, setImg_url] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handlePost = () => {
        setOpen(false);
        let data = new FormData()
        data.append("title", title);
        data.append("user", username);
        data.append("content", content);
        data.append("image-url", img_url);
        fetch("http://localhost:8787/posts", {
            method: 'POST',
            body: data
        });
        props.updater();
    };

    return (
        <div>
            <Fab sx={{ bottom: 50, right: 50, position: "fixed" }}color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Post</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="user"
                            label="User Name"
                            fullWidth
                            variant="standard"
                            onChange={(event) => { setUsername(event.target.value); }}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="title"
                            label="Post Title"
                            fullWidth
                            variant="standard"
                            onChange={(event) => { setTitle(event.target.value); }}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="content"
                            label="Post Content"
                            fullWidth
                            variant="standard"
                            multiline
                            rows={4}
                            onChange={(event) => { setContent(event.target.value); }}
                        />
                        <TextField
                            margin="dense"
                            id="image"
                            label="Image URL"
                            type="url"
                            fullWidth
                            variant="standard"
                            onChange={(event) => { setImg_url(event.target.value); }}
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handlePost}>Post</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
