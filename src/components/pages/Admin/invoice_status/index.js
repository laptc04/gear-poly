import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    status_name: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/statusBill/${id}`)
        .then((response) => {
          const invoiceStatus = response.data;
          setInitialValues({
            status_name: invoiceStatus.status_name || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching invoiceStatus data:", error);
        });
    }
  }, [id]);

  const handleFormSubmit = async (values) => {
    try {
      const apiCall = id
        ? axios.put(`http://localhost:8080/api/statusBill/${id}`, values)
        : axios.post(`http://localhost:8080/api/statusBill`, values);

      await apiCall;
      toast.success(
        id ? "Cập nhật trạng thái thành công!" : "Thêm trạng thái thành công!"
      );
      setTimeout(() => navigate("/admin/invoice-status"), 1500);
    } catch (error) {
      console.error(
        "Request failed:",
        error.response || error.message || error
      );
      toast.error(
        id ? "Cập nhật trạng thái thất bại!" : "Thêm trạng thái thất bại!"
      );
    }
  };

  return (
    <Box p="2%" m="20px">
      <Typography variant="h4" mb="20px">
        {id ? "Chỉnh sửa trạng thái" : "Thêm trạng thái"}
      </Typography>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={categorySchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="grid" gap="20px">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Tên trạng thái"
                    name="status_name"
                    value={values.status_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.status_name && !!errors.status_name}
                    helperText={touched.status_name && errors.status_name}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
              >
                {id ? "Cập nhật trạng thái" : "Thêm trạng thái"}
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => navigate("/admin/invoice-status")}
                sx={{ mt: 2 }}
              >
                Trở về
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <ToastContainer />
    </Box>
  );
};

const categorySchema = yup.object().shape({
  status_name: yup.string().required("Tên trạng thái là bắt buộc"),
});

export default InvoiceStatus;
