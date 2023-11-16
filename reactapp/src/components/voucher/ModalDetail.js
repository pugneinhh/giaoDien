import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { da } from "date-fns/locale";


const ModalDetail=(props)=>{
  const { openDetail,setOpenDetail, myVoucher, resetMyVoucher } = props;

  const [dataUpdate, setDataUpdate] = useState({});
  
  useEffect(() => {

    setDataUpdate(myVoucher);

  },[myVoucher]);
  
  const handleClose = () => {
    resetMyVoucher();
    setOpenDetail(false);
    setDataUpdate({});
    console.log("đóng deail")
};




    return(
      <Modal
      title={<h5>Thông tin phiếu giảm giá</h5>}
      centered
      open={openDetail}
      onOk={handleClose}
      onCancel={handleClose}
      width={500}
    >   
   <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Mã phiếu giảm giá:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center',insetInlineStart:'50%' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.ma}</h5>
    </div>
</div>

<div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Phương thức:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center',insetInlineStart:'50%' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.phuongThuc}</h5>
    </div>
</div>

<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Mức độ:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.mucDo}</h5>
    </div>
</div>

<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Giảm tối đa:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.giamToiDa}</h5>
    </div>
</div>

<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Điều kiện giảm:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.dieuKien}</h5>
    </div>
</div>

    </Modal>
    )
}
export default ModalDetail;