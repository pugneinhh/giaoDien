import React, { useState, useEffect, Text, View, Component } from "react";
import axios from "axios";
import {
  Table,
  Tag,
  Checkbox
} from "antd";
import "./KhuyenMai.scss";


const TableChiTietSanPham = ({ selectedIDSPs }) => {
  const [ctsp, setCTSP] = useState([]);
  const [idSanPham, setIDSanPham] = useState([]);
  const [selectedRowCTSP, setSelectedRowCTSP] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [selectedCTSP , setSelectedCTSP] = useState([]);
  useEffect(() => {
    const getCTSPByIDSP = async () => {
      try {
        if (selectedIDSPs.length === 1) {
          const response = await axios.get(`http://localhost:8080/ctsp/showct/${selectedIDSPs[0]}`)
          setCTSP(response.data);
          setIDSanPham(selectedIDSPs);
          console.log("CTSP 1",ctsp);
        }
        else if (selectedIDSPs.length > 1) {
          const filterArrray = selectedIDSPs.filter((element) => !idSanPham.includes(element));
          if (filterArrray.length !== 0 ) {
           const responses = await Promise.all(filterArrray.map(id => axios.get(`http://localhost:8080/ctsp/showct/${id}`)));
            const responseData = responses.map((response) => (
              setCTSP(prevData  => response.data.includes(prevData) ? console.log("trùng:" ,prevData) : 
                [...prevData ,...response.data])));
              setIDSanPham(prevData => [...prevData , ...filterArrray]);
          } else {
            console.log("Xóa");
            const responses = await Promise.all(selectedIDSPs.map(id => axios.get(`http://localhost:8080/ctsp/showct/${id}`)));
            for (let i = 0 ; i < responses.length ; i++){
              if (i== 0) setCTSP(responses[0].data);
              else setCTSP((prevData) => [...prevData,...responses[i].data]);
            }
              setIDSanPham(selectedIDSPs);
          }
        } else {
            setCTSP([])
            setIDSanPham([])
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    };
    getCTSPByIDSP();
  }, [selectedIDSPs]);




  const columnsChiTietSanPham = [
    {
      title: "#",
      dataIndex: "idCTSP",
      key: "idCTSP",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    // {
    //   title: "Ảnh sản phẩm",
    //   dataIndex :""
    // },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSP",
      key:"tenSP",

    },
    {
      title: "Kích thước",
      dataIndex: "tenKT",
      key:"tenKT",
      center: "true",

      sorter: (a, b) => a.tenKT - b.tenKT,
    },
    {
      title: "Màu",
      dataIndex: "tenMS",
      key: "tenMS",
      render: (tenMS) => (
        <>
          {tenMS === "Hồng" ? (
            <Tag
              color="#ffadd2
                    "
              className="rounded-circle"
              style={{ height: 25, width: 25 }}
            ></Tag>
          ) : tenMS === "Xanh" ? (
            <Tag
              color="#52c41a
                    "
              className="rounded-circle"
              style={{ height: 25, width: 25 }}
            ></Tag>
          ) : tenMS === "Xám" ? (
            <Tag
              color="#8c8c8c
                    "
              className="rounded-circle"
              style={{ height: 25, width: 25 }}
            ></Tag>
          ) : tenMS === "Đỏ" ? (
            <Tag
              color="#f5222d
                    "
              className="rounded-circle"
              style={{ height: 25, width: 25 }}
            ></Tag>
          ) : tenMS === "Tím" ? (
            <Tag
              color="#722ed1
                    "
              className="rounded-circle"
              style={{ height: 25, width: 25 }}
            ></Tag>
          ) : tenMS === "Vàng" ? (
            <Tag
              color="#fadb14
                    "
              className="rounded-circle"
              style={{ height: 25, width: 25 }}
            ></Tag>
          ) : tenMS === "Đen" ? (
            <Tag
              color="#000000
                    "
              className="rounded-circle"
              style={{ height: 25, width: 25 }}
            ></Tag>
          ) : (
            <Tag
              color="#ffffff
                    "
              className="rounded-circle"
              style={{ height: 25, width: 25 }}
            ></Tag>
          )}
        </>
      ),
    },
    { title: "Chất liệu", 
    dataIndex: "tenCL" ,
    key: "tenCL",
  
    },
    {
      title: "Độ cao",
      dataIndex: "tenDC",
      key: "tenDC"
    },
    {
      title: "Hãng",
      dataIndex: "tenH",
      key:"tenH"
    },
    {
      title: "Danh mục",
      dataIndex: "tenDM",
      key: "tenDM"
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trangThai) => (
        <>
          {trangThai === "0" ? (
            <Tag
              color="#87d068
                    "
            >
              Đang bán
            </Tag>
          ) : (
            <Tag
              color="#f50
                    "
            >
              Hết hàng
            </Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Tiền Mặt",
          value: "Tiền Mặt",
        },
        {
          text: "Phần Trăm",
          value: "Phần Trăm",
        },
      ],
      onFilter: (value, record) => record.loai.indexOf(value) === 0,
    },
  ];

  const dataSoure1 = ctsp.map((item,index) => ({
    key: item.idCTSP,
    idCTSP: item.idCTSP,
    // checkbox: ++index,
    tenSP: item.tenSP,
    tenKT: item.tenKT,
    tenMS: item.tenMS,
    tenCL: item.tenCL,
    tenDC: item.tenDC,
    tenH: item.tenH,
    tenDM: item.tenDM,
    trangThai: item.trangThai,
  }));

  
  const rowSelection = {
    selectedRowCTSP,      
    onChange: (selectedKeys) => {
        setSelectedCTSP(selectedKeys);
        setSelectedRowCTSP(selectedKeys);
        // onSelectedCTSanPham(selectedKeys);
        console.log('selectedKeys', selectedKeys);
    
  }
  };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columnsChiTietSanPham}
      dataSource={dataSoure1}
      pagination={{ defaultPageSize: 5 }}
    />
  );
};

export default TableChiTietSanPham;
