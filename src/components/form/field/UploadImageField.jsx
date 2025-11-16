import React, { useEffect, useState } from 'react'
import { Form, Image, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { REQUEST_HEADER } from '../../../config/constants'
import { getAccessToken } from '../../../utils/helpers'
import UploadPlaceholder from './UploadPlaceholder'

const UploadImageField = ({
  width = 150,
  height = 150,
  accept = '.png, .jpeg, .jpg',
  isCrop = true,
  onFinish,
  initObj,
  ...props
}) => {
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    if (initObj) {
      setFileList([
        {
          uid: initObj.id,
          name: initObj.name,
          status: 'done',
          url: `${import.meta.env.VITE_API_URL}${initObj.upload_path}`,
        },
      ])
    } else {
      setFileList([])
    }
  }, [initObj])

  const onChange = (info) => {
    if (info.file.status === 'done' && onFinish) {
      const response = info.file.response
      onFinish(response.data)
    }

    setFileList(info.fileList)
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const uploadProps = {
    name: 'file',
    action: `${import.meta.env.VITE_API_URL}/api/${props.action ?? 'images'}`,
    headers: {
      ...REQUEST_HEADER,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    listType: 'picture-card',
    fileList,
    maxCount: 1,
    multiple: false,
    onChange,
    accept,
    onPreview: handlePreview,
  }

  return (
    <>
      <Form.Item
        className={`upload-image upload-${width}-${height}`}
        name={props.attribute}
        label={props.label}
        rules={props.rules}
      >
        {isCrop ? (
          <ImgCrop aspect={width / height}>
            <Upload {... uploadProps}>
              {fileList.length < 1 && <UploadPlaceholder width={width} />}
            </Upload>
          </ImgCrop>
        ) : (
          <Upload {... uploadProps}>
            {fileList.length < 1 && <UploadPlaceholder width={width} />}
          </Upload>
        )}
      </Form.Item>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  )
}

export default UploadImageField
