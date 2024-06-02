import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react'
import TextArea from 'antd/es/input/TextArea';
import { clients, statuses } from '../../shared/data';
import { DepartmentType } from '../../shared/models';
import dayjs from 'dayjs';

interface DepartmentModalPropTypes {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateRecord: DepartmentType | null
    // tableRefetch: any
}

const DepartmentModal = ({open, setOpen, updateRecord, 
    // tableRefetch
}: DepartmentModalPropTypes) => {
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
        let submitValues = {...values, deadline: values.deadline.$d};
        
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
            title={!!serveUpdateRecord() ?  `Update` : 'Create a new department'}
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
                    rules={[{ required: true, message: 'Please input the department name!' }]}
                >
                    <Input placeholder="Department name" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea rows={4} placeholder="Department description" />
                </Form.Item>
                <Form.Item
                    label="Employees"
                    name="employees"
                >
                    <Select
                        mode='multiple'
                        placeholder='Select employees'
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

export default DepartmentModal