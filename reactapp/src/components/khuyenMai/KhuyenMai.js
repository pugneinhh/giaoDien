import React, { useState, useEffect, Text } from "react";
import axios from "axios";
import { Space, Table, Tag, Breadcrumb } from "antd";
import "./KhuyenMai.scss";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

export default function KhuyenMai() {
  const [khuyenMai, setKhuyenMais] = useState([]);
  useEffect(() => {
    loadKhuyenMai();
  }, []);
  const loadKhuyenMai = async () => {
    const result = await axios.get("http://localhost:8080/khuyen-mai", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setKhuyenMais(result.data);
    }
  };
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      center: "true",

      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],

      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Loại",
      dataIndex: "loai",

      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Khuyến mại tối đa",
      dataIndex: ["loai", "khuyen_mai_toi_da"],
      key: ["loai", "khuyen_mai_toi_da"],
      render: (loai, khuyen_mai_toi_da) => (
        <>
          {loai === "Tiền Mặt"
            ? (console.log("Loại" + loai),
              new Intl.NumberFormat("vi-Vi", {
                style: "currency",
                currency: "VND",
              }).format(khuyen_mai_toi_da))
            : (console.log("Loại" + loai), khuyen_mai_toi_da + "%")}
        </>
      ),
      // render : (loai,khuyen_mai_toi_da) => (
      //   <>
      //   {
      //     (loai === ("Tiền mặt")) ? (
      //       khuyen_mai_toi_da + "VND"
      //     ) : (
      //       <NumericFormat
      //       value={khuyen_mai_toi_da}
      //       displayType={'text'}
      //       thousandSeparator={true}
      //       prefix={'$'}
      //       renderText={formattedValue => <Text>{formattedValue}</Text>} // <--- Don't forget this!
      //     />

      //     )
      //   }
      //   </>
      // ),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      render: (ngay_bat_dau) => (
        <>{moment(ngay_bat_dau).format("DD/MM/YYYY, hh:mm:ss")}</>
      ),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Ngày kết thúc ",
      dataIndex: "ngay_ket_thuc",
      render: (ngay_ket_thuc) => (
        <>{moment(ngay_ket_thuc).format("DD/MM/YYYY, hh:mm:ss")}</>
      ),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (trang_thai) => (
        <>
          {trang_thai == 0 ? (
            <Tag
              color="#f50
                "
            >
              Sắp bắt đầu
            </Tag>
          ) : trang_thai == 1 ? (
            <Tag
              color="#87d068
                "
            >
              Đang diễn ra
            </Tag>
          ) : (
            <Tag color="#ff0000">Đã hết hạn</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",

      render: () => (
        <Space size="middle">
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <div>
        {/* <Breadcrumb
          items={[
            {
              href: "",
              title: "Trang chủ",
            },
            {
              href: "",
              title: (
                <>
                  <KhuyenMai />
                  <span>Khuyến Mại</span>
                </>
              ),
            },
          ]}
        /> */}
        <div className="container-fluid">
          <h4 className="text-center pt-1">Danh sách khuyến mại</h4>

          <div className="container-fluid mt-4">
            <div>
              <Table dataSource={khuyenMai} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
