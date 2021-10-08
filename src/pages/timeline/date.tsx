import { Dispatch, SetStateAction } from 'react';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import ProList from '@ant-design/pro-list';

type Props = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};

type DateItem = {
  date: string;
};

type Params = {
  current?: number;
  pageSize?: number;
  keyword?: string;
};

const oldestDate = '2018-03-25';
const newestDate = dayjs().format('YYYY-MM-DD');

const totalDateLength = dayjs(newestDate).diff(dayjs(oldestDate), 'day');

function formatDateArray(startDate: string, endDate: string) {
  const dateArray = new Array();
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateArray.push({
      date: currentDate,
    });
    currentDate = dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD');
  }
  return dateArray;
}

function getDateList({
  current = 0,
  pageSize = 10,
}: Params): Promise<{ data: DateItem[]; total: number }> {
  return new Promise((resolve) => {
    const startDate = dayjs(oldestDate)
      .add((current - 1) * pageSize, 'days')
      .format('YYYY-MM-DD');
    const endDate = dayjs(startDate)
      .add(pageSize - 1, 'days')
      .format('YYYY-MM-DD');
    const dateArray = formatDateArray(startDate, endDate);
    resolve({ data: dateArray, total: totalDateLength });
  });
}

export default (props: Props) => {
  const { date, setDate } = props;
  return (
    <ProList<DateItem>
      search={{
        filterType: 'light',
      }}
      rowKey="date"
      headerTitle={null}
      request={async (params = {}) => getDateList(params)}
      pagination={{
        pageSize: 10,
        size: 'small',
        showSizeChanger: false,
      }}
      onRow={(record: any) => {
        return {
          onClick: () => {
            setDate(record.date);
          },
        };
      }}
      metas={{
        title: {
          dataIndex: 'date',
          title: '日期',
        },
        // status: {
        //   // 自己扩展的字段，主要用于筛选，不在列表中显示
        //   title: '状态',
        //   valueType: 'select',
        //   valueEnum: {
        //     all: { text: '全部', status: 'Default' },
        //     open: {
        //       text: '未解决',
        //       status: 'Error',
        //     },
        //     closed: {
        //       text: '已解决',
        //       status: 'Success',
        //     },
        //     processing: {
        //       text: '解决中',
        //       status: 'Processing',
        //     },
        //   },
        // },
      }}
    />
  );
};
