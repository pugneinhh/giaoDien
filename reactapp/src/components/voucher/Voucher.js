import React, { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space, 
   Table,
   Tag,
} from 'antd';
import {MdDeleteForever} from 'react-icons/md';
import {IoInformation} from 'react-icons/io5';
import {BsPencilSquare} from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';

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

  
    const [form] = Form.useForm();

    
    const handleSubmit = (value) => {
    
       
      // Send a POST request to the backend
      axios.post('http://localhost:8080/voucher/add',value)
      .then(response => {
          // Update the list of items
          console.log(response.data);
          loadVoucher();
          form.resetFields();
          
      })
      .catch(error => console.error('Error adding item:', error));
    }
  
    ///call api

    const[voucher,setVouchers]=useState([])
    
    useEffect(()=>{
        loadVoucher();
    },[]);

     

    //loadvoucher
    const loadVoucher=async()=>{
       
        const result = await axios.get('http://localhost:8080/voucher', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setVouchers(result.data); 
        }  
    
      
    };
    //của table
    //table


const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    key: 'id',
    render: (id,record,index) => {++index; return index},
    showSortTooltip:false,
},
  {
    title: 'Mã Voucher',
    dataIndex: 'ma',
    sorter: (a, b) => a.ma - b.ma,
  },
  {
    title: 'Phương thức',
    dataIndex: 'phuongThuc',
    sorter: (a, b) => a.phuongThuc - b.phuongThuc,
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'ngayBatDau',
    render: (ngayBatDau) => (
      <>{moment(ngayBatDau).format("DD/MM/YYYY")}</>
  ),
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'ngayKetThuc',
    render: (ngayKetThuc) => (
      <>{moment(ngayKetThuc).format("DD/MM/YYYY")}</>
  ),
    sorter: (a, b) => a.ngayKetThuc - b.ngayKetThuc,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
    key: 'trangThai',
            render: (trangThai) => (
                <>
                    {
                        (trangThai == 0) ?
                            (
                                <Tag color="green">
                                    Hoạt động
                                </Tag>
                            ) :
                            
                                    <Tag color="red">
                                        Ngừng hoạt động
                                    </Tag>
                              
                    }
                </>),
    filters: [
      {
          text: 'Hoạt động',
          value: '0',
      },
      {
          text: 'Ngừng hoạt động',
          value: '1',
      },

  ],
  onFilter: (value, record) => record.trangThai.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>
        <Button  danger shape="circle" icon={<IoInformation size={22} />}  />
        </a>
        <a>
        <Button success shape="circle" icon={<BsPencilSquare size={22} />}  />
        </a>
        <a>
          <Button type="primary" danger shape="circle" icon={<MdDeleteForever size={20} />}  />
        </a>
      </Space>
    ),
  },
];

    const [bordered] = useState(false);
    const [size] = useState('large');
    const [expandable] = useState(undefined);
    const [showHeader] = useState(true);
    const [hasData] = useState(true);
    const [tableLayout] = useState();
    const [top] = useState('none');
    const [bottom] = useState('bottomCenter');
    const [ellipsis] = useState(false);
    const [yScroll] = useState(false);
    const [xScroll] = useState();
    
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
      scroll,
      tableLayout,
    };

    return (
        <div className="container border border-bg-dark-subtle border-2 m-2 row" style={{borderRadius:20}}>
            <h3 className="text-center mt-2">Quản lý Voucher</h3>
            
            <div className='bg-light m-2 p-3 pt-5' style={{borderRadius:20}}>
            <Collapse
      items={[
        {
          key: '1',
          label: 'This is default size panel header',
          children: <p>hehehe</p>,
        },
      ]}
    />
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
      onFinish={handleSubmit}
      form={form}
    
    >
        <div className="col-md-4">
      <Form.Item label="Mã Voucher" name='ma'  >
        <Input  required/>
      </Form.Item>
      <Form.Item label="Phương thức" name='phuongThuc'>
        <Select defaultValue={selectedValue} onChange={handleChange}>
          <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
          <Select.Option value="Phần trăm">Phần trăm</Select.Option>
        </Select>
      </Form.Item>
      </div>
      <div className='col-md-4'>
      <Form.Item label="Mức độ" name='mucDo'>
          {selectedValue==='Tiền mặt'?
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      style={{width:'100%'}}
      
    />
    :
    <InputNumber
      defaultValue={0}
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value) => value.replace('%', '')}
      style={{width:'100%'}}
      
    />
          }
      </Form.Item>
      <Form.Item label="Giảm tối đa" name='giamToiDa'>
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      style={{width:'100%'}}
       
    />
      </Form.Item>
      <Form.Item label="Điều kiện" name='dieuKien'>
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      style={{width:'100%'}}
      
    />
        
      </Form.Item>
      </div>
      <div className='col-md-4'>
      
      <Form.Item label="Ngày bắt đầu" name='ngayBatDau'>
      <DatePicker style={{width:'100%'}}    />
      </Form.Item>
      <Form.Item label="Ngày kết thúc"  name='ngayKetThuc'>
      <DatePicker style={{width:'100%'}}  />
      </Form.Item>
      </div>
      
      <Form.Item className='text-center'>
      <Button type="primary" htmlType='submit'>Thêm</Button>
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
        dataSource={hasData ? voucher : []}
        scroll={scroll}
      />
    </>
        </div>

       
          

    );
}
export default Voucher;