import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import MDTypography from "components/MDTypography";
import { useDispatch, useSelector } from "react-redux";
import { storeRBAC, storeUserProfile } from "Redux/action/dummyDataActions";

export default function MYAccount() {
  const token = Cookies.get("token");
  const [mydata, setMydata] = useState([]);
  const [userData, setUserData] = useState();
  const [rbacData, setRbacData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatched = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/users/me_data", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMydata(response.data);
        setUserData(response.data[0]?.role);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Include token as a dependency for the useEffect

  console.log(userData, "dfata");
  Cookies.set("UserRole", userData, { expires: 7 });
  React.useEffect(() => {
    dispatched(storeUserProfile(userData));
  }, [dispatched, userData]);

  // store rbac
  useEffect(() => {
    axios
      .get("http://10.0.20.133:8000/users/me_data", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMydata(response.data);
        setUserData(response.data[0]?.role);
        if (response.status == 200) {
          // fetchRbac(response.data[0]?.role, response.data[0]?.role, response.data[0]?.role);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Include token as a dependency for the useEffect
  console.log(mydata[0], "dddddddddddddddddddddddddddata");
  console.log(userData, "dfata");
  Cookies.set("UserRole", userData, { expires: 7 });
  React.useEffect(() => {
    dispatched(storeUserProfile(userData));
  }, [dispatched, userData]);
  // const userprofileData = useSelector((state: any) => state.userprofileData);
  // console.log("userProfileData", userprofileData[0]);
  // const fetchRbac = async (org_name: string, loc_name: string, roles_name: string) => {
  //   try {
  //     const response = await axios.get(
  //       // `http://10.0.20.133:8000/mg_rbac?organization_name=${org_name}&role_name=${roles_name}&location_name=${loc_name}`,
  //       "http://10.0.20.133:8000/mg_rbac_current_user  ",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setRbacData(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Logout function
  const handleLogout = () => {
    // Remove cookies here
    Cookies.remove("token");
    setAnchorEl(null);
    window.location.reload();
    // Cookies.remove("yourCookie2");
    // Add more lines if you have additional cookies

    // Redirect to the logout page or perform any other necessary actions
    // window.location.href = "/logout";
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 25, height: 25, bgcolor: "#7B809A" }}>
              {mydata ? mydata[0]?.username[0] : ""}
              {/* {mydata[0].username[0] ? mydata[0].username[0] : ""} */}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/pages/authentication/myprofile">
          <Avatar /> My Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
