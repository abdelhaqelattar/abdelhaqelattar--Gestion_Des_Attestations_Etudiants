import React, { useCallback, useEffect, useState, useContext } from "react";
import TableComponent from "../Shared/Components/Table/TableComponent";
import { Mail, XCircle, Search } from "react-feather";
import { RouteContext } from "../Shared/Context/RoutesContext";
import { useHttpClient } from "../Shared/Hooks/HttpHook";
import { Button, Modal } from "react-bootstrap";

const filters = [
  {
    name: "q",
    type: "text",
    placeholder: "Search",
  },
];

const actions = [
  {
    action: "sendMail",
    icon: <Mail />,
    label: "Approve & Send",
  },
  {
    action: "reject",
    icon: <XCircle />,
    label: "Reject",
  },
  {
    action: "preview",
    icon: <Search />,
    label: "Preview",
  },
];

const Accounts = () => {
  const [isLoading, setLoading] = useState(true);
  const { docTypes } = useContext(RouteContext);
  const { sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [responseData, setResponseData] = useState({});

  const handleClose = () => setShow(false);

  const checkContain = (element, value) => {
    return element.toLowerCase().includes(value.filterValue.toLowerCase());
  };

  const actionHandler = useCallback(
    async (action, value) => {
      console.log(value);
      switch (action) {
        case "sendMail":
          setLoading(true);
          try {
            const responseData = await sendRequest(
              "http://127.0.0.1:5000/request/generate",
              "POST",
              JSON.stringify({
                requestID: value,
              }),
              {
                "Content-Type": "application/json",
              }
            );

            // In success case (200 status code)
            if (responseData) {
              //map the data to the table
              console.log(responseData);
              const newData = data.filter((element) => {
                console.log(element._id, value);
                return element._id != value;
              });
              setData(newData);
            }
          } catch (err) {
            // In error case
            console.error("Error sending mail:", err);
            // You can perform additional actions here, like setting an error state
          }
          setLoading(false);
          break;
        case "reject":
          setLoading(true);
          try {
            const responseData = await sendRequest(
              "http://127.0.0.1:5000/request/refuse",
              "POST",
              JSON.stringify({
                requestID: value,
              }),
              {
                "Content-Type": "application/json",
              }
            );
            // In success case (200 status code)
            if (responseData) {
              //map the data to the table
              console.log(responseData);
              const newData = data.filter((element) => {
                console.log(element._id, value);
                return element._id != value;
              });
              setData(newData);
            }
          } catch (err) {
            console.error("Error sending mail:", err);
          }
          setLoading(false);
          break;
        case "preview":
          console.log(data);
          const request = data.find((element) => {
            console.log(element);
            return element._id == value;
          });
          console.log(request);
          setShow(true);
          setPreviewData(request);
          break;
        case "filterChange":
          console.log("filterChange", value);
          console.log(responseData.requests);
          setLoading(true);

          // Assuming filterValue is the value based on which you want to filter
          const filteredData = responseData.requests.filter((element) => {
            let exist = false;
            selectedItem.formElements.forEach((ele) => {
              if (
                element.fields[ele.dblabel] &&
                element.fields[ele.dblabel]
                  .toLowerCase()
                  .includes(value.filterValue.toLowerCase())
              ) {
                exist = true;
              }
            });

            // Modify this condition based on your filtering requirements
            return (
              checkContain(element.student.name, value) ||
              checkContain(element.student.appogee, value) ||
              checkContain(element.student.CNE, value) ||
              checkContain(element.status, value) ||
              exist
            );
          });

          const data2 = filteredData.map((element) => {
            return {
              ...element.fields,
              student_name: element.student.name,
              student_appogee: element.student.appogee,
              student_email: element.student.email,
              _id: element._id,
            };
          });

          setData(data2);
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
        "http://127.0.0.1:5000/request?DocType=" + selectedItem._id
      );
      console.log(responseData);
      setResponseData(responseData);
      const data = await responseData.requests.map((element) => {
        return {
          ...element.fields,
          student_name: element.student.name,
          student_appogee: element.student.appogee,
          student_email: element.student.email,
          _id: element._id,
        };
      });
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const currentLink = window.location.pathname; // Example: "/your-current-link"
  const selectedItem = docTypes.find(
    (item) => "/dashboard/" + item.link === currentLink
  );

  const columns = selectedItem
    ? [
        {
          label: "Appogee",
          dblabel: "student_appogee",
        },
        {
          label: "Nom Complet",
          dblabel: "student_name",
        },
        ...selectedItem.formElements,
      ]
    : [];

  useEffect(() => {
    setData([]);
    setLoading(true);
    if (selectedItem) {
      getData();
    }
  }, [selectedItem]);

  return (
    <>
      <TableComponent
        primaryKey="_id"
        columns={columns}
        data={data}
        filters={filters}
        actions={
          selectedItem.title != "Reclamation"
            ? actions
            : [
                {
                  action: "preview",
                  icon: <Search />,
                  label: "Preview",
                },
              ]
        }
        createButton={false}
        actionHandler={actionHandler}
        isLoading={isLoading}
      />
      {/*    Preview    */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong style={{ textTransform: "capitalize" }}>
              Student Name:{" "}
            </strong>
            <span>{previewData.student_name}</span>
          </p>
          {/*// email*/}
          <p>
            <strong style={{ textTransform: "capitalize" }}>
              Student Email:{" "}
            </strong>
            <span>{previewData.student_email}</span>
          </p>
          <p>
            <strong style={{ textTransform: "capitalize" }}>
              Student Appogee:{" "}
            </strong>
            <span>{previewData.student_appogee}</span>
          </p>
          {selectedItem.formElements.map((ele) => (
            <p key={ele.dblabel}>
              <strong style={{ textTransform: "capitalize" }}>
                {ele.label}:{" "}
              </strong>
              <span>{previewData[ele.dblabel]}</span>
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Accounts;
