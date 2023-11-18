import React, { useState, useEffect, Text, View, Component , } from "react";
import axios from "axios";
import {
  Table,
  Tag,
} from "antd";
import "./KhuyenMai.scss";

const TableSanPham = ({onSelectedSanPham}) => {
    const [sanPham, setSanPhams] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        const loadSanPham = async () => {
            const result = await axios.get("http://localhost:8080/san-pham", {
              validateStatus: () => {
                return true;
              },
            });
            if (result.status === 302) {
              setSanPhams(result.data);
            }
          };
          loadSanPham();
      }, []);
     
      const handleCheckboxChange = (selectedKeys , selectedRowKeys) => {
      if (selectedRowKeys !== null){
        setSelectedRowKeys(selectedKeys);
        onSelectedSanPham(selectedKeys);
        console.log("selectedRowkeys",selectedRowKeys);
        console.log('selectedKeys', selectedKeys);
        console.log("Sản phẩm",sanPham);

      };
    }

      const columnsSanPham = [

        {
          title: "#",
          dataIndex: "idSP",
          key: "idSP",
          render: (id, record, index) => {
            ++index;
            return index;
          },
          showSorterTooltip: false,
        },
        {
          title: "Mã",
          dataIndex: "ma",
          key: "ma",
          sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
        },
        {
          title: "Tên",
          dataIndex: "ten",
          key:"ten",
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
        },
      ];

      const handleCancel = (selectedKey) => {
        console.log('Checkbox bị bỏ chọn:', selectedKey);
        const response =  axios.delete(`http://localhost:8080/san-pham/${selectedKey}`)
        .then (response => {
          console.log("Xóa ",selectedKey);
          console.log("Còn lại",selectedRowKeys.filter(row => row !== selectedKey));
          setSelectedRowKeys(selectedRowKeys.filter(row => row !== selectedKey))
          onSelectedSanPham(selectedRowKeys.filter(row => row !== selectedKey));

        })
        .catch(error => console.error('Error deleting product:', error));



      };

      const rowSelection = {
        selectedRowKeys,      
        onChange: handleCheckboxChange,
        onCancel: () => handleCancel,
      };



      const dataSource = sanPham.map((item, index) => ({
        key: item.idSP,
        checkbox: ++index,
        idSP: item.idSP,
        ma: item.ma,
        ten: item.ten,
        trangThai: item.trangThai,      
      }));






     
      return (
        <Table
        rowSelection={rowSelection}
        columns={columnsSanPham}
        dataSource={dataSource}  
        pagination={{ defaultPageSize: 3 }}
       /> 


      );
};

export default TableSanPham;


