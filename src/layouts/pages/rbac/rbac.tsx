import React, { useEffect, useState } from "react";

import { Tree, message } from "antd";
import type { DataNode, Key } from "rc-tree-select/es/interface";
import MainRoutes from "../../../mainrotes";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import axios from "axios";
import {
  Autocomplete,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Cookies from "js-cookie";
import { CheckBox } from "@mui/icons-material";
const token = Cookies.get("token");
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch } from "react-redux";
import { storeRBAC } from "Redux/action/dummyDataActions";
import FormField from "../account/components/FormField";

const Rbac = (props: any) => {
  const { setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };
  const { setOpenupdate2, editData2 } = props;
  // console.log(props, " editData2?.role_display_name,", editData2?.role_display_name);
  const initialValues = {
    sub_module_menu: [] as string[],
    organization_name: "",
    location_name: editData2?.location_name,
    role_name: editData2?.role_display_name,
    role_access: "",
    seeded: "",
    status: "",
    role_namepopup: "",
    role_short_code: "",
    role_display_name: "",
    description: "",
    access: [] as string[],
    access_create: [] as string[],
    access_read: [] as string[],
    access_update: [] as string[],
    access_delete: [] as string[],
  };
  const dispatched = useDispatch();

  const [editorcreate, setEditorcreate] = useState("create");
  const [roles, setRoles] = useState([]);
  const [mroles, setMRoles] = useState([]);
  const [worklocation, setWorklocation] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(["pay-sheadule"]);
  const [checkedKeystring, setCheckedKeystring] = useState();
  const [halfchecked, setHalfchecked] = useState([]);
  const [allchecked, setAllchecked] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rbacData, setRbacData] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log("valuess", values);
        action.resetForm();
        for (const key of checkedKeys) {
          console.log(key, checkedKeys, "checkedkey");
          // setCheckedKeystring(key.toString());
          initialValues.sub_module_menu.push(key.toString());
        }
        if (editorcreate === "create") {
          try {
            const response = await axios.post(
              "http://10.0.20.133:8000/mg_rbac",
              { ...values, sub_module_menu: allchecked },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 200) {
              console.log("Created Earning Successfully");
              // window.location.reload();
              setOpenupdate2(false);
            }
          } catch (error) {
            console.error("Error saving data:", error);
          }
        }
        if (editorcreate === "edit") {
          try {
            const response = await axios.put(
              "http://10.0.20.133:8000/mg_rbac",
              { ...values, sub_module_menu: allchecked },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 200) {
              console.log("Update Successfully");
              // window.location.reload();
              setOpenupdate2(false);
            }
          } catch (error) {
            console.error("Error saving data:", error);
          }
        }
      },
    });

  const treeData: DataNode[] = [];
  let count = 0;
  if (count === 0) {
    for (const item of MainRoutes) {
      if (item.collapse) {
        const module: any = {};
        module.title = item.name;
        module.key = item.key;
        const modulechildren = [];
        for (const subitem of item.collapse) {
          const submodule: any = {};
          submodule.title = subitem.name;
          submodule.key = subitem.key;
          submodule.children = [
            { title: "read", key: `${submodule.key}read` },
            { title: "update", key: `${submodule.key}update` },
            { title: "delete", key: `${submodule.key}delete` },
            { title: "create", key: `${submodule.key}create` },
          ];
          const submodulechildren = [];

          modulechildren.push(submodule);
        }
        module.children = modulechildren;
        treeData.push(module);
      }
    }
    count += 1;
  }
  console.log(treeData, "treedata");

  // Get parent key

  const getParentKeys = (key: React.Key, nodes: DataNode[] | undefined): React.Key[] => {
    const parentKeys: React.Key[] = [];
    const findParent = (currentKey: React.Key, nodesArray: DataNode[] | undefined): void => {
      nodesArray?.forEach((node) => {
        const nodeKey = node.key as React.Key;
        if (node.children && node.children.some((child) => child.key === currentKey)) {
          parentKeys.push(nodeKey);
        } else if (node.children) {
          findParent(currentKey, node.children);
        }
      });
    };

    findParent(key, nodes);
    return parentKeys;
  };
  const onExpand = (expandedKeysValue: Key[]) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
    console.log("onCheck", checked);

    // Check if checked is an array
    if (Array.isArray(checked)) {
      const halfCheckedKeysSet = checked.reduce((acc: Set<React.Key>, key: React.Key) => {
        const parentKeys = getParentKeys(key, treeData);
        parentKeys.forEach((parentKey) => acc.add(parentKey));
        return acc;
      }, new Set());

      const halfCheckedKeys = Array.from(halfCheckedKeysSet);

      console.log("Half-checked keys", halfCheckedKeys, checked);
      const combinedArray = Array.from(new Set([...checked, ...halfCheckedKeys]));
      console.log(combinedArray, "combinedArray");
      // setCheckedKeys(combinedArray);
      setAllchecked(combinedArray);
      setHalfchecked(halfCheckedKeys);
      setCheckedKeys(checked);
    } else {
      // If checked is an object, extract the checked property
      const { checked: checkedArray } = checked;

      const halfCheckedKeysSet = checkedArray.reduce((acc: Set<React.Key>, key: React.Key) => {
        const parentKeys = getParentKeys(key, treeData);
        parentKeys.forEach((parentKey) => acc.add(parentKey));
        return acc;
      }, new Set());

      const halfCheckedKeys = Array.from(halfCheckedKeysSet);

      console.log("Half-checked keys", halfCheckedKeys, checkedArray);
      const combinedArray = Array.from(new Set([...checkedArray, ...halfCheckedKeys]));
      console.log(combinedArray, "combinedArray");
      // setCheckedKeys(combinedArray);
      setAllchecked(combinedArray);
      setHalfchecked(halfCheckedKeys);
      setCheckedKeys(checkedArray);
    }
  };

  const onSelect = (selectedKeysValue: Key[]) => {
    console.log("onSelect", selectedKeysValue);
    setSelectedKeys(selectedKeysValue);
  };
  // based on location
  const fetchRolesbasedOnLocation = async (location_name: string) => {
    try {
      const response = await axios.post(
        `http://10.0.20.133:8000/mg_roles/get_roles_by_location`,
        { location_name: location_name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data, "all Rolesssssssss");
        // const getrole = [];
        // getrole.push(response.data);
        setRoles([...response.data, "Add new Role"]);
        // roles.push("Om");
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
      console.log("wwwwwww");
    }
  };
  // not based on location
  const fetchRoles = async () => {
    console.log(token, "token");
    try {
      const response = await axios.get(`http://10.0.20.133:8000/mg_roles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data, "all Rolesssssssss");
        setMRoles(response.data);
      }
    } catch (error) {
      console.error(error);
      console.log("wwwwwww");
    }
  };
  const fetchLocation = async () => {
    console.log(token, "token");
    try {
      const response = await axios.get(`http://10.0.20.133:8000/only_worklocation`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data, "all Rolesssssssss");
        setWorklocation(response.data);
      }
    } catch (error) {
      console.error(error);
      console.log("wwwwwww");
    }
  };
  const fetchRbac = async (roles_name: string) => {
    try {
      const response = await axios.post(
        `http://10.0.20.133:8000/get_all_mg_rbac `,
        { location_name: values?.location_name, role_name: roles_name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCheckedKeys(response.data[0].sub_module_menu);
        setEditorcreate("edit");
        setRbacData(response.data[0].sub_module_menu);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("rbac data storing ", rbacData);

  // React.useEffect(() => {
  //   dispatched(storeRBAC(rbacData));
  // }, [dispatched, rbacData]);
  useEffect(() => {
    fetchLocation(); // Fetch data from API on component mount
  }, []);
  useEffect(() => {
    fetchRoles();
    // Fetch data from API on component mount
  }, []);
  useEffect(() => {
    fetchRbac(editData2?.role_display_name);
    // Fetch data from API on component mount
  }, []);
  console.log(editorcreate, "createeditttttttt");

  // newrole
  const [openDialog, setOpenDialog] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

  const handlecreateRoles = async () => {
    console.log("enwdfwj");
    try {
      console.log(values, "formdata");

      const response = await axios.post(
        "http://10.0.20.133:8000/mg_roles/main_admin      ",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log(" Created Employee Successfully");
        message.success(" Created Roles Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // Cookies.set(["checboxvalue"], values?.access);

  const renderTreeNodes = (data: DataNode[]): React.ReactNode => {
    console.log(data, "data");

    return data.map((item) => {
      const { key, title, children } = item;
      console.log(item, "dduuiiihiihui");
      return (
        <Tree.TreeNode
          key={key}
          title={
            <span>
              {title}
              {/* {additionalCheckboxes} */}
            </span>
          }
        >
          {children && renderTreeNodes(children)}
        </Tree.TreeNode>
      );
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
          <MDBox p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={9} mb={2}>
                <MDTypography variant="h5">Give Permission To Roles</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info" type="submit">
                  {"Save"}
                </MDButton>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="Location name"
                  name="location_name"
                  // required
                  value={values.location_name}
                  placeholder="Enter Your Location name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors?.location_name && touched?.location_name}
                  // success={values.location_name.length && !errors.location_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="Role name"
                  name="role_name"
                  required
                  value={values.role_name}
                  placeholder="Enter Your Role name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.role_name && touched.role_name}
                  success={values.role_name.length && !errors.role_name}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
        {values.role_name != "" ? (
          <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
            <MDBox p={3}>
              <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                // halfcheckedKeys={halfcheckedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
              >
                {renderTreeNodes(treeData)}
              </Tree>
            </MDBox>
          </Card>
        ) : null}
      </form>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create Roles</DialogTitle>
        <DialogContent>
          <MDBox p={3}>
            <Grid container spacing={3}></Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "location_name", value } });
                    // fetchRoles(value);
                  }}
                  options={worklocation}
                  //   onChange={(e: any) => setearning_type_name(e.target.value)}
                  renderInput={(params) => (
                    <MDInput
                      name="location_name"
                      onChange={handleChange}
                      value={values.location_name}
                      label="Location Name"
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  name="role_display_name"
                  onChange={handleChange}
                  value={values.role_display_name}
                  label="Role Display Name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  name="role_short_code"
                  onChange={handleChange}
                  value={values.role_short_code}
                  label="Role Short code"
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "seeded", value } });
                  }}
                  options={["Y", "N"]}
                  //   onChange={(e: any) => setearning_type_name(e.target.value)}
                  renderInput={(params) => (
                    <MDInput
                      name="seeded"
                      onChange={handleChange}
                      value={values.seeded}
                      label="Roles access"
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "status", value } });
                  }}
                  options={["active", "inactive"]}
                  //   onChange={(e: any) => setearning_type_name(e.target.value)}
                  renderInput={(params) => (
                    <MDInput
                      name="status"
                      onChange={handleChange}
                      value={values.status}
                      label="Status"
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  label="Description"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setIsDialogOpen(false)}>Cancel</MDButton>
          <MDButton
            onClick={() => {
              setIsDialogOpen(false);
              handlecreateRoles();
              // const range = `${values.fromDate}/${values.toDate}`;
              // setFieldValue("role_display_name", role_display_name);
            }}
          >
            Apply
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Rbac;
/******************************************** */
