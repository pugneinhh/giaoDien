import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';



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
<div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Loại voucher:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center',insetInlineStart:'50%' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.loaiVoucher==='true'?'Giới hạn':'Không giới hạn'}</h5>
    </div>
</div>
{dataUpdate.loaiVoucher==='true'?
<div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Số lượng:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.soLuong}</h5>
    </div>
</div>
:<></>
}
<div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Mức độ:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.mucDo}</h5>
    </div>
</div>

<div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Giảm tối đa:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.giamToiDa}</h5>
    </div>
</div>

<div style={{ display: 'flex', flexDirection: 'row'}}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Điều kiện giảm:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.dieuKien}</h5>
    </div>
</div>
<div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Ngày bắt đầu:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.ngayBatDau}</h5>
    </div>
</div>

<div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>Ngày kết thúc:</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5 style={{ margin: 0 }}>{dataUpdate.ngayKetThuc}</h5>
    </div>
</div>


    </Modal>
    )
}
export default ModalDetail;