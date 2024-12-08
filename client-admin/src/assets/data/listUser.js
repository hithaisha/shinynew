import React from 'react';
import user5 from '../images/dashboard/user5.jpg';
import user3 from '../images/dashboard/user3.jpg';
import user1 from '../images/dashboard/user1.jpg';
import boy2 from '../images/dashboard/boy-2.png';
import designer from '../images/dashboard/designer.jpg';
import user from '../images/dashboard/user.png'

export const data = [
    {
        id: "1",
        avtar: <img alt="" src={user5} style={{ width: 50, height: 50 }} />,
        f_name: "Admin",
        l_name: "Admin",
        email: "admin@hh.com",
        last_login: "1 Min ago",
        role: "Admin"
    },
    {
        id: "20",
        avtar: <img alt="" src={designer} style={{ width: 50, height: 50 }} />,
        f_name: "John",
        l_name: "Smith",
        email: "johnsmith@gmail.com",
        last_login: "1 Days ago",
        role: "Customer"
    },
]
export default data

