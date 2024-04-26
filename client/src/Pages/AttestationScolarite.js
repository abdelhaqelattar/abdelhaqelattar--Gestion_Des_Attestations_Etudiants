import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Shared/Components/Table/TableComponent";
import { Edit, Trash2 } from "react-feather";
import ModalForm from "../Shared/Components/Modals/ModalForm";

const filters = [
  {
    name: "input",
    type: "text",
    placeholder: "Search",
  },
];

const columns = [
  {
    label: "Title",
    dblabel: "Title",
  },
  {
    label: "Date",
    dblabel: "Date",
  },
  {
    label: "Account",
    dblabel: "Account number",
  },
  {
    label: "Balance",
    dblabel: "Balance",
  },
];

const data = [
  {
    Title: "Title 1",
    Date: "Date 1",
    "Account number": "Account number 1",
    Balance: "Balance 1",
  },
  {
    Title: "Title 2",
    Date: "Date 2",
    "Account number": "Account number 2",
    Balance: "Balance 2",
  },
  {
    Title: "Title 3",
    Date: "Date 3",
    "Account number": "Account number 3",
    Balance: "Balance 3",
  },
  {
    Title: "Title 4",
    Date: "Date 4",
    "Account number": "Account number 4",
    Balance: "Balance 4",
  },
];

const actions = [
  {
    action: "edit",
    icon: <Edit />,
    label: "Edit",
  },
  {
    action: "delete",
    icon: <Trash2 />,
    label: "Delete",
  },
];

const AttestationScolarite = () => {
  const [isLoading, setLoading] = useState(true);

  const actionHandler = useCallback((action, value) => {
    switch (action) {
      case "filterChange":
        console.log("filterChange");
        break;
      default:
        console.log("Please a valid");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <TableComponent
        primaryKey="Title"
        columns={columns}
        data={data}
        filters={filters}
        actions={actions}
        createButton={true}
        actionHandler={actionHandler}
        isLoading={isLoading}
      />
    </>
  );
};

export default AttestationScolarite;
