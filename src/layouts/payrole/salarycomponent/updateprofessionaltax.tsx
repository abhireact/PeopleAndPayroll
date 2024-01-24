import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "components/MDButton";
import axios from "axios";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import React from "react";

const states = [
  "SELECT STATE",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi (National Capital Territory of Delhi)",
  "Puducherry",
  "Ladakh",
  "Lakshadweep",
];
interface AdditionalSlab {
  key: number;
  start_range: string;
  end_range: string;
  monthly_tax_amount: string;
}

// Define the initial value
const initialSlab: AdditionalSlab = {
  key: Date.now(),
  start_range: "0",
  end_range: "0",
  monthly_tax_amount: "0",
};
const Updates = (props: any) => {
  const { openUpdate, setOpenupdate, task } = props;
  const removeTaxSlab = (index: number) => {
    if (additionalSlabs.length > 1) {
      const updatedSlabs = [...additionalSlabs];
      updatedSlabs.splice(index, 1);
      setAdditionalSlabs(updatedSlabs);
    }
  };

  console.log(task, "task");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  const [additionalSlabs, setAdditionalSlabs] = useState<AdditionalSlab[]>([initialSlab]);

  // Function to add a new set of tax slabs
  const addTaxSlab = () => {
    setAdditionalSlabs((prevSlabs) => [
      ...prevSlabs,
      {
        key: Date.now(),
        start_range: "0",
        end_range: "0",
        monthly_tax_amount: "0",
      },
    ]);
  };
  const handleAdditionalSlabChange = (key: number, field: keyof AdditionalSlab, value: string) => {
    setAdditionalSlabs((prevSlabs) => {
      return prevSlabs.map((slab) => {
        if (slab.key === key) {
          return {
            ...slab,
            [field]: value,
          };
        }
        return slab;
      });
    });
  };

  const formik = useFormik({
    initialValues: {
      name: task.location_name,
      address_line1: task.add_line1,
      address_line2: task.add_line2,
      state: task.state,
      pincode: task.pincode,
      city: task.city,
      org_name: task.org_name,
      pt_number: "",
      deduction_cycle: "Monthly",
      start_range: "1",
      end_range: "999999",
      monthly_tax_amount: "0",
    },
    onSubmit: (values, action) => {
      //   console.log(values, "values");

      const taxSlabsData = additionalSlabs.map((slab) => ({
        start_range: slab.start_range,
        end_range: slab.end_range,
        monthly_tax_amount: slab.monthly_tax_amount,
      }));
      const requestData = {
        work_location: values.name,
        pt_number: values.pt_number,
        deduction_cycle: values.deduction_cycle,
        start_range: [...taxSlabsData.map((slab) => slab.start_range), values.start_range],
        end_range: [...taxSlabsData.map((slab) => slab.end_range), values.end_range],
        monthly_tax_amount: [
          ...taxSlabsData.map((slab) => slab.monthly_tax_amount),
          values.monthly_tax_amount,
        ],
      };

      axios
        .post("http://10.0.20.133:8001/mg_professional_tax", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("it is working", response);
          // window.location.reload();
        })
        .catch((error) => {
          console.log("error is occurred", error);
        });
      console.log(values);

      action.resetForm();
    },
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <MDBox p={4}>
          <Grid container spacing={2}>
            <Grid sm={6}>
              <MDInput
                sx={{ width: "90%" }}
                // id="email"
                variant="standard"
                name="name"
                label="Work Location"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid sm={6}>
              <Autocomplete
                sx={{ width: "90%" }}
                defaultValue={task.state}
                onChange={(event, value) => {
                  formik.handleChange({
                    target: { name: "state", value },
                  });
                }}
                options={states}
                renderInput={(params) => (
                  <FormField
                    label="States"
                    InputLabelProps={{ shrink: true }}
                    name="state"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid sm={6}>
              <MDInput
                sx={{ width: "90%" }}
                // id="email"
                variant="standard"
                name="pt_number"
                label="PT Number"
                value={formik.values.pt_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pt_number && Boolean(formik.errors.pt_number)}
                helperText={formik.touched.pt_number && formik.errors.pt_number}
              />
            </Grid>

            <Grid sm={6}>
              <MDInput
                sx={{ width: "90%" }}
                variant="standard"
                name="deduction_cycle"
                label="Deduction Cycle"
                value={formik.values.deduction_cycle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.deduction_cycle && Boolean(formik.errors.deduction_cycle)}
                helperText={formik.touched.deduction_cycle && formik.errors.deduction_cycle}
              />
            </Grid>
            <Grid sm={12}>
              <MDTypography sx={{ fontSize: 14 }} variant="span">
                Taxes slabs based on
              </MDTypography>

              <MDTypography sx={{ fontSize: 14, fontWeight: "bold" }} ml={1} variant="span">
                Monthly Salary
              </MDTypography>
            </Grid>
            <Grid container sx={{ fontSize: 14 }}>
              <Grid sm={4}>Start Range (₹)</Grid>

              <Grid sm={4}>End Range (₹)</Grid>

              <Grid sm={4}>Monthly Tax Amount (₹)</Grid>
              {additionalSlabs.map((slab, index) => (
                <React.Fragment key={slab.key}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <MDInput
                        name={`start_range_${index}`}
                        value={slab.start_range}
                        onChange={(e: { target: { value: any } }) =>
                          handleAdditionalSlabChange(slab.key, "start_range", e.target.value)
                        }
                        sx={{ width: "80%" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <MDInput
                        name={`end_range_${index}`}
                        a
                        value={slab.end_range}
                        onChange={(e: { target: { value: any } }) =>
                          handleAdditionalSlabChange(index, "end_range", e.target.value)
                        }
                        sx={{ width: "80%" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <MDInput
                        name={`monthly_tax_amount_${index}`}
                        value={slab.monthly_tax_amount}
                        onChange={(e: { target: { value: any } }) =>
                          handleAdditionalSlabChange(index, "monthly_tax_amount", e.target.value)
                        }
                        sx={{ width: "80%" }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDButton variant="text" color="error" onClick={() => removeTaxSlab(index)}>
                        Remove Slab
                      </MDButton>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <MDButton variant="text" color="info" onClick={addTaxSlab}>
                  + Additional Slabs
                </MDButton>
              </Grid>
            </Grid>

            <Grid mt={3}>
              <Button
                color="info"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid ml={2} mt={3}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </MDBox>
      </form>
    </Card>
  );
};

export default Updates;
