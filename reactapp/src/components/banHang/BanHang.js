import { Button, Empty, Input, Modal, Space, Switch, Tabs, Tag } from "antd";
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { BsQrCodeScan } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { QrReader } from 'react-qr-reader';
import { MdOutlinePayments, MdOutlineShoppingCartCheckout } from "react-icons/md";
import axios from "axios";

const BanHang = () => {
  const [activeKey, setActiveKey] = useState(1);
  const [items, setItems] = useState([]);
  const newTabIndex = useRef(0);
  const demTab = useRef(0);

  const onChange = (key) => {
    setActiveKey(key);
  };


  const [maHD, setmaHD] = useState([])
  const [hoaDon, setHoaDons] = useState([])
  // const maHoaDon = maHD.map((item) => item.maHD);
  useEffect(() => {
    loadHoaDon();

  }, []);
  // load full hóa đơn
  const loadHoaDon = async () => {

    const result = await axios.get('http://localhost:8080/ban-hang', {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setHoaDons(result.data);
      setmaHD(result.data.maHD);
      console.log(maHD)

      console.log(hoaDon)
    }


  };
  //add và remove tab
  const add = () => {
    if (demTab.current >= 5) {
      return toast.error('Không được vượt quá 5 hóa đơn!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    const newActiveKey = `${newTabIndex.current++}`;
    setItems([
      ...items,
      {
        label: `Hóa đơn ${newTabIndex.current}`,
        children: `New Tab ${newTabIndex.current}`,
        key: newActiveKey,
      },
    ]);
    console.log('kkkkkkkk', newActiveKey);
    demTab.current++;
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
    demTab.current--;
    console.log('dem tru', demTab);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  ////quét QR sản phẩm
  const [openScan, setOpenScan] = useState(false);
  const [qrData, setQrData] = useState('');
  const handleCloseScan = () => {
    setOpenScan(false);
  }
  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      // Gửi dữ liệu mã QR lên server ở đây
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container border-1">

      <div className="text-end mt-3 me-4 mb-3">

        <Button type="primary" onClick={add} >Tạo hóa đơn</Button>
      </div>

      <div className="bg-light m-2 p-3 pt-2" style={{ borderRadius: 20 }}>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          items={items}
        />
        {/* hết tab hóa đơn */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-start">
            <h4><FaList /> Danh sách</h4>
          </div>
          <div className="text-end">
            <Button type="primary" icon={<BsQrCodeScan />} onClick={() => setOpenScan(true)}>Quét QR sản phẩm</Button>
            <Button type="primary" className="ms-3">Chọn sản phẩm</Button>
          </div>
        </div>
        {/* bảng giỏ hàng */}
        <div>
          <Empty
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy4Pi1fKO57hmDRxcyP1cVftjpGRe2xg-ymZd6Q25PAgeq7dUX4MqU5GGLK3UYYYc_s8s&amp;usqp=CAU"
            imageStyle={{
              height: 250,
            }}
            description={
              <span>
                Không có sản phẩm nào trong giỏ
              </span>
            }
          />

        </div>
        {/* hết giỏ hàng */}

        {/* thông tin khách hàng */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-start">
            <h4> Tài khoản</h4>
          </div>
          <div className="text-end">
            <Button className="ms-3">Chọn tài khoản</Button>
          </div>
        </div>
        <hr></hr>
        {/* thông tin khách hàng */}
        <div className="mb-3">
          <p>Tên khách hàng: <Tag color="#cccccc" className="rounded-pill">Khách lẻ</Tag></p>
        </div>
        {/* hết thông tin tài khoản */}
        <h4>Khách hàng</h4>
        <hr></hr>
        <div>
          <h4 className="fw-bold"><MdOutlineShoppingCartCheckout />Thông tin thanh toán</h4>
          <p>Thanh toán &nbsp;&nbsp;<Button icon={<MdOutlinePayments size={25} />}></Button></p>
          <Space.Compact

          >
            <Input defaultValue="Mã giảm giá" />
            <Button >Áp mã</Button>
          </Space.Compact>
          <p>Trả sau: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Switch defaultChecked /></p>
          <p>Giao hàng: &nbsp;&nbsp;&nbsp;<Switch /></p>
        </div>


      </div>


      <Modal
        title={<h5>QR core scaner</h5>}
        centered
        open={openScan}
        onOk={handleCloseScan}
        onCancel={handleCloseScan}
        footer={[
          <Button onClick={handleCloseScan}>Cancel</Button>
        ]}
        width={500}
      >
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          onResult={(result, error) => {
            if (!!result) {

              setQrData(result?.text);

            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: '100%' }}
        />
      </Modal>

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
  )

}
export default BanHang;