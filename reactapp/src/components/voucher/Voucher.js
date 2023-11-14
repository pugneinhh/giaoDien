import React, { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space, 
   Table,
   Tag,
} from 'antd';
import {FilterFilled , UnorderedListOutlined}  from "@ant-design/icons";
import {MdDeleteForever} from 'react-icons/md';
import {IoAddSharp, IoInformation} from 'react-icons/io5';
import {BsPencilSquare} from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import { FaFilter } from 'react-icons/fa6';
import {} from '@ant-design/icons';
import "./Voucher.scss";

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
    
     //tìm kiếm
     const timKiem = (values) => {
      if(values.key!==undefined&&values.key!==null&&values.ngayBD!==undefined&&values.ngayBD!==null&&values.ngayKT!==undefined&&values.ngayKT!==null){
       console.log(values);
      // Send a POST request to the backend
      axios.get(`http://localhost:8080/voucher/tim-voucher/${values.key}/${moment(values.ngayBD).format('YYYY-MM-DD')}/${moment(values.ngayKT).format('YYYY-MM-DD')}`)
      .then(response => {
          // Update the list of items
          setVouchers(response.data);
          form.resetFields();
          
      })
      .catch(error => console.error('Error adding item:', error));
    }else{
      loadVoucher();
  
    }
    }
  

    //loadvoucher
    const loadVoucher=async()=>{
       
        await axios.get('http://localhost:8080/voucher')
        .then(response => {
          // Update the list of items
          setVouchers(response.data);
      })
      .catch(error => console.error('Error adding item:', error));
    
      
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
        <Button type='primary' danger shape="circle" icon={<IoInformation size={15} />}  />
        </a>
        <a>
        <Button type='primary' className='btn btn-success text-center' shape="circle" icon={<BsPencilSquare size={15} />}  />
        </a>
        
      </Space>
    ),
  },
];
    const [open, setOpen] = useState(false);
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
      <div className="container">
      <div>
         <div className="container-fluid">
      {/* <div className=" border border-bg-dark-subtle border-2 m-2 row" style={{borderRadius:20}}> */}
            <h3 className="text-center mt-2">Quản lý Voucher</h3>
            
            <div className=' bg-light m-2 p-3 pt-2' style={{borderRadius:20}}>
            <Collapse ghost expandIcon={({ isActive }) => <FilterFilled size={25}/>}
      items={[
        {
          key: '1',
          label: <b className='text-first fw-bold'> Bộ lọc</b>,
          children: <div className='container-fluid row'>
                    
          

          <Form className="row col-md-12"
              labelCol={{
                  span: 8,
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
              onFinish={timKiem}
              form={form}
          >
              <div className="col-md-4">
                  <Form.Item label="Tìm kiếm" name='key'>
                      <Input className='rounded-pill'/>
                  </Form.Item>
              </div>
              <div className='col-md-4'>
                  <Form.Item label="Ngày bắt đầu" name='ngayBD'>
                      <DatePicker className='rounded-pill' style={{ width: '100%' }} />
                  </Form.Item>
                  </div>
                  <div className='col-md-4'>
                  <Form.Item label="Ngày kết thúc" name='ngayKT'>
                      <DatePicker className='rounded-pill' style={{ width: '100%' }} />
                  </Form.Item>
              </div>
           
              <Form.Item className='text-end '>
                      <Button type="primary" htmlType='submit'>Tìm kiếm</Button>
                  </Form.Item>
           


          </Form>
        </div>,
        },
      ]}
    />
    <hr/>
           
    </div>
     {/* hết form Voucher */}
     <div className='col text-end mb-3 mt-2'>
             
             <>
               <Button type="primary" className='fw-bold nut-them rounded-pill' onClick={() => setOpen(true)}>
               + Thêm
               </Button>
               <Modal
                 title="Thêm voucher"
                 centered
                 open={open}
                 onOk={() => setOpen(false)}
                 onCancel={() => setOpen(false)}
                 width={1000}
               >
                 {/* form add voucher */}
                 <Form className="row col-md-12 mt-3"

      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 20,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 1000,
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
      <div className="col-md-4"></div>
      <div className="col-md-1"></div>
      <div className="col-md-4">
      <Form.Item className='text-center'>
      <Button type="primary" htmlType='submit'>Thêm</Button>
      </Form.Item>
      </div>
    </Form>
               </Modal>
             </>
   
         
         </div>

         <div className="text-first fw-bold">
            <p><UnorderedListOutlined /> Danh sách Voucher </p>
          </div>
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
 </div>
 </div>
      </div> 
          // </div>

    );
}
export default Voucher;