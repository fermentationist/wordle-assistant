import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CustomDialog from "../CustomDialog";
import Typography from "@mui/material/Typography";
import {styled as muiStyled} from "@mui/material/styles";

const StyledBox = muiStyled(Box)`
  margin: 1em;
`;

const CustomAlert = ({message, closeDialog, showDialog, title}) => {
  return (
    <CustomDialog
      showDialog={showDialog}
      closeDialog={closeDialog}
      title={title}
    >
      <Stack>
        <StyledBox>
          <Typography>
            {message}
          </Typography>
        </StyledBox>
        <Button onClick={closeDialog}>Close</Button>
      </Stack>
    </CustomDialog>
  );
}

export default CustomAlert;
