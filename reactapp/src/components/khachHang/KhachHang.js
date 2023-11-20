import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

export default function KhachHang() {
  const [khachHang, setKhachHang] = useState([]);

  useEffect(() => {
    loadKhachHang();
  }, []);

  const loadKhachHang = async () => {

    const result = await axios.get('http://localhost:8080/khach-hang', {
        validateStatus: () => {
            return true;
        },
    });
    if (result.status === 302) {
        setKhachHang(result.data);
    }
    console.log(result.data);

};

  const columns = [
    {
      title: 'STT',
      dataIndex: 'idKH',
      key: 'idKH',
      render: (id,record,index) => {++index; return index},
      showSortTooltip:false,
    },
    {
      title: 'Mã Khách Hàng',
      dataIndex: 'maKH',
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: 'Tên Khách Hàng',
      dataIndex: 'tenKH',
      sorter: (a, b) => a.ten - b.ten,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: 'SĐT',
      dataIndex: 'sdt',
      sorter: (a, b) => a.SDT - b.SDT,
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

  return (
    <div className="container">
      <div className="container-fluid">
        <h4 className="text-center pt-1">Danh sách Khách Hàng</h4>
        <div className="text-center">
          <a className="btn btn-primary" href="#" role="button">
            Thêm Khách Hàng
          </a>
        </div>
        <div className="container-fluid mt-4">
          <div>
            <Table
                {...tableProps}
                pagination={{
                position: [top, bottom],
                }}
                columns={tableColumns}
                dataSource={hasData ? khachHang : []}
                scroll={scroll}
      />

          </div>
        </div>
      </div>
    </div>
  );
}