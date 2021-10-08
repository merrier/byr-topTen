import { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import ProList from '@ant-design/pro-list';
import { Tag, Space } from 'antd';
import { useRequest } from 'umi';
import DateList from './date';

import './index.less';

type DataItem = {
  _id: string;
  topno: number;
  date: string;
  title: string;
  author: string;
  pubDate: string;
  boardName: string;
  link: string;
  content: string;
  count: number;
  createdAt: string;
  updatedAt: string;
  guid: string;
};

export default () => {
  const [date, setDate] = useState<string>('2018-03-25');
  const { data, loading } = useRequest(
    () => ({
      url: `https://qccbpr.fn.thelarkcloud.com/daily-posts?date=${date}`,
    }),
    {
      refreshDeps: [date],
    },
  );

  return (
    <ProCard split="vertical">
      <ProCard title="日期列表" colSpan="35%">
        <DateList date={date} setDate={setDate} />
      </ProCard>
      <ProCard title={`当前日期：${date}`} headerBordered>
        <ProList<DataItem>
          loading={loading}
          onRow={(record: any) => {
            return {
              onClick: () => {
                window.open(`${record.link}?date=${record.date}`);
              },
            };
          }}
          rowKey="_id"
          headerTitle={null}
          dataSource={data}
          metas={{
            avatar: {
              dataIndex: 'topno',
              render: (text) => {
                return <div className="post-index">{text}</div>;
              },
            },
            title: {
              dataIndex: 'title',
            },
            description: {
              dataIndex: '_desc',
              render: (text, record) => {
                return record.author;
              },
            },
            subTitle: {
              dataIndex: 'boardName',
              render: (text, record) => {
                return (
                  <Space size={0}>
                    <Tag color="blue">{text || record.guid}</Tag>
                  </Space>
                );
              },
            },
          }}
        />
      </ProCard>
    </ProCard>
  );
};
