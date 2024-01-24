// Import your action types
import {
  UPDATE_NAME,
  UPDATE_ACADEMIC_NAME,
  UPDATE_ENTITLEMENT_NAME,
  UPDATE_RESTRICTION_NAME,
  UPDATE_APPLICABLE_NAME,
  UPDATE_LEAVEGRANT_NAME,
  UPDATE_WORKLOCATION_NAME,
  UPDATE_DEPARTMENT_NAME,
  UPDATE_DESIGNATION_NAME,
  UPDATE_EMPLOYEE_NAME,
  UPDATE_ROLES_NAME,
  UPDATE_LEAVETYPE_NAME,
  UPDATE_USERPROFILE_NAME,
  UPDATE_RBAC_NAME,
} from "../action/dummyDataActions";

// Define your initial state interface
interface DummyDataState {
  name: string;
  academicName: string;
  entitlementName: string;
  restrictionData: string;
  applicableData: string;
  leavegrantData: string;
  workLocationData: string; // Add workLocationData property
  departmentData: string; // Add departmentData property
  designationData: string; // Add designationData property
  employeeData: string; // Add employeeData property
  rolesData: string;
  leavetypeData: string;
  userprofileData: string;
  rbacData: string;
}

// Define your initial state
const initialState: DummyDataState = {
  name: "",
  academicName: "",
  entitlementName: "",
  restrictionData: "",
  applicableData: "",
  leavegrantData: "",
  workLocationData: "", // Initialize workLocationData property
  departmentData: "", // Initialize departmentData property
  designationData: "", // Initialize designationData property
  employeeData: "", // Initialize employeeData property
  rolesData: "",
  leavetypeData: "",
  userprofileData: "",
  rbacData: "",
};

// Define your reducer function
const dummyDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UPDATE_ACADEMIC_NAME:
      return {
        ...state,
        academicName: action.payload,
      };
    case UPDATE_ENTITLEMENT_NAME:
      return {
        ...state,
        entitlementName: action.payload,
      };
    case UPDATE_RESTRICTION_NAME:
      return {
        ...state,
        restrictionData: action.payload,
      };
    case UPDATE_APPLICABLE_NAME:
      return {
        ...state,
        applicableData: action.payload,
      };
    case UPDATE_LEAVEGRANT_NAME:
      return {
        ...state,
        leavegrantData: action.payload,
      };
    case UPDATE_WORKLOCATION_NAME:
      return {
        ...state,
        workLocationData: action.payload,
      };
    case UPDATE_DEPARTMENT_NAME:
      return {
        ...state,
        departmentData: action.payload,
      };
    case UPDATE_DESIGNATION_NAME:
      return {
        ...state,
        designationData: action.payload,
      };
    case UPDATE_EMPLOYEE_NAME:
      return {
        ...state,
        employeeData: action.payload,
      };
    case UPDATE_ROLES_NAME:
      return {
        ...state,
        rolesData: action.payload,
      };
    case UPDATE_LEAVETYPE_NAME:
      return {
        ...state,
        leavetypeData: action.payload,
      };
    case UPDATE_USERPROFILE_NAME:
      return {
        ...state,
        userprofileData: action.payload,
      };
    case UPDATE_RBAC_NAME:
      return {
        ...state,
        rbacData: action.payload,
      };
    default:
      return state;
  }
};

export default dummyDataReducer;
