import React, { useState } from "react";
import { AdminLayout } from "../layout/adminLayout";

export const AdminManage = () => {
  const [content, setContent] = useState(null);
  return (
    <AdminLayout setContent={setContent}>
      {content ? (
        content
      ) : (
        <>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Manage Administrators</h1>
          <p className="italic">Welcome to the admin management page.</p>
        </>
      )}
    </AdminLayout>
  );
};
