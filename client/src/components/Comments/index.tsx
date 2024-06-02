import { Avatar, Button , Form, Input, List } from 'antd';
import { Comment } from '@ant-design/compatible';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {socket, updateComments} from "../../socketConnection.ts";

const { TextArea } = Input;

interface CommentItem {
  author: string;
  avatar: React.ReactNode;
  content: React.ReactNode;
  datetime: string;
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const CommentList = ({ comments }: { comments: CommentItem[] }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={3} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    socket.on('UPDATE_COMMENT', (data) => {
      setComments((comments) => [{
        author: data.author,
        avatar: <Avatar style={{ backgroundColor: '#f56a00' }}>{data.author[0]}</Avatar>,
        content: <p>{data.content}</p>,
        datetime: moment().fromNow(),
      }, ...comments]);
    });
  }, []);

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      updateComments({
          author: 'Han Solo',
          content: value,
          datetime: moment('2016-11-22').fromNow(),
        }
      )
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Comment
        avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>H</Avatar>}
        content={
          <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
          />
        }
        />
      {comments.length > 0 && <CommentList comments={comments} />}
    </>
  );
};

export default Comments;