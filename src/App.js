import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import Navbar from "./components/Navbar";
import Contacts from "./components/Contacts";
import ViewContact from "./components/ViewContact";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import DeleteContactInfo from "./components/DeleteContactInfo";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";
import { confirmAlert } from "react-confirm-alert";
import { CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from "./helpers/color";

const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
    photo: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupsData);
        setFilterContact(contactsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setFilterContact(contactsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [forceRender]);

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);
      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: event.target.value,
    });
  };
  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1rem",
              padding: "2rem",
            }}
          >
            <h1 style={{ color: YELLOW }}> پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              {" "}
              آیا از حذف مخاطب {contactFullname} اطمینان دارید؟
            </p>
            <button
              className="btn btn-outline-danger mx-2"
              onClick={async () => {
                removeContact(contactId);
                const { data: contactsData } = await getAllContacts();
                setContacts(contactsData);
                onClose();
              }}
            >
              {" "}
              مطمئن هستم{" "}
            </button>
            <button className="btn btn-outline-info" onClick={onClose}>
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  const [getFilterContact, setFilterContact] = useState([]);
  const [query, setQuery] = useState({ text: "" });

  const funcGetSearchContact = (e) => {
    setQuery({ ...query, text: e.target.value });
    const AllContacts = getContacts.filter((c) => {
      return c.fullname.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterContact(getContacts);
  };

  return (
    <div className="App">
      <Navbar query={query} search={funcGetSearchContact} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={getFilterContact}
              loading={loading}
              confirmDelete={confirm}
            />
          }
        />

        <Route
          path="/contacts/add"
          element={
            <AddContact
              groups={getGroups}
              setContactInfo={setContactInfo}
              contact={getContact}
              createContactForm={createContactForm}
            />
          }
        />

        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              setForceRender={setForceRender}
              forceRender={forceRender}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
      </Routes>
    </div>
  );
};

export default App;
