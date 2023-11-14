import React, { useEffect,useState } from 'react';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import { FaBug, FaRegCalendarCheck, FaRegFileAlt } from 'react-icons/fa'
import { Button, Modal, Table, Tag, Input } from 'antd';
import axios from "axios";
export default function HoaDonDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { TextArea } = Input;
  const [hoaDon, setHoaDons] = useState([])
  useEffect(() => {
    loadHoaDon();

  }, []);

  const loadHoaDon = async () => {

    const result = await axios.get('http://localhost:8080/hoa-don', {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setHoaDons(result.data);
    }


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
      title: 'Mã hóa đơn',
      dataIndex: 'ma',
      center: "true",

      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: 'Mã NV',
      dataIndex: 'maNV',
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
      title: 'Khách hàng',
      dataIndex: 'tenKH',
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
      title: 'SDT KH',
      dataIndex: 'sdt',
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
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai) => (
        <>
          {
            (trangThai == 0) ?
              (
                <Tag color="#00cc00">
                  Chờ xác nhận
                </Tag>
              ) :
              (trangThai == 1) ?
                (
                  <Tag color="#ff0000">
                    Xác nhận
                  </Tag>
                ) :
                (trangThai == 2) ?
                  (
                    <Tag color="#ff0000">
                      Chờ vận chuyển
                    </Tag>
                  ) :
                  (trangThai == 3) ?
                    (
                      <Tag color="#ff0000">
                        Vận chuyển
                      </Tag>
                    ) :
                    (trangThai == 4) ?
                      (
                        <Tag color="#ff0000">
                          Thanh toán
                        </Tag>
                      ) :
                      (trangThai == 5) ?
                        (
                          <Tag color="#ff0000">
                            Hoàn thành
                          </Tag>
                        ) :
                        (trangThai == 6) ?
                          (
                            <Tag color="#ff0000">
                              Hủy
                            </Tag>
                          ) :
                          (
                            <Tag color="">
                              Đã thanh toán
                            </Tag>
                          )
          }
        </>),
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
  
  ];

  return (
    <div>
      <div className='container-fuild   radius'>
        <div className='container mt-4  radius' >
          <div className='container-fuild pt-3 ' style={{ marginLeft: '60px' }}>
            {/* hóa đơn time line */}
            <Timeline minEvents={5} placeholder>
              <TimelineEvent
                color='#0066FF'
                icon={FaRegFileAlt}
                title='Chờ xác nhận'
                subtitle='26/03/2019 09:51'
              />
              <TimelineEvent
                color='#87a2c7'
                icon={FaRegCalendarCheck}
                title='Agendado'
                subtitle='26/03/2019 09:51'
              />
              <TimelineEvent
                color='#9c2919'
                icon={FaBug}
                title=''
                subtitle=''
                action={{
                  label: 'Ver detalhes...',
                  onClick: () => window.alert('Erro!')
                }}
              />
            </Timeline>
          </div>
          <div className='row'>
            {/* xác nhận đơn hàng */}
            <div className='col'>
              <>
                <Button type="primary" onClick={showModal}>
                  Xác nhận
                </Button>
                <Modal title="Xác nhận đơn hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <TextArea rows={4} />

                </Modal>
              </>
            </div>
            {/* lịch sử hóa đơn */}
            <div className='col text-end'>
             
                <>
                  <Button type="primary" onClick={() => setOpen(true)}>
                   Lịch sử
                  </Button>
                  <Modal
                    title="Lịch sử hóa đơn"
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={1000}
                  >
                    <Table dataSource={hoaDon} columns={columns} style={{marginTop:'25px'}} />
                  </Modal>
                </>
      
            
            </div>
          </div>
        </div>

          {/* Lịch sử thanh toán */}
        <div className='container mt-3 bg-light radius'>
         <h5 style={{marginLeft:'20px', marginTop:'20px',paddingTop:'20px'}}>Lịch sử thanh toán</h5>
         <hr/>
          <Table dataSource={hoaDon} columns={columns} style={{ marginTop: '25px' }} />
        </div>
        {/* Thông tin đơn hàng */}
        <div className='container mt-3 bg-light radius'>
          <h5 style={{ marginLeft: '20px', marginTop: '20px', paddingTop: '20px' }}>Thông tin đơn hàng</h5>
          <hr />
          
        </div>
      </div>
    </div>
  )
}
