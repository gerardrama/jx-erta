import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react'
import TextArea from 'antd/es/input/TextArea';
import { clients, statuses } from '../../shared/data';
import { DepartmentType, EmployeeType } from '../../shared/models';
import dayjs from 'dayjs';
import { useCreateEmployeeMutation } from '../../redux/services/endpoints';

interface EmployeeModalPropTypes {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateRecord: EmployeeType | null
    // tableRefetch: any
}

const EmployeeModal = ({open, setOpen, updateRecord, 
    // tableRefetch
}: EmployeeModalPropTypes) => {

    const [createEmployee] = useCreateEmployeeMutation();

    const employees = [{
        id: 1,
        name: 'John Doe',
    },
    {   id: 2,
        name: 'John Toe',
    },
    ]
    const [formRef] = Form.useForm();

    const serveUpdateRecord = () => {
        return updateRecord ? {
            ...updateRecord,
            // status: updateRecord.status.name,
            // deadline: dayjs(updateRecord.deadline)
        } : false;
    }

    useEffect(() => {
        if(open){
            if(updateRecord){
                formRef?.setFieldsValue(serveUpdateRecord());
            }else{
                formRef?.resetFields();
                formRef?.setFieldsValue({
                    status: statuses[0].name
                })
            }
        }
    }, [open, updateRecord])

    const filterClientOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleCancel = () =>{
        setOpen(false);
    }
    
    const handleOnFinish = (values: any) =>{
        let submitValues = {...values};
        
        console.log(submitValues)

        // if(!!serveUpdateRecord()){
        //     submitValues = {...submitValues, id: updateRecord?.key}
        //     console.log(updateRecord)
        //     updateFaq(submitValues).unwrap()
        //     .catch((err) => {
        //         console.log(err);
        //     }).finally(() => {
        //         // tableRefetch();
        //         setOpen(false);
        //     })
        // }else{
        //     createFaq(submitValues).unwrap().catch((err) => {
        //         console.log(err);
        //     }).finally(() => {
        //         // tableRefetch();
        //         setOpen(false);
        //     })
        // }

        setOpen(false);
    }

    return (
        <Modal
            title={!!serveUpdateRecord() ?  `Update` : 'Add a new employee'}
            centered
            open={open}
            width={600}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                name="dynamic_form_nest_item"
                onFinish={handleOnFinish}
                style={{ maxWidth: 600 }}
                autoComplete="off"
                layout='vertical'
                form={formRef}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the employee name!' }]}
                >
                    <Input placeholder="Employee name" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input the employee email!' }]}
                >
                    <Input placeholder="Employee email" />
                </Form.Item>
                <Form.Item
                    label="Date of birth"
                    name="dateOfBirth"
                    rules={[{ required: true, message: 'Please input the employee date of birth' }]}
                >
                    <DatePicker style={{'width': '100%'}} />
                </Form.Item>
                <Form.Item
                    label="Personal ID"
                    name="personalId"
                    rules={[{ required: true, message: 'Please input the employee personal ID!' }]}
                >
                    <Input placeholder="Employee personal ID" />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                >
                    <TextArea rows={2} placeholder="Address address" />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                >
                    <Select
                        placeholder='Select role'
                        maxTagCount='responsive'
                        showSearch
                        optionFilterProp="children"
                        filterOption={filterClientOption}
                        options={employees.map((employee) => ({
                            label: employee.name,
                            value: employee.id.toString()
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Department"
                    name="department"
                >
                    <Select
                        placeholder='Select department'
                        maxTagCount='responsive'
                        showSearch
                        optionFilterProp="children"
                        filterOption={filterClientOption}
                        options={employees.map((employee) => ({
                            label: employee.name,
                            value: employee.id.toString()
                        }))}
                    />
                </Form.Item>

                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EmployeeModal