import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {IConfirmDeleteModalProps} from "../../config/interfaces/props/IConfirmDeleteModalProps";

const ConfirmDeleteModal = ({
  close,
  submit,
  isOpen
}: IConfirmDeleteModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant={"outlined"}>Cancel</Button>
        <Button variant={"contained"} color={"error"} onClick={submit} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ConfirmDeleteModal;
