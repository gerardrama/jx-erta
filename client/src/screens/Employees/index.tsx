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

  const {data: employees, isLoading: isEmployeesLoading} = useGetEmployeesQuery();
  const {data: roles, isLoading: isRolesLoading} = useGetRolesQuery();
  const {data: departments, isLoading: isDepartmentsLoading} = useGetDepartmentsQuery();

  const isLoading = isEmployeesLoading || isRolesLoading || isDepartmentsLoading;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
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
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' ghost size='small' onClick={() => {
            setUpdateRecord(employees?.find((employee) => employee.fullName === record.name) || null);
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
  
  const getDataToDisplay = () => employees.map((item) => {
    return {
      name: item.fullName,
      dateOfBirth: item.dateOfBirth,
      personalId: item.personalId,
      address: item.address,
      role: roles?.find((role) => role.id === item.roleId)?.name || 'N/A',
      department: departments?.find((department) => department.id === item.departmentId)?.title || 'N/A',
    }
  });


  return (
    <div>
      {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <div className={styles.tableWrapper}>
          <EmployeeModal 
            open={openEmployeeModal} 
            setOpen={setOpenEmployeeModal} 
            updateRecord={updateRecord}
            roles={roles || []}
            departments={departments || []}
            />
          <Table columns={columns} dataSource={getDataToDisplay()} />;
          <FloatButton icon={<PlusOutlined />} onClick={() => setOpenEmployeeModal(true)} />
        </div>
      }
    </div>
)}
export default Employees;