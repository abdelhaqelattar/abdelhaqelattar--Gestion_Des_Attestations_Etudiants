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

const formElements = [
  {
    label: "Title",
    dblabel: "Title",
    type: "text",
  },
  {
    label: "Date",
    dblabel: "Date",
    type: "date",
  },
  {
    label: "Account number",
    dblabel: "Account",
    type: "text",
  },
  {
    label: "Balance",
    dblabel: "Balance",
    type: "number",
  },
];

const Accounts = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({});
  const [action, setAction] = useState("read");
  const [isLoading, setLoading] = useState(true);

  const actionHandler = useCallback((action, value) => {
    switch (action) {
      case "create":
        setAction(action);
        setValues(null);
        setModalOpen(true);
        break;
      case "edit":
        setAction(action);
        setValues({
          Title: "Hello there from test",
          Date: "",
          Account: "",
          Balance: "",
        });
        setModalOpen(true);
        break;
      case "delete":
        console.log("editing profile");
        break;
      case "filterChange":
        console.log("filterChange");
        break;
      default:
        console.log("Please a valid");
    }
  }, []);

  const submitHandler = useCallback((data) => {
    console.log(data);
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

export default Accounts;
