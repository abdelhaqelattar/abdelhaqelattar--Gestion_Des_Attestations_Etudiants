import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "../Shared/Components/Table/TableComponent";
import { Download, Edit, Send, Trash2 } from "react-feather";
import ModalForm from "../Shared/Components/Modals/ModalForm";
import { useHttpClient } from "../Shared/Hooks/HttpHook";

const filters = [
  {
    name: "q",
    type: "text",
    placeholder: "Search",
  },
];

const columns = [
  {
    label: "Apogee",
    dblabel: "student_appogee",
  },
  {
    label: "CNE",
    dblabel: "student_cne",
  },
  {
    label: "Name",
    dblabel: "student_name",
  },
  {
    label: "Document Type",
    dblabel: "docType",
  },
  {
    label: "Status",
    dblabel: "status",
  },
];

const actions = [
  // Download
  {
    action: "download",
    icon: <Download />,
    label: "Download",
  },
  // Resend
  {
    action: "resend",
    icon: <Send />,
    label: "Resend",
  },
];

const Accounts = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { sendRequest, clearError } = useHttpClient();
  const [responseData, setResponseData] = useState({});

  const checkContain = (element, value) => {
    return element.toLowerCase().includes(value.filterValue.toLowerCase());
  };

  const actionHandler = useCallback(
    async (action, value) => {
      console.log(value);
      switch (action) {
        case "download":
          try {
            // download file
            window.open(
              "http://127.0.0.1:5000/request/download/" + value,
              "_blank"
            );
          } catch (err) {
            console.log(err);
          }
          break;
        case "resend":
          try {
            const responseData = await sendRequest(
              "http://127.0.0.1:5000/request/resend",
              "POST",
              JSON.stringify({
                requestId: value,
              }),
              {
                "Content-Type": "application/json",
              }
            );
            console.log(responseData);
          } catch (err) {
            console.log(err);
          }
          break;
        case "filterChange":
          console.log("filterChange", value);
          console.log(responseData.requests);
          setLoading(true);

          // Assuming filterValue is the value based on which you want to filter
          const filteredData = responseData.requests.filter((element) => {
            // Modify this condition based on your filtering requirements
            return (
              checkContain(element.student.name, value) ||
              checkContain(element.student.appogee, value) ||
              checkContain(element.student.CNE, value) ||
              checkContain(element.docType.title, value) ||
              checkContain(element.status, value)
            );
          });

          const data = filteredData.map((element) => {
            return {
              student_name: element.student ? element.student.name : "No name",
              student_appogee: element.student
                ? element.student.appogee
                : "No appogee",
              student_cne: element.student ? element.student.CNE : "No cne",
              docType: element.docType ? element.docType.title : "No name",
              status: element.status,
              _id: element._id,
            };
          });

          setData(data);
          setLoading(false);
          break;
        default:
          console.log("Please enter a valid action");
      }
    },
    [data]
  );
  const getData = async () => {
    console.log("getdata");
    clearError();
    try {
      const responseData = await sendRequest(
        "http://127.0.0.1:5000/request/history"
      );
      console.log(responseData);
      setResponseData(responseData);
      const data = await responseData.requests.map((element) => {
        return {
          student_name: element.student ? element.student.name : "No name",
          student_appogee: element.student
            ? element.student.appogee
            : "No appogee",
          student_cne: element.student ? element.student.CNE : "No cne",
          docType: element.docType ? element.docType.title : "No name",
          status: element.status,
          _id: element._id,
        };
      });
      console.log("end");
      console.log("data", data);
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    setLoading(true);
    getData();
  }, []);

  return (
    <>
      <TableComponent
        primaryKey="_id"
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
