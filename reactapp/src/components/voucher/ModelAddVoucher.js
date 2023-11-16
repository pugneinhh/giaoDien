import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';


const ModelAddVoucher=(props)=>{
  const { openUpdate,setOpenUpdate, myVoucher, resetMyVoucher } = props;
  const [form2]=Form.useForm();
  const [selectedValue, setSelectedValue] = useState('Tiền mặt');
  const [dataUpdate, setDataUpdate] = useState({});
    
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  

  useEffect(() => {
    form2.setFieldsValue({
      id:myVoucher.id,
ma:myVoucher.ma,
phuongThuc:myVoucher.phuongThuc,
mucDo:myVoucher.mucDo,
giamToiDa:myVoucher.giamToiDa,
dieuKien:myVoucher.dieuKien,
ngayKetThuc: moment(myVoucher.ngayKetThuc, 'YYYY-MM-DD'),
ngayBatDau: moment(myVoucher.ngayBatDau, 'YYYY-MM-DD')
    });
    setDataUpdate(myVoucher);

  },[myVoucher,form2]);
  
  const handleClose = () => {
    resetMyVoucher();
    form2.resetFields();
    setOpenUpdate(false);
    setDataUpdate({});
    console.log("đóng")
};

const handleUpdateVoucher=(value)=>{
      
  axios.put(`http://localhost:8080/voucher/update/${myVoucher.id}`,value)
  .then(response => {
            
            props.loadVoucher();
            form2.resetFields();
            handleClose();
            
  })
  .catch(error => console.error('Error upfate item:', error));
  
}

 ///validate ngày 
 const validateDateKT = (_, value) => {
  const { getFieldValue } = form2;
  const newDate = new Date();
  const startDate = getFieldValue('ngayBatDau');
  // if(startDate && value && value.isAfter(moment)){
  //   return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
  // }
  if (startDate && value &&startDate.isAfter(value)) {
    return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
  }
  return Promise.resolve();
};
const [checkNgay,setCheckNgay]=useState(false);
const validateDateBD = (_, value) => {
  const newDate = new Date();
  // if(startDate && value && value.isAfter(moment)){
  //   return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
  // }

  if ( value && value<newDate) {
    setCheckNgay(true);
    return Promise.reject('Ngày bắt phải sau ngày hiện tại');
  }
  return Promise.resolve();
};

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
// initialValues={{
// // size: componentSize,
// id:dataUpdate.id,
// ma:dataUpdate.ma,
// phuongThuc:dataUpdate.phuongThuc,
// mucDo:dataUpdate.mucDo,
// giamToiDa:dataUpdate.giamToiDa,
// dieuKien:dataUpdate.dieuKien,
// ngayKetThuc: moment(dataUpdate.ngayKetThuc, 'YYYY-MM-DD'),
// ngayBatDau: moment(dataUpdate.ngayBatDau, 'YYYY-MM-DD')
// }}
// initialValues={setFormValue}
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
<Form.Item label="Phương thức" name='phuongThuc' hasFeedback rules={[
{
required: true,
message: 'Vui lòng chọn phương thức!',
},
]} >
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
<Form.Item label="Giảm tối đa" name='giamToiDa' hasFeedback rules={[
{
required: true,
message: 'Vui lòng nhập giá trị giảm tối đa!',
},
]} >
<InputNumber
defaultValue={0}
formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
style={{width:'100%'}}

/>
</Form.Item>
<Form.Item label="Điều kiện" name='dieuKien' hasFeedback rules={[
{
required: true,
message: 'Vui lòng nhập điều kiện giảm!',
},
]} >
<InputNumber
defaultValue={0}
formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
style={{width:'100%'}}

/>

</Form.Item>
</div>
<div className='col-md-4'>

<Form.Item label="Ngày bắt đầu" name='ngayBatDau' hasFeedback rules={[
{
required: true,
message: 'Vui lòng chọn ngày bắt đầu!',
},
]}>
  
<DatePicker style={{width:'100%'}}  placeholder='Ngày bắt đầu'  format={"YYYY-MM-DD"}/>

</Form.Item>
<Form.Item label="Ngày kết thúc"  name='ngayKetThuc' hasFeedback rules={[
{
required: true,
message: 'Vui lòng chọn ngày kết thúc!',
},
{validator:validateDateKT}
]} >
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
}
export default ModelAddVoucher;