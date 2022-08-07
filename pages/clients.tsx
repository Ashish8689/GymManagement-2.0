import React, { FC } from 'react'
import { Table } from 'antd'
interface Data {
    key: string
    name: string
    age: number
    email: string
    mobile: number
    status: boolean
    address: string
    dateOfJoining: string
    membershipEnding: string
    altMobile: number
    membership: number
}

const data: Data[] = [
    {
        key: '1',
        name: 'Ashish Gupta',
        age: 23,
        dateOfJoining: '25/12/2021',
        membershipEnding: '25/02/2022',
        address: 'New York No. 1 Lake Park',
        email: 'ag939431@gmail.com',
        mobile: 8689868867,
        status: true,
        altMobile: 7021606307,
        membership: 3,
    },
    {
        key: '1',
        name: 'Ashish Gupta',
        age: 23,
        dateOfJoining: '25/12/2021',
        membershipEnding: '25/02/2022',
        address: 'New York No. 1 Lake Park',
        email: 'ag939431@gmail.com',
        mobile: 8689868867,
        status: true,
        altMobile: 7021606307,
        membership: 3,
    },
    {
        key: '1',
        name: 'Ashish Gupta',
        age: 23,
        dateOfJoining: '25/12/2021',
        membershipEnding: '25/02/2022',
        address: 'New York No. 1 Lake Park',
        email: 'ag939431@gmail.com',
        mobile: 8689868867,
        status: true,
        altMobile: 7021606307,
        membership: 3,
    },
    {
        key: '1',
        name: 'Ashish Gupta',
        age: 23,
        dateOfJoining: '25/12/2021',
        membershipEnding: '25/02/2022',
        address: 'New York No. 1 Lake Park',
        email: 'ag939431@gmail.com',
        mobile: 8689868867,
        status: true,
        altMobile: 7021606307,
        membership: 3,
    },
    {
        key: '1',
        name: 'Ashish Gupta',
        age: 23,
        dateOfJoining: '25/12/2021',
        membershipEnding: '25/02/2022',
        address: 'New York No. 1 Lake Park',
        email: 'ag939431@gmail.com',
        mobile: 8689868867,
        status: true,
        altMobile: 7021606307,
        membership: 3,
    },
]

const Clients: FC = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // age:(value:number)=> value || 'N/A',
            // dateOfJoining:(value:string)=> value || 'N/A',
            // membershipEnding:(value:string)=> value || 'N/A',
            // address:(value:string)=> value || 'N/A',
            // email:(value:string)=> value || 'N/A',
            // mobile:(value:number)=> value || 'N/A',
            // status:(value:boolean)=> value || 'N/A',
            // altMobile:(value:number)=> value || 'N/A',
            // membership:(value:number)=> value || 'N/A',
            ellipsis: true,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            ellipsis: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
        },
        {
            title: 'Joining Date',
            dataIndex: 'dateOfJoining',
            key: 'dateOfJoining',
            ellipsis: true,
        },
        {
            title: 'Membership',
            dataIndex: 'membership',
            key: 'membership',
            ellipsis: true,
        },
        {
            title: 'Membership Ending',
            dataIndex: 'membershipEnding',
            key: 'membershipEnding',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            render: (value: boolean) => (value ? 'ACTIVE' : 'INACTIVE'),
        },
        {
            title: 'Alt Mobile',
            dataIndex: 'altMobile',
            key: 'altMobile',
            ellipsis: true,
        },
    ]

    return (
        <div className="text-white">
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Clients
