import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from "primereact/progressspinner";
import { Divider } from "primereact/divider";
import api from "../../api/api.js";

export default function MobileApk() {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      fld_mob_version_code: "",
      fld_mob_version_name: "",
      remark: "",
      apk: null,
    },
    validationSchema: Yup.object({
      fld_mob_version_name: Yup.string().required(
        "Mobile version name is required"
      ),
      fld_mob_version_code: Yup.string().required(
        "Mobile version code is required"
      ),
      remark: Yup.string().required("Remark is required"),
      apk: Yup.mixed().required("APK file is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("fld_mob_version_name", values.fld_mob_version_name);
        formData.append("fld_mob_version_code", values.fld_mob_version_code);
        formData.append("remark", values.remark);
        formData.append("apk", values.apk);

        const response = await api.uploadMobileApk(formData);
        console.log("response", response);

        if (response && response.status === "1") {
          toast.current.show({
            severity: "success",
            summary: "Upload Successful",
            detail: response.responsemessage || "APK uploaded successfully.",
          });
          resetForm();
          if (fileUploadRef.current) {
            fileUploadRef.current.clear();
          }
        } else {
          throw new Error(
            response
              ? response.responsemessage ||
                "An error occurred while uploading the APK."
              : "No response from the server."
          );
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Upload Failed",
          detail:
            error.message || "An unexpected error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleApkUpload = (event) => {
    formik.setFieldValue("apk", event.files[0]);
  };

  return (
    <div className="m-5">
      {loading && (
        <div className="pro-spin">
          <ProgressSpinner
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <h1 className="heading">Mobile APK Upload</h1>
      <Divider />
      <form onSubmit={formik.handleSubmit} className="mt-8">
        <div className="grid flex align-items-center mt-3 gap-8">
          <div className="col-2 p-0">
            <div className="formupload">Mobile version name :</div>
          </div>
          <div className="col p-0 flex justify-content-start">
            <InputText
              id="fld_mob_version_name"
              name="fld_mob_version_name"
              style={{ width: "80%" }}
              placeholder="Enter mobile version name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fld_mob_version_name}
              className={
                formik.errors.fld_mob_version_name &&
                formik.touched.fld_mob_version_name
                  ? "p-invalid p-inputtext state-master-input"
                  : "p-inputtext forminputtext"
              }
            />
          </div>
        </div>
        <div className="grid flex align-items-center mt-1 gap-8">
          <div className="col-2 p-0"></div>
          <div className="col p-0 flex justify-content-start">
            {formik.errors.fld_mob_version_name &&
              formik.touched.fld_mob_version_name && (
                <span className="p-error">
                  {formik.errors.fld_mob_version_name}
                </span>
              )}
          </div>
        </div>

        <div className="grid flex align-items-center mt-3 gap-8">
          <div className="col-2 p-0">
            <div className="formupload">Mobile version code :</div>
          </div>
          <div className="col p-0 flex justify-content-start">
            <InputText
              id="fld_mob_version_code"
              name="fld_mob_version_code"
              placeholder="Enter mobile version code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: "80%" }}
              value={formik.values.fld_mob_version_code}
              className={
                formik.errors.fld_mob_version_code &&
                formik.touched.fld_mob_version_code
                  ? "p-invalid p-inputtext state-master-input"
                  : "p-inputtext forminputtext"
              }
            />
          </div>
        </div>
        <div className="grid flex align-items-center mt-1 gap-8">
          <div className="col-2 p-0"></div>
          <div className="col p-0 flex justify-content-start">
            {formik.errors.fld_mob_version_code &&
              formik.touched.fld_mob_version_code && (
                <span className="p-error">
                  {formik.errors.fld_mob_version_code}
                </span>
              )}
          </div>
        </div>

        <div className="grid flex align-items-center mt-3 gap-8">
          <div className="col-2 p-0">
            <div className="formupload">Remarks :</div>
          </div>
          <div className="col p-0 flex justify-content-start">
            <InputTextarea
              id="remark"
              name="remark"
              placeholder="Remarks"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.remark}
              style={{ width: "80%" }}
              className={
                formik.errors.remark && formik.touched.remark
                  ? "p-invalid p-inputtext state-master-input"
                  : "p-inputtext forminputtext"
              }
            />
          </div>
        </div>
        <div className="grid flex align-items-center mt-1 gap-8">
          <div className="col-2 p-0"></div>
          <div className="col p-0 flex justify-content-start">
            {formik.errors.remark && formik.touched.remark && (
              <span className="p-error">{formik.errors.remark}</span>
            )}
          </div>
        </div>

        <div className="grid flex align-items-center mt-3 gap-8">
          <div className="col-2 p-0">
            <div className="formupload">APK File :</div>
          </div>
          <div className="col p-0 flex justify-content-start">
            <FileUpload
              ref={fileUploadRef}
              name="apk"
              accept=".apk"
              uploadHandler={handleApkUpload}
              mode="basic"
              auto
              style={{ width: "80%" }}
            />
          </div>
        </div>
        <div className="grid flex align-items-center mt-1 gap-8">
          <div className="col-2 p-0"></div>
          <div className="col p-0 flex justify-content-start">
            {formik.errors.apk && formik.touched.apk && (
              <span className="p-error">{formik.errors.apk}</span>
            )}
          </div>
        </div>
        <div className="grid flex align-items-center mt-5 gap-8">
          <div className="col-2 p-0"></div>
          <Toast ref={toast} position="top-right" />
          <div className="col p-0 flex justify-content-start">
            <Button type="submit" className="formbutton">
              Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
