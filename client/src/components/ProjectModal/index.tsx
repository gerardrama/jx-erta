import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react'
import TextArea from 'antd/es/input/TextArea';
import { clients, statuses } from '../../shared/data';
import { ProjectType } from '../../shared/models';
import dayjs from 'dayjs';

interface ProjectModalPropTypes {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateRecord: ProjectType | null
    // tableRefetch: any
}

const ProjectModal = ({open, setOpen, updateRecord, 
    // tableRefetch
}: ProjectModalPropTypes) => {
    const [formRef] = Form.useForm();

    const serveUpdateRecord = () => {
        return updateRecord ? {
            ...updateRecord,
            status: updateRecord.status.name,
            deadline: dayjs(updateRecord.deadline)
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
            title={!!serveUpdateRecord() ?  `Update` : 'Create a new project'}
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
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input projects title!' }]}
                >
                    <Input placeholder="Projects title" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea rows={4} placeholder="Projects description" />
                </Form.Item>
                <Form.Item
                    label="Client"
                    name="client"
                >
                    <Select
                        showSearch
                        placeholder="Select a client"
                        optionFilterProp="children"
                        filterOption={filterClientOption}
                        options={clients}
                    />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    // rules={[{ required: true, message: 'Please input projects status!' }]}
                >
                    <Select
                        options={statuses.map((status) => ({
                            label: status.name,
                            value: status.id
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Deadline"
                    name="deadline"
                >
                    <DatePicker format={"DD-MM-YYYY"} style={{width: "100%"}}/>
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

export default ProjectModal