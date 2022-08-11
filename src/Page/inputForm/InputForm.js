import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PreLoader from "../../PreLoder/PreLoader";
import { userCreateData } from "../../redux/feature/userDataSlice";

const InputForm = () => {
  const { loginData } = useSelector((state) => state.persistedReducer);
  const { dataAdd, loading } = useSelector(
    (state) => state.rootReducer.userReducer
  );
  const [inputs, setInputs] = useState({});
  const [userImage, setUserImage] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    setUserImage(file);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', inputs.name);
    formData.append('phone', inputs.phone);
    formData.append('email', loginData.user || loginData);
    formData.append('image', userImage);

    
    dispatch(userCreateData(formData));

    dataAdd === true &&
      Swal.fire({
        icon: "success",
        title: "New Data Add Success",
        showConfirmButton: false,
        timer: 1500,
      });

    dataAdd === false &&
      Swal.fire({
        icon: "error",
        title: "New Data Add not found",
        showConfirmButton: false,
        timer: 1500,
      });
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 10 }}>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box>
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label="Name"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box>
                  <TextField
                    name="phone"
                    type="text"
                    id="phone"
                    label="phone"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="contained"
                  component="label"
                  endIcon={<AddPhotoAlternateIcon />}
                >
                  Upload
                  <input
                    hidden
                    name="image"
                    accept="image/*"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </Button>
                
              </Grid>
              <Grid item xs={12} md={3}>
                {loading ? (
                  <PreLoader />
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<AddIcon />}
                    color="success"
                  >
                    Add
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Container>
  );
};

export default InputForm;