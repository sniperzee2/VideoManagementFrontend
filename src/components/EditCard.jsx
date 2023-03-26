import { DialogContent, DialogTitle, FormGroup, TextField } from "@mui/material";
import { forwardRef } from "react";
import { useState } from "react";
const EditCard = forwardRef((props, ref) => {
    return (<>
        <DialogTitle>Edit Form</DialogTitle>
        <DialogContent>
            <FormGroup sx={{ pt: "1rem", gap: '1rem' }} ref={ref}>
                <TextField
                    helperText="Please enter video name (required)"
                    label="name"
                    required
                    defaultValue={props.title}
                />
                <TextField
                    helperText="Please enter embed link of the video (required)"
                    label="link"
                    required
                    defaultValue={props.link}
                />
            </FormGroup>
        </DialogContent>
    </>)
})

export default EditCard
