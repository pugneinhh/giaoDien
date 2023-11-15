import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';


const ModelAddVoucher=(props)=>{
  const { openUpdate, myVoucher, resetMyVoucher,loadVoucher } = props;
  const [form2]=Form.useForm();
  const [selectedValue, setSelectedValue] = useState('Tiền mặt');
  
    
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleClose = () => {
    form2.resetFields();
    resetMyVoucher();
};
const handleUpdateVoucher=(value)=>{
      
  axios.put(`http://localhost:8080/voucher/update/${myVoucher.id}`,value)
  .then(response => {
            
            loadVoucher();
            form2.resetFields();
            handleClose();
            
  })
  .catch(error => console.error('Error upfate item:', error));
  
}



    return(
      <Modal
      title="Cập nhật voucher"
      centered
      open={openUpdate}
      onCancel={handleClose}
      width={1000}
    >
      
      <Form className="row col-md-12 mt-3"

labelCol={{
span: 10,
}}
wrapperCol={{
span: 20,
}}
layout="horizontal"
initialValues={{
// size: componentSize,
id:myVoucher.id,
ma:myVoucher.ma,
phuongThuc:myVoucher.phuongThuc,
mucDo:myVoucher.mucDo,
giamToiDa:myVoucher.giamToiDa,
dieuKien:myVoucher.dieuKien,
ngayKetThuc: moment(myVoucher.ngayKetThuc, 'YYYY-MM-DD'),
ngayBatDau: moment(myVoucher.ngayBatDau, 'YYYY-MM-DD')
}}
onValuesChange={onFormLayoutChange}
size={componentSize}
style={{
maxWidth: 1000,
}}
onFinish={handleUpdateVoucher}
form={form2}

>
<div className="col-md-4">

<Form.Item label="Mã Voucher" name='ma'  hasFeedback
rules={[
{
required: true,
message: 'Vui lòng không để trống mã!',
},
]} >
<Input  placeholder='Mã giảm giá'/>
</Form.Item>
<Form.Item label="Phương thức" name='phuongThuc'>
<Select >
<Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
<Select.Option value="Phần trăm">Phần trăm</Select.Option>
</Select>
</Form.Item>
</div>
<div className='col-md-4'>
<Form.Item label="Mức độ" name='mucDo'>
{selectedValue==='Tiền mặt'?
<InputNumber
defaultValue={0}
formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
style={{width:'100%'}}

/>
:
<InputNumber
defaultValue={0}
min={0}
max={100}
formatter={(value) => `${value}%`}
parser={(value) => value.replace('%', '')}
style={{width:'100%'}}

/>
}
</Form.Item>
<Form.Item label="Giảm tối đa" name='giamToiDa'>
<InputNumber
defaultValue={0}
formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
style={{width:'100%'}}

/>
</Form.Item>
<Form.Item label="Điều kiện" name='dieuKien'>
<InputNumber
defaultValue={0}
formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
style={{width:'100%'}}

/>

</Form.Item>
</div>
<div className='col-md-4'>

<Form.Item label="Ngày bắt đầu" name='ngayBatDau'>
<DatePicker style={{width:'100%'}}  placeholder='Ngày bắt đầu'  format={"YYYY-MM-DD"}/>
</Form.Item>
<Form.Item label="Ngày kết thúc"  name='ngayKetThuc'>
<DatePicker style={{width:'100%'}} placeholder='Ngày kết thúc' format={"YYYY-MM-DD"}/>
</Form.Item>
</div>
<div className="col-md-4"></div>
<div className="col-md-1"></div>
<div className="col-md-4">
<Form.Item className='text-center'>


<Button type="primary"  onClick={() => {
Modal.confirm({
title: 'Thông báo',
content: 'Bạn có chắc chắn muốn thêm không?',
onOk: () => {form2.submit();},
footer: (_, { OkBtn, CancelBtn }) => (
 <>
   <CancelBtn/>
   <OkBtn />
 </>
),
});
}}>Cập nhật</Button>

</Form.Item>
</div>
</Form>
    </Modal>
    )
};
export default ModelAddVoucher;