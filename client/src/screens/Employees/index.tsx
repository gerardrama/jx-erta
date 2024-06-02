import React from 'react';
import { FloatButton, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import styles from './Employees.module.css';
import { EmployeeType } from '../../shared/models';
import EmployeeModal from '../../components/EmployeeModal';
import { PlusOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Employees: React.FC = () => {

  const [openEmployeeModal, setOpenEmployeeModal] = React.useState(false);
  const [updateRecord, setUpdateRecord] = React.useState<EmployeeType | null>(null);

  return (
    <div className={styles.tableWrapper}>
    <EmployeeModal open={openEmployeeModal} setOpen={setOpenEmployeeModal} updateRecord={updateRecord}/>
    <Table columns={columns} dataSource={data} />;
    <FloatButton icon={<PlusOutlined />} onClick={() => setOpenEmployeeModal(true)} />
  </div>
)}
export default Employees;