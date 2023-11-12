import React, { useState } from 'react';
import {DownOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Radio,
   Switch, 
   Table,
} from 'antd';
const onChange = (value) => {
    console.log('changed', value);
  };
//table


const columns = [
  {
    title: 'Mã Voucher',
    dataIndex: 'name',
  },
  {
    title: 'Phương thức',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Mức độ',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'address',
    filters: [
      {
        text: 'Hoạt động',
        value: 'Hoạt động',
      },
      {
        text: 'Ngừng hoạt động',
        value: 'Ngừng hoạt động',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a>
          <Space>
            More actions
            <DownOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
];
const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: Number(`${i}2`),
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}
const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

const Voucher = ()=>{
    //của form voucher
    const [selectedValue, setSelectedValue] = useState('Tiền mặt');
    const handleChange = (value) => {
        console.log(`Selected value: ${value}`);
        setSelectedValue(value);
      };
    

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    //của table
    const [bordered, setBordered] = useState(false);
    const [size, setSize] = useState('large');
    const [expandable, setExpandable] = useState(undefined);
    const [showHeader, setShowHeader] = useState(true);
    const [rowSelection, setRowSelection] = useState({});
    const [hasData, setHasData] = useState(true);
    const [tableLayout, setTableLayout] = useState();
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomCenter');
    const [ellipsis, setEllipsis] = useState(false);
    const [yScroll, setYScroll] = useState(false);
    const [xScroll, setXScroll] = useState();
    
    const handleSizeChange = (e) => {
      setSize(e.target.value);
    };
    const handleTableLayoutChange = (e) => {
      setTableLayout(e.target.value);
    };
   

    const handleRowSelectionChange = (enable) => {
      setRowSelection(enable ? {} : undefined);
    };
    const handleYScrollChange = (enable) => {
      setYScroll(enable);
    };
    const handleXScrollChange = (e) => {
      setXScroll(e.target.value);
    };
    const handleDataChange = (newHasData) => {
      setHasData(newHasData);
    };
    const scroll = {};
    if (yScroll) {
      scroll.y = 240;
    }
    if (xScroll) {
      scroll.x = '100vw';
    }
    const tableColumns = columns.map((item) => ({
      ...item,
      ellipsis,
    }));
    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }
    const tableProps = {
      bordered,
      size,
      expandable,
      showHeader,
      rowSelection,
      scroll,
      tableLayout,
    };

    return (
        <div className="container border border-bg-dark-subtle border-2 m-2 row" style={{borderRadius:20}}>
            <h3 className="text-center mt-2">Quản lý Voucher</h3>
            <div className='bg-light m-2 p-3 pt-5' style={{borderRadius:20}}>
            <Form className=" row col-md-12"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 1600,
      }}
    >
        <div className="col-md-4">
      <Form.Item label="Mã Voucher">
        <Input />
      </Form.Item>
      <Form.Item label="Phương thức">
        <Select value={selectedValue} onChange={handleChange}>
          <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
          <Select.Option value="Phần trăm">Phần trăm</Select.Option>
        </Select>
      </Form.Item>
      </div>
      <div className='col-md-4'>
      <Form.Item label="Mức độ">
          {selectedValue==='Tiền mặt'?
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      onChange={onChange}
      style={{width:'100%'}}
    />
    :
    <InputNumber
      defaultValue={0}
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value) => value.replace('%', '')}
      onChange={onChange}
      style={{width:'100%'}}
    />
          }
      </Form.Item>
      <Form.Item label="Giảm tối đa">
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      onChange={onChange}
      style={{width:'100%'}}
    />
      </Form.Item>
      <Form.Item label="Điều kiện">
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      onChange={onChange}
      style={{width:'100%'}}
    />
        
      </Form.Item>
      </div>
      <div className='col-md-4'>
      
      <Form.Item label="Ngày bắt đầu">
      <DatePicker style={{width:'100%'}}/>
      </Form.Item>
      <Form.Item label="Ngày kết thúc">
      <DatePicker style={{width:'100%'}}/>
      </Form.Item>
      </div>
      
      <Form.Item className='text-center'>
      <Button type="primary">Thêm</Button>
      </Form.Item>
      
    </Form>
    </div>
     {/* hết form Voucher */}

     <>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
    </>
        </div>

       
          

    );
}
export default Voucher;