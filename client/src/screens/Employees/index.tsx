import React from 'react';
import { Button, FloatButton, Popconfirm, Space, Spin, Table, Tag, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import type { PopconfirmProps, TableProps } from 'antd';
import styles from './Employees.module.css';
import { EmployeeType } from '../../shared/models';
import EmployeeModal from '../../components/EmployeeModal';
import { PlusOutlined } from '@ant-design/icons';
import { useGetDepartmentsQuery, useGetEmployeesQuery, useGetRolesQuery } from '../../redux/services/endpoints';

const Employees: React.FC = () => {

  const [openEmployeeModal, setOpenEmployeeModal] = React.useState(false);
  const [updateRecord, setUpdateRecord] = React.useState<EmployeeType | null>(null);

  const {data: employees, isLoading: isEmployeesLoading, refetch: employeesRefetch} = useGetEmployeesQuery();
  const {data: roles, isLoading: isRolesLoading} = useGetRolesQuery();
  const {data: departments, isLoading: isDepartmentsLoading} = useGetDepartmentsQuery();

  const isLoading = isEmployeesLoading || isRolesLoading || isDepartmentsLoading;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'name',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (dob) => <p>{dob.substring(0, 10)}</p>,
    },
    {
      title: 'Personal ID',
      dataIndex: 'personalId',
      key: 'personalId',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Role',
      dataIndex: 'roleId',
      key: 'role',
      render: (roleId) => <p>{roles?.find((role) => role.id === roleId)?.name || 'N/A'}</p>,
    },
    {
      title: 'Department',
      dataIndex: 'departmentId',
      key: 'department',
      render: (departmentId) => <p>{departments?.find((department) => department.id === departmentId)?.title || 'N/A'}</p>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' ghost size='small' onClick={() => {
            setUpdateRecord(record);
            setOpenEmployeeModal(true);
          }}>Update</Button>
            <Popconfirm
              title="Delete employee"
              description="Are you sure to delete this employee?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size='small'>Delete</Button>
            </Popconfirm>
        </Space>
      ),
    },
  ];

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
    message.success('Employee deleted successfully!');
  };
  
  return (
    <div style={{paddingTop: '80px',}}>
      {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <div className={styles.tableWrapper}>
          <EmployeeModal 
            open={openEmployeeModal} 
            setOpen={setOpenEmployeeModal} 
            updateRecord={updateRecord}
            roles={roles || []}
            departments={departments || []}
            tableRefetch={employeesRefetch}
          />
          <Table columns={columns} dataSource={employees} />;
          <FloatButton icon={<PlusOutlined />} onClick={() => {
            setUpdateRecord(null);
            setOpenEmployeeModal(true);
          }} />
        </div>
      }
    </div>
)}
export default Employees;