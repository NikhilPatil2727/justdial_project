import React, { useEffect, useState } from "react";
import Profilenav from "../profilenav/Profilenav";
import { fetchContacts } from "./Service";

const UserContacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            const result = await fetchContacts();
            if (result.status) {
                setContacts(result.data);
            }
        };

        getContacts();
    }, []);

    return ( 
        <>
            <Profilenav />
            <div className="container mt-5">
                <h2 className="mb-4 text-center">User Contacts</h2><br></br>
                <div className="table-responsive">
                    <table className="time-table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sl. No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Subject</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((contact, index) => (
                                    <tr key={contact._id || index}>
                                        <td>{index + 1}</td>
                                        <td>{contact.act_name}</td>
                                        <td>{contact.act_email}</td>
                                        <td>{contact.act_mobile}</td>
                                        <td>{contact.act_subject}</td>
                                        <td>{contact.act_desc}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No contact messages found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserContacts;
