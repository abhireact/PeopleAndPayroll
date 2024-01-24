// Define your action types
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_ACADEMIC_NAME = "UPDATE_ACADEMIC_NAME";
export const UPDATE_CLASS_NAME = "UPDATE_CLASS_NAME";
export const UPDATE_SECTION_NAME = "UPDATE_SECTION_NAME";
export const UPDATE_ENTITLEMENT_NAME = "UPDATE_ENTITLEMENT_NAME";
export const UPDATE_RESTRICTION_NAME = "UPDATE_RESTRICTION_NAME";
export const UPDATE_APPLICABLE_NAME = "UPDATE_APPLICABLE_NAME";
export const UPDATE_LEAVEGRANT_NAME = "UPDATE_LEAVEGRANT_NAME";
export const UPDATE_WORKLOCATION_NAME = "UPDATE_WORKLOCATION_NAME";
export const UPDATE_DEPARTMENT_NAME = "UPDATE_DEPARTMENT_NAME";
export const UPDATE_DESIGNATION_NAME = "UPDATE_DESIGNATION_NAME";
export const UPDATE_EMPLOYEE_NAME = "UPDATE_EMPLOYEE_NAME";
export const UPDATE_LEAVETYPE_NAME = "UPDATE_LEAVETYPE_NAME";
export const UPDATE_ROLES_NAME = "UPDATE_ROLES_NAME";
export const UPDATE_USERPROFILE_NAME = "UPDATE_USERPROFILE_NAME";
export const UPDATE_RBAC_NAME = "UPDATE_RBAC_NAME";
// Define your action creators
export const updateName = (name: string) => ({
  type: UPDATE_NAME,
  payload: name,
});
export const updateAcademicName = (academicName: object) => ({
  type: UPDATE_ACADEMIC_NAME,
  payload: academicName,
});
export const updateClassName = (className: object) => ({
  type: UPDATE_CLASS_NAME,
  payload: className,
});
export const updateSectionName = (sectionName: object) => ({
  type: UPDATE_SECTION_NAME,
  payload: sectionName,
});
export const storeEntitlementData = (entitlementName: object) => ({
  type: UPDATE_ENTITLEMENT_NAME,
  payload: entitlementName,
});
export const storeRestrictionData = (restrictionData: object) => ({
  type: UPDATE_RESTRICTION_NAME,
  payload: restrictionData,
});
export const storeApplicableData = (applicableData: object) => ({
  type: UPDATE_APPLICABLE_NAME,
  payload: applicableData,
});
export const storeLeaveGrantData = (leavegrantData: object) => ({
  type: UPDATE_LEAVEGRANT_NAME,
  payload: leavegrantData,
});
export const storeWorkLocationData = (workLocationData: object) => ({
  type: UPDATE_WORKLOCATION_NAME,
  payload: workLocationData,
});
export const storeDepartmentData = (departmentData: object) => ({
  type: UPDATE_DEPARTMENT_NAME,
  payload: departmentData,
});
export const storeDesignationData = (designationData: object) => ({
  type: UPDATE_DESIGNATION_NAME,
  payload: designationData,
});
export const storeEmployeeData = (employeeData: object) => ({
  type: UPDATE_EMPLOYEE_NAME,
  payload: employeeData,
});
export const storeRoleseData = (rolesData: object) => ({
  type: UPDATE_ROLES_NAME,
  payload: rolesData,
});
export const storeLeavetypeData = (leavetypeData: object) => ({
  type: UPDATE_LEAVETYPE_NAME,
  payload: leavetypeData,
});
export const storeUserProfile = (userprofileData: string) => ({
  type: UPDATE_USERPROFILE_NAME,
  payload: userprofileData,
});
export const storeRBAC = (rbacData: object) => ({
  type: UPDATE_RBAC_NAME,
  payload: rbacData,
});
