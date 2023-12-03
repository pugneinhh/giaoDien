import React, { useEffect, useRef, useState } from 'react';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import { FaCheckCircle } from 'react-icons/fa'
import { RiTruckFill } from "react-icons/ri";
import { SlNotebook } from "react-icons/sl";
import { GiNotebook, GiPiggyBank } from "react-icons/gi";
import { FaTruckFast } from "react-icons/fa6";
import { Button, Modal, Table, Tag, Input, Flex, Form, Image } from 'antd';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HoaDonDetail.scss'
import moment from 'moment';
import {useReactToPrint} from 'react-to-print';
import logo from '../../assets/images/logo.png';
import { FormattedNumber, IntlProvider } from 'react-intl';
export default function HoaDonDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [openXuat, setOpenXuat] = useState(false);
  const componnentRef=useRef();
  const handlePrint = useReactToPrint({
    content:()=> componnentRef.current,
    documentTitle:'hoaDon',
    onAfterPrint: () => toast('🦄 Thành công!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  });
  const { TextArea } = Input;
  const [hoaDondetail, setHoaDondetail] = useState([])
  useEffect(() => {
    loadHoaDon();
    loadNgayTimeLine();
  }, []);

  const loadHoaDon = async () => {
    await axios.get(`http://localhost:8080/detail-hoa-don/${id}`)
      .then(response => {
        // Update the list of items
        setHoaDondetail(response.data);

      })
      .catch(error => console.error('Error adding item:', error));

  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeshowModal = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();
  const handleSubmit = (values) => {


    axios.put(`http://localhost:8080/update-hoa-don/${id}`, values)
      .then(response => {
        // Update the list of items

        loadHoaDon();
        loadlichsuhoadon();
        loadNgayTimeLine();
        setTrangThai(response.data.trangThai);
        form.resetFields();
        setIsModalOpen(false);
        toast('🦄 Thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      })
      .catch(error => console.error('Error adding item:', error));





  }
  const [LichSuHoaDon, setLichSuHoaDon] = useState([])
  useEffect(() => {
    loadlichsuhoadon();
  }, []);

  const loadlichsuhoadon = async () => {
    await axios.get(`http://localhost:8080/detail-lich-su-hoa-don/${id}`)
      .then(response => {
        // Update the list of items
        setLichSuHoaDon(response.data);

      })
      .catch(error => console.error('Error adding item:', error));

  };

  const [ngayTimeLine, setngayTimeLine] = useState([])
  useEffect(() => {
    loadNgayTimeLine();

  }, []);
  // const myValue[] = ngayTimeLine.key;
  const ngay = ngayTimeLine.map((item) => item.hdtimeLine);
  const loadNgayTimeLine = async () => {

    await axios.get(`http://localhost:8080/ngay-hoa-don-time-line/${id}`)
      .then(response => {
        // Update the list of items
        setngayTimeLine(response.data);
      
      })
      .catch(error => console.error('Error adding item:', error));
  };


  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (id, record, index) => { ++index; return index },
      showSortTooltip: false,

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
                <Tag color="purple">
                  Chờ xác nhận
                </Tag>
              ) :
              (trangThai == 1) ?
                (
                  <Tag color="red">
                    Xác nhận
                  </Tag>
                ) :
                (trangThai == 2) ?
                  (
                    <Tag color="blue">
                      Chờ vận chuyển
                    </Tag>
                  ) :
                  (trangThai == 3) ?
                    (
                      <Tag color="cyan">
                        Đang Vận chuyển
                      </Tag>
                    ) :
                    (trangThai == 4) ?
                      (
                        <Tag color="orange">
                          Đã Thanh toán
                        </Tag>
                      ) :
                      (
                        <Tag color="green">
                          Thành công
                        </Tag>
                      )
          }

        </>),
    },
    {
      title: 'Ngày',
      dataIndex: 'ngayTao',
      center: "true",
      render: (ngayTao) => (
        <>{moment(ngayTao).format("hh:mm:ss DD/MM/YYYY")}</>
      ),
    },
    {
      title: 'Người xác nhận',
      dataIndex: 'nguoiTao',
      center: "true",
    },
    {
      title: 'Ghi chú',
      dataIndex: 'motaHoatDong',
      center: "true",
    },

  ];

  const columLichSuHoaDon = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (id, record, index) => { ++index; return index },
      showSortTooltip: false,

    },
    {
      title: 'Mã hóa đơn',
      dataIndex: 'trangThai',
      key: 'trangThai',
    },
    {
      title: 'Số tiền',
      dataIndex: 'trangThai',
      key: 'trangThai',
    },
    {
      title: 'Thời gian',
      dataIndex: 'ngayTao',
      center: "true",
      render: (ngayTao) => (
        <>{moment(ngayTao).format("hh:mm:ss DD/MM/YYYY")}</>
      ),
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'trangThai',
      key: 'trangThai',
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'trangThai',
      key: 'trangThai',
    },
    {
      title: 'Người xác nhận',
      dataIndex: 'nguoiTao',
      center: "true",
    },
    {
      title: 'Ghi chú',
      dataIndex: 'motaHoatDong',
      center: "true",
    },

  ];

  const [trangThai, setTrangThai] = useState([])
  const [loaiHD, setLoaiHD] = useState([])
  const [tenKH, setTenKH] = useState([])
  const [sdtKH, setsdtKH] = useState([])
  const [diaChiKH, setdiaChiKH] = useState([])
  const [thanhTienHD, setThanhTienHD] = useState([])
  const [ghiChuHD, setGhiChuHD] = useState([])
  const { id } = useParams();

  useEffect(() => {
    // Sử dụng giá trị `id` để thực hiện các thao tác cần thiết
    axios.get(`http://localhost:8080/detail-hoa-don/${id}`)
      .then(response => {
        setTrangThai(response.data.trangThai);
        setLoaiHD(response.data.loaiHD);
        setTenKH(response.data.tenKH);
        setsdtKH(response.data.sdt);
        setdiaChiKH(response.data.diaChiKH)
        setThanhTienHD(response.data.thanhTien)
        setGhiChuHD(response.data.ghiChuHD)
      })
      .catch(error => {
        // Xử lý lỗi
      });
  }, [id]);
  const [listSanPhams, setlistSanPhams] = useState([])
  useEffect(() => {
    loadListSanPhams();
  },[]);

  const loadListSanPhams = async () => {
    await axios.get(`http://localhost:8080/hoa-don-san-pham/${id}`)
      .then(response => {
        // Update the list of items
        setlistSanPhams(response.data);
     

      })
      .catch(error => console.error('Error adding item:', error));

  };

  const VALUES = ['Chờ xác nhận', 'Xác nhận', 'Chờ vận chuyển', 'Đang vận chuyển', 'Đã thanh toán', 'Thành công'];
  const textButton = ['Xác nhận', 'Chờ vận chuyển', 'Đang vận chuyển', 'Đã thanh toán', 'Thành công'];
  const icon = [GiNotebook, SlNotebook, RiTruckFill, FaTruckFast, GiPiggyBank, FaCheckCircle];

  return (


    <div className='container mt-4 radius  ' >
      <div className='container-fuild  row pt-3 pb-4 bg-light rounded border-danger '>
        <div>
          {/* hóa đơn time line */}
          <Timeline minEvents={6} index={trangThai} placeholder >
            {trangThai == 0 ?
              <Flex horizontal>
                <TimelineEvent
                  color='#25f55c'
                  icon={icon[trangThai]}
                  index={trangThai }
                  values={trangThai}
                  // indexClick={({ trangThai }) => setValue({ trangThai })}
                  isOpenEnding={true}
                  title={VALUES[trangThai]}
                  subtitle={moment(ngay[trangThai]).format('hh:mm:ss DD/MM/YYYY')}
                />
                <TimelineEvent
                  color='#e6e3e3'
                 
                />
                <TimelineEvent
                  color='#e6e3e3'

                />
                <TimelineEvent
                  color='#e6e3e3'

                />
                <TimelineEvent
                  color='#e6e3e3'
                />
                <TimelineEvent
                  color='#e6e3e3'
                />
              </Flex> : trangThai == 1 ?
                <Flex horizontal>
                  <TimelineEvent
                    color='#25f55c'
                    icon={icon[trangThai - 1]}
                    index={trangThai - 1}
                    values={trangThai - 1}
                    // indexClick={({ trangThai }) => setValue({ trangThai })}
                    isOpenEnding={true}
                    title={VALUES[trangThai - 1]}
                    subtitle={moment(ngay[trangThai - 1]).format('hh:mm:ss DD/MM/YYYY')}

                  />
                  <TimelineEvent
                    color='#25f55c'
                    icon={icon[trangThai]}
                    index={trangThai}
                    values={trangThai}
                    // indexClick={({trangThai}) => setValue({trangThai})}
                    isOpenEnding={true}
                    title={VALUES[trangThai]}
                    subtitle={moment(ngay[trangThai]).format('hh:mm:ss DD/MM/YYYY')}
                  />
                  <TimelineEvent
                    color='#e6e3e3'
                  
                  />
                  <TimelineEvent
                    color='#e6e3e3'

                  />
                  <TimelineEvent
                    color='#e6e3e3'
                  />
                  <TimelineEvent
                    color='#e6e3e3'
                  />
                </Flex> :
                trangThai == 2 ?
                  <Flex horizontal>
                    <TimelineEvent
                      color='#25f55c'
                      icon={icon[trangThai - 2]}
                      index={trangThai - 2}
                      values={trangThai - 2}
                      // indexClick={({ trangThai }) => setValue({ trangThai })}
                      isOpenEnding={true}
                      title={VALUES[trangThai - 2]}
                      subtitle={moment(ngay[trangThai - 2]).format('hh:mm:ss DD/MM/YYYY')}
                    />
                    <TimelineEvent
                      color='#25f55c'
                      icon={icon[trangThai - 1]}
                      index={trangThai - 1}
                      values={trangThai - 1}
                      // indexClick={({trangThai}) => setValue({trangThai})}
                      isOpenEnding={true}
                      title={VALUES[trangThai - 1]}
                      subtitle={moment(ngay[trangThai - 1]).format('hh:mm:ss DD/MM/YYYY')}
                    />
                    <TimelineEvent
                      color='#25f55c'
                      icon={icon[trangThai]}
                      index={trangThai}
                      values={trangThai}
                      // indexClick={({trangThai}) => setValue({trangThai})}
                      isOpenEnding={true}
                      title={VALUES[trangThai]}
                      subtitle={moment(ngay[trangThai]).format('hh:mm:ss DD/MM/YYYY')}
                    />
                    <TimelineEvent
                      color='#e6e3e3'
                    />
                    <TimelineEvent
                      color='#e6e3e3'
                    />
                    <TimelineEvent
                      color='#e6e3e3'
                    />
                  </Flex> :
                  trangThai == 3 ?
                    <Flex horizontal>
                      <TimelineEvent
                        color='#25f55c'
                        icon={icon[trangThai - 3]}
                        index={trangThai - 3}
                        values={trangThai - 3}
                        // indexClick={({ trangThai }) => setValue({ trangThai })}
                        isOpenEnding={true}
                        title={VALUES[trangThai - 3]}
                        subtitle={moment(ngay[trangThai - 3]).format('hh:mm:ss DD/MM/YYYY')}
                      />
                      <TimelineEvent
                        color='#25f55c'
                        icon={icon[trangThai - 2]}
                        index={trangThai - 2}
                        values={trangThai - 2}
                        // indexClick={({ trangThai }) => setValue({ trangThai })}
                        isOpenEnding={true}
                        title={VALUES[trangThai - 2]}
                        subtitle={moment(ngay[trangThai - 2]).format('hh:mm:ss DD/MM/YYYY')}
                      />
                      <TimelineEvent
                        color='#25f55c'
                        icon={icon[trangThai - 1]}
                        index={trangThai - 1}
                        values={trangThai - 1}
                        // indexClick={({trangThai}) => setValue({trangThai})}
                        isOpenEnding={true}
                        title={VALUES[trangThai - 1]}
                        subtitle={moment(ngay[trangThai - 1]).format('hh:mm:ss DD/MM/YYYY')}
                      />
                      <TimelineEvent
                        color='#25f55c'
                        icon={icon[trangThai]}
                        index={trangThai}
                        values={trangThai}
                        // indexClick={({trangThai}) => setValue({trangThai})}
                        isOpenEnding={true}
                        title={VALUES[trangThai]}
                        subtitle={moment(ngay[trangThai]).format('hh:mm:ss DD/MM/YYYY')}
                      />
                      <TimelineEvent
                        color='#e6e3e3'
                      />
                      <TimelineEvent
                        color='#e6e3e3'
                      />
                    </Flex> :
                    trangThai == 4 ?
                      <Flex horizontal>
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai - 4]}
                        
                          index={trangThai - 4}
                          values={trangThai - 4}
                          // indexClick={({ trangThai }) => setValue({ trangThai })}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 4]}
                          subtitle={moment(ngay[trangThai - 4]).format('hh:mm:ss DD/MM/YYYY')}
                        />

                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai - 3]}
                          index={trangThai - 3}
                          values={trangThai - 3}
                          // indexClick={({ trangThai }) => setValue({ trangThai })}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 3]}
                          subtitle={moment(ngay[trangThai - 3]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai - 2]}
                          index={trangThai - 2}
                          values={trangThai - 2}
                          // indexClick={({ trangThai }) => setValue({ trangThai })}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 2]}
                          subtitle={moment(ngay[trangThai - 2]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai - 1]}
                          index={trangThai - 1}
                          values={trangThai - 1}
                          // indexClick={({trangThai}) => setValue({trangThai})}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 1]}
                          subtitle={moment(ngay[trangThai - 1]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai]}
                          index={trangThai}
                          values={trangThai}
                          // indexClick={({trangThai}) => setValue({trangThai})}
                          isOpenEnding={true}
                          title={VALUES[trangThai]}
                          subtitle={moment(ngay[trangThai]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                        <TimelineEvent
                          color='#e6e3e3'
                        />
                      </Flex> :

                      <Flex horizontal style={{ width: 50 }} >
                        <TimelineEvent
                          color='#25f55c'
                          iconStyle={{ marginLeft: 10 }}
                          icon={icon[trangThai - 5]}
                          index={trangThai - 5}
                          values={trangThai - 5}
                          // indexClick={({ trangThai }) => setValue({ trangThai })}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 5]}
                          subtitle={moment(ngay[trangThai - 5]).format('hh:mm:ss DD/MM/YYYY')}
                        
                        
                        />
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai - 4]}
                          index={trangThai - 4}
                          values={trangThai - 4}
                          // indexClick={({ trangThai }) => setValue({ trangThai })}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 4]}
                          subtitle={moment(ngay[trangThai - 4]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai - 3]}
                          index={trangThai - 3}
                          values={trangThai - 3}
                          // indexClick={({ trangThai }) => setValue({ trangThai })}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 3]}
                          subtitle={moment(ngay[trangThai - 3]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai - 2]}
                          index={trangThai - 2}
                          values={trangThai - 2}
                          // indexClick={({ trangThai }) => setValue({ trangThai })}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 2]}
                          subtitle={moment(ngay[trangThai - 2]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai - 1]}
                          index={trangThai - 1}
                          values={trangThai - 1}
                          // indexClick={({trangThai}) => setValue({trangThai})}
                          isOpenEnding={true}
                          title={VALUES[trangThai - 1]}
                          subtitle={moment(ngay[trangThai - 1]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                        <TimelineEvent
                          color='#25f55c'
                          icon={icon[trangThai]}
                          index={trangThai}
                          values={trangThai}
                          // indexClick={({trangThai}) => setValue({trangThai})}
                          isOpenEnding={true}
                          title={VALUES[trangThai]}
                          subtitle={moment(ngay[trangThai]).format('hh:mm:ss DD/MM/YYYY')}
                        />
                      </Flex>


            }

          </Timeline>
        </div>

        {/* xác nhận đơn hàng */}
        <div className='col-md-2'>
             < >
              <>
                {trangThai == 0 ? <Button className='ms-5 ' type="primary" onClick={showModal}>{textButton[trangThai]}</Button>
                  : trangThai == 1 ? <Button className='ms-5 ' type="primary" onClick={showModal}>{textButton[trangThai]}</Button>
                    : trangThai == 2 ? <Button className='ms-5 ' type="primary" onClick={showModal}>{textButton[trangThai]}</Button>
                      : trangThai == 3 ? <Button className='ms-5 ' type="primary" onClick={showModal}>{textButton[trangThai]}</Button>
                        : trangThai == 4 ? <Button className='ms-5 ' type="primary" onClick={showModal}>{textButton[trangThai]}</Button>
                          : <></>}


              </>
            <Modal title="Xác nhận đơn hàng" footer={[]} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >

                <Form
                  form={form}
                  onFinish={handleSubmit}
            
                >
                <Form.Item name='moTaHoatDong' hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không để trống ghi chú!',
                    },
                  ]}>
                    <TextArea rows={4} />
                  </Form.Item>

                  <Button style={{ marginLeft: 200 }} className='bg-success text-light' onClick={() => {
                    Modal.confirm({
                      title: 'Thông báo',
                      content: 'Bạn có chắc chắn muốn tiếp tục?',
                      onOk: () => { form.submit(); },
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      ),
                    });
                  }}>Xác nhận</Button>

                </Form>
              </Modal >
            </>

      
        </div>
        <div className='col-md-2'> 
          <>

            <Button type="primary"  onClick={() => setOpenXuat(true)}>
              Xuất hóa đơn
            </Button>
            <Modal
              footer={[]}
              title="In hóa đơn"
              centered
              open={openXuat}
              onOk={() => setOpenXuat(false)}
              onCancel={() => setOpenXuat(false)}
              width={1000}
              height={600}
            >
                <>
                <div ref={componnentRef} className='row' >
                  <div className='col-md-2'>
                    <img src={logo} style={{ width: 150, height: 150, marginLeft: 30 }}/>
                  </div>
            
                  <h2 className=' my-5  py-2 col-md-10 ' style={{paddingLeft:250}}>  MI SHOES</h2>
                  <div className='col-md-3'>
                    <div style={{marginLeft:30}}>
                      <h6>Tên khách hàng:</h6>
                    </div>
                    <div className='mt-4' style={{ marginLeft: 30 }}>
                      <h6>Số điện thoại:</h6>
                    </div>
                    <div className='mt-4' style={{ marginLeft: 30 }}>
                      <h6>Địa chỉ:</h6>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div>
                      <p>{tenKH}</p>
                    </div>
                    <div className='mt-4'>
                      <p>{sdtKH}</p>
                    </div>
                    <div className='mt-4'>
                      <p>{diaChiKH}</p>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='ps-4'>
                      <h6>Trạng thái:</h6>
                    </div>
                    <div className='mt-4 ps-4'>
                      <h6>Loại:</h6>
                    </div>
                    <div className='mt-4 ps-4'>
                      <h6>Thành tiền:</h6>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div>
                      {
                        (trangThai == 0) ?
                          (
                            <Tag color="purple">
                              Chờ xác nhận
                            </Tag>
                          ) :
                          (trangThai == 1) ?
                            (
                              <Tag color="red">
                                Xác nhận
                              </Tag>
                            ) :
                            (trangThai == 2) ?
                              (
                                <Tag color="blue">
                                  Chờ vận chuyển
                                </Tag>
                              ) :
                              (trangThai == 3) ?
                                (
                                  <Tag color="cyan">
                                    Đang Vận chuyển
                                  </Tag>
                                ) :
                                (trangThai == 4) ?
                                  (
                                    <Tag color="orange">
                                      Đã Thanh toán
                                    </Tag>
                                  ) :
                                  (
                                    <Tag color="green">
                                      Thành công
                                    </Tag>
                                  )
                      }

                    </div>
                    <div className='mt-4'>
                      {(loaiHD == 0) ? (<Tag color="orange">Online</Tag>) : (<Tag color="red">Tại quầy</Tag>)}
                    </div>
                    <div className='mt-4'>
                      <p>  <IntlProvider locale='vi-VN'>
                        <div>
                          <FormattedNumber
                            value={thanhTienHD}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </div>
                      </IntlProvider>
                      </p>
                    </div>
                  </div>
                  <div className='container-fuild mt-3 row  radius'>
                    <div>
                      {
                        listSanPhams.map((listSanPham, index) => (
                          <tr className='pt-3 row'>
                            <div className='col-md-4'>   <img src={require(`../../assets/images/${listSanPham.tenHA}`)} style={{ width: 100, height: 100, marginLeft: 40 }} /> </div>
                            <div className='col-md-6 '>
                              <div className='mt-4'><h6>{listSanPham.tenHang}  {listSanPham.tenSP}  {listSanPham.tenMauSac}</h6></div>
                              <div className='text-danger'><h6>   
                                 <IntlProvider locale='vi-VN'>
                                <div>
                                  <FormattedNumber
                                    value={listSanPham.giaBanSP}
                                    style="currency"
                                    currency="VND"
                                    minimumFractionDigits={0}
                                  />
                                </div>
                              </IntlProvider></h6></div>
                              <div>Size:{listSanPham.tenKichThuoc}</div>
                              <div>x{listSanPham.soLuongSP}</div>
                            </div>

                            <div className='col-md-2 text-danger mt-5'><h6>  
                                <IntlProvider locale='vi-VN'>
                              <div>
                                <FormattedNumber
                                  value={listSanPham.thanhTienSP}
                                  style="currency"
                                  currency="VND"
                                  minimumFractionDigits={0}
                                />
                              </div>
                            </IntlProvider></h6></div>
                         
                          </tr>

                        ))
                      }
                    </div>
                    <hr></hr>
                    <tr className='pt-3 row'>
                      <div className='col-md-6'></div>
                      <div className='col-md-3'></div>
                      <div className='col-md-3'>
                        <div className='d-flex'><h6 className='col-md-6'>Tiền hàng:</h6 >  <p className='col-md-6' >
                          <IntlProvider locale='vi-VN'>
                            <div>
                              <FormattedNumber
                                value={thanhTienHD}
                                style="currency"
                                currency="VND"
                                minimumFractionDigits={0}
                              />
                            </div>
                          </IntlProvider></p> </div>
                        <div className='d-flex'><h6 className='col-md-6'>Phí vận chuyển:</h6 >  <p className='col-md-6' >0 VND</p> </div>
                        <div className='d-flex'><h6 className='col-md-6'>Tổng tiền giảm:</h6 >  <p className='col-md-6' >0 VND</p> </div>
                        <div className='d-flex'><h6 className='col-md-6'>Tổng giảm:</h6 >  <p className='col-md-6' > 
                           <IntlProvider locale='vi-VN'>
                          <div>
                            <FormattedNumber
                              value={thanhTienHD}
                              style="currency"
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                          </div>
                        </IntlProvider></p> </div>
                      </div>
                    </tr>
                  </div>

                </div>
           

                <button className='bg-primary text-light rounded-pill mt-5 fs-5' style={{marginLeft:420}} onClick={handlePrint}>Xuất hóa đơn</button>
                </>
            </Modal>
          </>
        </div>
        {/* lịch sử hóa đơn */}
        <div className='col-md-2'></div>
        <div className='col-md-2'></div>
        <div className='col-md-2'></div>
        <div className='col-md-2 text-end'>

          <>
            <Button className='me-5 bg-success' type="primary" onClick={() => setOpen(true)}>
              Lịch sử
            </Button>
            <Modal
              title="Lịch sử hóa đơn"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={800}
            >
              <Table dataSource={LichSuHoaDon} columns={columns} style={{ marginTop: '25px' }} pagination={{}} />
            </Modal>
          </>


        </div>

      </div>


      {/* Lịch sử thanh toán */}
      <div className='container-fuild row mt-3 bg-light radius'>
        <h5 style={{ marginTop: '20px', paddingTop: '20px' }}>Lịch sử thanh toán</h5>
        <hr />
        <Table columns={columLichSuHoaDon} style={{ marginTop: '25px' }} />
      </div>
      {/* Thông tin đơn hàng */}
      <div className='container-fuild mt-3 row bg-light radius'>
        <h5 style={{ marginTop: '20px', paddingTop: '20px' }}>Thông tin đơn hàng</h5>
        <hr />
        <div className='col-md-3'>
          <div className='ps-4'>
            <h6>Trạng thái:</h6>
          </div>
          <div className='mt-4 ps-4'>
            <h6>Loại:</h6>
          </div>
          <div className='mt-4 ps-4'>
            <h6>Địa chỉ:</h6>
          </div>
        </div>
        <div className='col-md-3'>
          <div>
            {
              (trangThai == 0) ?
                (
                  <Tag color="purple">
                    Chờ xác nhận
                  </Tag>
                ) :
                (trangThai == 1) ?
                  (
                    <Tag color="red">
                      Xác nhận
                    </Tag>
                  ) :
                  (trangThai == 2) ?
                    (
                      <Tag color="blue">
                        Chờ vận chuyển
                      </Tag>
                    ) :
                    (trangThai == 3) ?
                      (
                        <Tag color="cyan">
                          Đang Vận chuyển
                        </Tag>
                      ) :
                      (trangThai == 4) ?
                        (
                          <Tag color="orange">
                            Đã Thanh toán
                          </Tag>
                        ) :
                        (
                          <Tag color="green">
                            Thành công
                          </Tag>
                        )
            }

          </div>
          <div className='mt-4'>
            {(loaiHD == 0) ? (<Tag color="orange">Online</Tag>) : (<Tag color="red">Tại quầy</Tag>)}
          </div>
          <div className='mt-4'>
            <p>{diaChiKH}</p>
          </div>
        </div>
        <div className='col-md-3'>
          <div>
            <h6>Tên khách hàng:</h6>
          </div>
          <div className='mt-4'>
            <h6>Số điện thoại:</h6>
          </div>
          <div className='mt-4'>
            <h6>Ghi chú :</h6>
          </div>
        </div>
        <div className='col-md-3'>
          <div>
            <p>{tenKH}</p>
          </div>
          <div className='mt-4'>
            <p>{sdtKH}</p>
          </div>
          <div className='mt-4'>
            <p>{ghiChuHD}</p>
          </div>
        </div>

      </div>
       {/* detail hóa đơn */}
      <div className='container-fuild mt-3 row bg-light radius'>
        <div>
          {
            listSanPhams.map((listSanPham, index) => (
              <tr className='pt-3 row'>
                
                <div className='col-md-3'>  
                  <Image src={require(`../../assets/images/${listSanPham.tenHA}`)} style={{ width: 150, height: 150, marginLeft: 15 }} /> 
                 
                 </div>
                <div className='col-md-5 '> 
                  <div className='mt-4'><h6>{listSanPham.tenHang}  {listSanPham.tenSP}  {listSanPham.tenMauSac}</h6></div> 
                  <div className='text-danger'>
                    <h6>
                      <IntlProvider locale='vi-VN'>
                        <div>
                          <FormattedNumber
                            value={listSanPham.giaBanSP}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </div>
                      </IntlProvider></h6></div> 
                <div>Size:{listSanPham.tenKichThuoc}</div>
                  <div>x{listSanPham.soLuongSP}</div>
                </div>
                
                <div className='col-md-2 text-danger mt-5'><h6>     
                  <IntlProvider locale='vi-VN'>
                  <div>
                    <FormattedNumber
                        value={listSanPham.thanhTienSP}
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
               </h6></div>
                <div className='col-md-2 text-danger mt-5'><Tag color="red">Trả hàng</Tag></div>
              </tr>
             
            ))
          }
        </div>
        <hr></hr>
        <tr className='pt-3 row'>
          <div className='col-md-6'></div>
          <div className='col-md-3'></div>
          <div className='col-md-3'>
            <div className='d-flex'><h6 className='col-md-8'>Tiền hàng:</h6 > 
              <p className='col-md-4' >
                <IntlProvider locale='vi-VN'>
                  <div>
                    <FormattedNumber
                      value={thanhTienHD}
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              
              </p> 
             
             </div>
            <div className='d-flex'><h6 className='col-md-8'>Phí vận chuyển:</h6 >  <p className='col-md-4' >  <IntlProvider locale='vi-VN'>
              <div>
                <FormattedNumber
                  value={0}
                  style="currency"
                  currency="VND"
                  minimumFractionDigits={0}
                />
              </div>
            </IntlProvider></p> </div>
            <div className='d-flex'><h6 className='col-md-8'>Tổng tiền giảm:</h6 >  <p className='col-md-4' >  <IntlProvider locale='vi-VN'>
              <div>
                <FormattedNumber
                  value={0}
                  style="currency"
                  currency="VND"
                  minimumFractionDigits={0}
                />
              </div>
            </IntlProvider></p> </div>
            <div className='d-flex'><h6 className='col-md-8'>Tổng giảm:</h6 >  <p className='col-md-4' >       
            <IntlProvider locale='vi-VN'>
              <div>
                <FormattedNumber
                  value={thanhTienHD}
                  style="currency"
                  currency="VND"
                  minimumFractionDigits={0}
                />
              </div>
            </IntlProvider></p> </div>
          </div>
        </tr>
      </div>

    
       

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
      <ToastContainer />
    </div>





  )
}
