import React, { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space, 
   Switch, 
   Table,
   Tag,
} from 'antd';
import {FilterFilled , UnorderedListOutlined}  from "@ant-design/icons";
import { IoInformation} from 'react-icons/io5';
import {BsPencilSquare} from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import {PlusCircleOutlined} from '@ant-design/icons';
import "./Voucher.scss";
import ModelAddVoucher from "./ModelUpdateVoucher";
import ModalDetail from "./ModalDetail";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from '@testing-library/react';
import { FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { da } from 'date-fns/locale';


const Voucher = ()=>{
    // const [dataSearch,setDataSearch]=useState({
    //   tenVoucher:"",
    //   trangThaiVoucher:"",
    //   loaiVoucher:"",
    //   phuongThucVoucher:"",
    //   ngayBDVoucher:"",
    //   ngayKTVoucher:"",
    // });
     const [dataSearch,setDataSearch]=useState({});
    const onChangeFilter=(changedValues, allValues)=>{
      
      console.log("hi",changedValues);
      // console.log("gtri",value);
      setDataSearch(allValues);
      // setDataSearch(e);
      console.log(dataSearch);
      timKiemVoucher(dataSearch);
    }
    //call api tìm kiếm
    const timKiemVoucher=(dataSearch)=>{
      axios.post('http://localhost:8080/voucher/search-voucher',dataSearch)
      .then(response => {
          // Update the list of items
          setVouchers(response.data);
          console.log("tìm kím:",response.data);
      })
      .catch(error => console.error('Error adding item:', error));
    }




    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

  
    const [form] = Form.useForm();
 
    ///call api

    const[voucher,setVouchers]=useState([])
    const [myVoucher,setMyVoucher]=useState({});
    useEffect(()=>{
      loadVoucher();
      // setInterval(()=>{
      //   loadVoucher();
      // },60000);
      // return () => clearInterval();
      timKiemVoucher(dataSearch);
    },[dataSearch]);
    
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
       
        await axios.get('http://localhost:8080/voucher/hien-thi')
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
    title: 'Tên Voucher',
    dataIndex: 'ten',
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
    render: (record) => (
      
      <Space size="middle">
        <a>
        <Button type='primary' danger shape="circle" icon={<IoInformation size={15} />} onClick={()=>{detailVoucher(record)}} />
        </a>
        <a>
        <Button type='primary' className='btn btn-success text-center' shape="circle" icon={<BsPencilSquare size={15} />} onClick={()=>{editVoucher(record)}}/>
        </a>
        
      </Space>
      
  
    ),
    center:'true',
  },
];

  
  
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
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

    //khai  báo form update
    const editVoucher=(row)=>{
      setMyVoucher(row);
      setID(row.id);
      setOpenUpdate(true);
     
    }
    const resetMyVoucher=()=>{
      // setID('');
      setMyVoucher({});
    }
    //mở form detail
    const detailVoucher=(row)=>{
      setMyVoucher(row);
      setOpenDetail(true);
      console.log('voucher',myVoucher);
    }
    
    const getVoucherByID = async(id) => {
      await axios.get(`http://localhost:8080/voucher/detail/${id}`)
      .then(response => {
        // Update the list of items
        setMyVoucher(response.data);
    })
    .catch(error => console.error('Error adding item:', error));
  
    
    };
    const [id,setID]=useState('');
    
    
    ///validate ngày 
    const validateDateKT = (_, value) => {
      const { getFieldValue } = form;
      const startDate = getFieldValue('ngayBatDau');
      if (startDate && value &&value.isBefore(startDate)) {
        return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
      }
      return Promise.resolve();
    };
    const [checkNgay,setCheckNgay]=useState(false);

    const validateDateBD = (_, value) => {
      const newDate = new Date();
      // if(startDate && value && value.isAfter(moment)){
      //   return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
      // }
      const { getFieldValue } = form;
      const endDate = getFieldValue('ngayKetThuc');
      if(endDate && value && value.isAfter(endDate)){
        return Promise.reject('Ngày bắt đầu phải trước ngày kết thúc');
      }
      if ( value && value<newDate) {
        return Promise.reject('Ngày bắt phải sau ngày hiện tại');
      }
      return Promise.resolve();
    };
    //hiển thị số lượng
    const [gioiHan,setGioiHan]=useState(false);
    const handleChangeSwitch=(value)=>{
      setGioiHan(value);
    };
    
    return (

        <div className="container" style={{borderRadius:20}}>
      
      
         <div className="container-fluid">
         <Divider orientation="left" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <FaTag size={20} />Quản lý phiếu giảm giá</h4></Divider>
         {/* form tìm kiếm */}
            <div className=' bg-light m-2 p-3 pt-2' style={{border: '1px solid #ddd', // Border color
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
    borderRadius: '8px'}}>
            <h5><FilterFilled size={30}/> Bộ lọc</h5>
            <hr/>
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
              onValuesChange={onChangeFilter}
              size={componentSize}
              style={{
                  maxWidth: 1400,

              }}
              form={form}
          >
              <div className="col-md-4">
                  <Form.Item label="Tìm kiếm" name='tenVoucher'>
                      <Input className='rounded-pill border-warning' placeholder='Nhập mã hoặc tên hoặc mức độ giảm giá'/>
                  </Form.Item>
                  <Form.Item label="Hình thức" name='phuongThucVoucher'>
                  <Select defaultValue={'Phương thức'} style={{borderColor:'yellow'}}  >
                      <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
                      <Select.Option value="Phần trăm">Phần trăm</Select.Option>
                  </Select>
                  </Form.Item> 
              </div>

              <div className='col-md-4'>
              <Form.Item label="Loại" name='loaiVoucher' >
                  <Select defaultValue={'Tất cả'} style={{borderColor:'yellow'}}>
                      <Select.Option value="true">Giới hạn</Select.Option>
                      <Select.Option value="false">Không giới hạn</Select.Option>
                  </Select>
                  </Form.Item> 
                  <Form.Item label="Trạng thái" name='trangThaiVoucher' >
                  <Select defaultValue={'Tất cả'} style={{borderColor:'yellow'}}>
                      <Select.Option value="0">Sắp diễn ra</Select.Option>
                      <Select.Option value="1">Hoạt động</Select.Option>
                      <Select.Option value="2">Ngừng hoạt động</Select.Option>
                  </Select>
                  </Form.Item> 
                 
                  </div>
                  <div className='col-md-4'>
                  <Form.Item label="Ngày bắt đầu" name='ngayBDVoucher' >
                      <DatePicker className='rounded-pill border-warning' placeholder='Ngày bắt đầu' style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Ngày kết thúc" name='ngayKTVoucher'>
                      <DatePicker className='rounded-pill border-warning' placeholder='Ngày kết thúc' style={{ width: '100%' }} />
                  </Form.Item>
              </div>
           
              <Form.Item className='text-end '>
                      <Button type="primary" htmlType='reset'>Làm mới</Button>
                  </Form.Item>
          </Form>
      
    
           
    </div>
    {/* hết form tìm kiếm */}
     {/* view add voucher */}
     <div className=' text-end mt-3'>
             
     <Link to='/themVoucher' className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill"> <PlusCircleOutlined /> Thêm </Link>
        
            
               
             
   
         
         </div>
      {/* view table voucher */}
      <div style={{border: '1px solid #ddd', // Border color
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Box shadow
    borderRadius: '8px',padding:'10px'}}>
         <div className="text-first fw-bold">
            <p><UnorderedListOutlined size={30}/> Danh sách phiếu giảm giá </p>
          </div>
     <>
      <Table
        {...tableProps}
        pagination={{
          showQuickJumper: true,
          position: [top, bottom],
          defaultPageSize:5,
          defaultCurrent: 1,
          total: 100,
        }}
        columns={tableColumns}
        dataSource={hasData ? voucher : []}
        scroll={scroll}
        
      />
    </>
    </div>
    {/* hết table voucher */}
    <ModelAddVoucher id={id}  openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} myVoucher={myVoucher} setMyVoucher={setMyVoucher} resetMyVoucher={resetMyVoucher} loadVoucher={loadVoucher}/>

    <ModalDetail  openDetail={openDetail} setOpenDetail={setOpenDetail} myVoucher={myVoucher} setMyVoucher={setMyVoucher} resetMyVoucher={resetMyVoucher} loadVoucher={loadVoucher}/>
    
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
        </div>
 </div>
     
     ////VIEW UPDATE VOUCHER
     
    );
}
export default Voucher;