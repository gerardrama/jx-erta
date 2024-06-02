import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react'
import TextArea from 'antd/es/input/TextArea';
import {  EmployeeType } from '../../shared/models';
import dayjs from 'dayjs';
import { useCreateEmployeeMutation } from '../../redux/services/endpoints';

interface EmployeeModalPropTypes {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateRecord: EmployeeType | null,
    roles: any[],
    departments: any[],
    tableRefetch: any
}

const EmployeeModal = ({open, setOpen, updateRecord, roles, departments, tableRefetch}: EmployeeModalPropTypes) => {
    const [formRef] = Form.useForm();

    const [createEmployee] = useCreateEmployeeMutation();

    const serveUpdateRecord = () => {
        return updateRecord ? {
            ...updateRecord,
            dateOfBirth: dayjs(updateRecord.dateOfBirth),
            roleId: roles.find((role) => role.id === updateRecord.roleId)?.name,
            departmentId: departments.find((department) => department.id === updateRecord.departmentId)?.name,
        } : false;
    }

    useEffect(() => {
        if(open){
            if(!!serveUpdateRecord()){
                formRef?.setFieldsValue(serveUpdateRecord());
            }else{
                formRef?.resetFields();
            }
        }
    }, [open, updateRecord])

    const filterClientOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleCancel = () =>{
        setOpen(false);
    }
    
    const handleOnFinish = (values: any) =>{
        let submitValues = {
            ...values,
            dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
        };
        
        console.log(submitValues)

        if(!!serveUpdateRecord()){
        //     submitValues = {...submitValues, id: updateRecord?.key}
        //     console.log(updateRecord)
        //     updateFaq(submitValues).unwrap()
        //     .catch((err) => {
        //         console.log(err);
        //     }).finally(() => {
        //         // tableRefetch();
        //         setOpen(false);
        //     })

            setOpen(false);
        }else{
            createEmployee(submitValues).unwrap().catch((err) => {
                console.log(err);
            }).finally(() => {
                tableRefetch();
                setOpen(false);
            })
        }
    }

    return (
        <Modal
            title={!!serveUpdateRecord() ?  `Update employee` : 'Add a new employee'}
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
                    label="Full Name"
                    name="fullName"
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
                    rules={[{ required: true, message: 'Please input the employee address!' }]}
                >
                    <TextArea rows={2} placeholder="Address address" />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="roleId"
                    rules={[{ required: true, message: 'Please input the employee role!' }]}
                >
                    <Select
                        placeholder='Select role'
                        maxTagCount='responsive'
                        showSearch
                        optionFilterProp="children"
                        filterOption={filterClientOption}
                        options={roles.map((role) => ({
                            label: role.name,
                            value: role.id.toString()
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Department"
                    name="departmentId"
                    rules={[{ required: true, message: 'Please input the employee department!' }]}
                >
                    <Select
                        placeholder='Select department'
                        maxTagCount='responsive'
                        showSearch
                        optionFilterProp="children"
                        filterOption={filterClientOption}
                        options={departments.map((department) => ({
                            label: department.name,
                            value: department.id.toString()
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