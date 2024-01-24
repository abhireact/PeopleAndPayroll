import React, { useState } from "react";
import "./index.css";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "All Roles",
    value: "All_Roles",
    key: "All_Roles",
    children: [
      {
        title: "Team Incharge",
        value: "Roles-0",
        key: "Roles-0",
      },
      {
        title: "Team member",
        value: "Roles-1",
        key: "Roles-1",
      },
      {
        title: "Director",
        value: "Roles-2",
        key: "Roles-2",
      },
      {
        title: "Admin",
        value: "Roles-3",
        key: "Roles-0=3",
      },
      {
        title: "Manager",
        value: "Roles-4",
        key: "Roles-4",
      },
    ],
  },
  {
    title: "All Departments",
    value: "All_Department",
    key: "All_Department",
    children: [
      {
        title: "Departments1",
        value: "Department-0",
        key: "Department-0",
      },
      {
        title: "Departments2",
        value: "Department-1",
        key: "Department-1",
      },
      {
        title: "Departments3",
        value: "Department-2",
        key: "Department-2",
      },
    ],
  },
  {
    title: "All Designations",
    value: "All_Designations",
    key: "All_Designations",
    children: [
      {
        title: "Designations1",
        value: "Designations-0",
        key: "Designations-0",
      },
      {
        title: "Designations2",
        value: "Designations-1",
        key: "Designations-1",
      },
      {
        title: "Designations3",
        value: "Designations-2",
        key: "Designations-2",
      },
    ],
  },
  {
    title: "All Locations",
    value: "All_Locations",
    key: "All_Locations",
    children: [
      {
        title: "Locations1",
        value: "Locations-0",
        key: "Locations-0",
      },
      {
        title: "Locations2",
        value: "Locations-1",
        key: "Locations-1",
      },
      {
        title: "Locations3",
        value: "Locations-2",
        key: "Locations-2",
      },
    ],
  },
  {
    title: "All Groups",
    value: "All_Groups",
    key: "All_Groups",
    children: [
      {
        title: "Groups1",
        value: "Groups-0",
        key: "Groups-0",
      },
      {
        title: "Groups2",
        value: "Groups-1",
        key: "Groups-1",
      },
      {
        title: "Groups3",
        value: "Groups-2",
        key: "Groups-2",
      },
    ],
  },
  {
    title: "All Users",
    value: "All_Users",
    key: "All_Users",
    children: [
      {
        title: "Users1",
        value: "Users-0",
        key: "Users-0",
      },
      {
        title: "Users2",
        value: "Users-1",
        key: "Users-1",
      },
      {
        title: "Users3",
        value: "Users-2",
        key: "Users-2",
      },
    ],
  },
];

const SelectDataFor: React.FC = () => {
  const [value, setValue] = useState(["0-0-0"]);
  console.log(value, "value");

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  return <TreeSelect {...tProps} />;
};

export default SelectDataFor;
