import Table from 'rc-table';
import React from 'react';

let columns = [
  {
    title: 'Project',
    className: '',
    dataIndex: 'project',
    key: 'project',
    align: 'Left',
    width: 100,
    ellipsis: true,
  },
  {
    title: 'Plan',
    className: '',
    dataIndex: 'plan',
    key: 'plan',
    align: 'Left',
    width: 100,
    ellipsis: true,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    align: 'left',
    width: 100,
  },
];

const ProjectProfileTable = ({ project_data }) => {
  return (
    <div className='pt-5 flex flex-col gap-y-6'>
      <Table
        /* @ts-ignore */
        columns={columns}
        emptyText={'Empty Data'}
        data={project_data}
        rowKey='id'
        scroll={{ x: 500 }}
        rowClassName='bg-white'
        className='bg-fill-secondary'
      />
    </div>
  );
};

export default ProjectProfileTable;
