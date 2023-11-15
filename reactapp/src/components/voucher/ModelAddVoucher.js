import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


const ModelAddVoucher=()=>{
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Tiền mặt');
    const handleChange = (value) => {
        console.log(`Selected value: ${value}`);
        setSelectedValue(value);
      };
    

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };
    const[voucher,setVouchers]=useState([])
    
        useEffect(()=>{
            loadVoucher();
        },[]);
        
        const loadVoucher=async()=>{
       
            await axios.get('http://localhost:8080/voucher')
            .then(response => {
              // Update the list of items
              setVouchers(response.data);
          })
          .catch(error => console.error('Error adding item:', error));
        
          
        };
    const [form] = Form.useForm();
    const handleSubmit = (value) => {
        
       
        // Send a POST request to the backend
        axios.post('http://localhost:8080/voucher/add',value)
        .then(response => {
            // Update the list of items
            console.log(response.data);
            loadVoucher();
            form.resetFields();
            
        })
        .catch(error => console.error('Error adding item:', error));
      }




    return(
        <Modal
        title="Thêm voucher"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {/* form add voucher */}
        <Form className="row col-md-12 mt-3"

labelCol={{
span: 10,
}}
wrapperCol={{
span: 20,
}}
layout="horizontal"
initialValues={{
size: componentSize,
}}
onValuesChange={onFormLayoutChange}
size={componentSize}
style={{
maxWidth: 1000,
}}
onFinish={handleSubmit}
form={form}

>
<div className="col-md-4">
<Form.Item label="Mã Voucher" name='ma'  >
<Input  placeholder='Mã giảm giá'  required/>
</Form.Item>
<Form.Item label="Phương thức" name='phuongThuc'>
<Select defaultValue={selectedValue}  onChange={handleChange}>
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
<DatePicker style={{width:'100%'}}  placeholder='Ngày bắt đầu'  />
</Form.Item>
<Form.Item label="Ngày kết thúc"  name='ngayKetThuc'>
<DatePicker style={{width:'100%'}} placeholder='Ngày kết thúc' />
</Form.Item>
</div>
<div className="col-md-4"></div>
<div className="col-md-1"></div>
<div className="col-md-4">
<Form.Item className='text-center'>
<Button type="primary" htmlType='submit'
 onClick={() => {
   Modal.confirm({
     title: 'Thông báo',
     content: 'Bạn có chắc chắn muốn thêm không?',
     footer: (_, { OkBtn, CancelBtn }) => (
       <>
         <CancelBtn/>
         <OkBtn/>
       </>
     ),
   });
 }}>Thêm</Button>

</Form.Item>
</div>
</Form>
      </Modal>
    )
}