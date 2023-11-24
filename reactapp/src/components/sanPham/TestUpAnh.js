import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Form,
  Upload,
  Button,
  Input
} from 'antd';
import { upCloud } from './upload';
import { Image } from 'cloudinary-react';

function UpAnh() {

  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);

  const upAnh = async (e) => {
    e.preventDefault()
    try {
      let arr = [];
      for (let i = 0; i < images.length; i++) {
        const data = await upCloud(images[i])
        arr.push(data)
      }
      setLinks(arr)
      console.log(arr)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={upAnh}>
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)} />
        <button type='submit' className='btn btn-success'>Up Cloud</button>
      </form>
      {
      links && links.length > 0 && links.map(link => {
        return (
          <div key={link?.publicId}>
            <p>URL : 1 {link?.url}</p>
            <Image
              cloudName="dtetgawxc"
              publicId={link?.url}
              width="200"
              crop="scale"
            />
          </div>
        )
      })}
    </div>

  );
}
export default UpAnh;