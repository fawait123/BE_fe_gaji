import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Upload,
} from "antd";
import React from "react";
import { Delete, Upload as IconUpload } from "react-iconly";

export default function ModalEmployee({
  form,
  onCancel,
  onOk,
  loading,
  record,
  state,
  visible,
}) {
  console.log(record);
  return (
    <>
      <Modal
        title={`${record ? "Edit" : "Tambah"} Data Karyawan`}
        visible={visible}
        style={{
          marginTop: "-70px",
        }}
        confirmLoading={loading}
        onCancel={onCancel}
        onOk={onOk}
      >
        <div
          style={{
            height: "calc(100vh - 300px)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[20, 20]}>
              {/* <Col span={12}>
                <Form.Item
                  name="id_karyawan"
                  label="ID Karyawan"
                  rules={[
                    {
                      required: true,
                      message: 'ID Karyawan tidak boleh kosong',
                    },
                  ]}
                >
                  <Input placeholder="ID Karyawan" />
                </Form.Item>
              </Col> */}
              <Col span={23}>
                <Form.Item
                  name="nama"
                  label="Nama Karyawan"
                  rules={[
                    {
                      required: true,
                      message: "Nama Karyawan harus diisi",
                    },
                  ]}
                >
                  <Input placeholder="H.Senen Haryanto, SE" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jabatan_id"
                  label="Jabatan"
                  rules={[
                    {
                      required: true,
                      message: "Jabatan harus diisi",
                    },
                  ]}
                >
                  <Select placeholder="Kaur Keuangan">
                    {state.dataJabatan.map((el) => {
                      return (
                        <Select.Option key={el.id} value={el.id}>
                          {el.nama}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="no_sk"
                  label="No SK"
                  rules={[
                    {
                      required: true,
                      message: "NO SK harus diisi",
                    },
                  ]}
                >
                  <Input placeholder="6/Kep.KDH/A/2021" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="no_rek"
                  label="No Rekening"
                  rules={[
                    {
                      required: true,
                      message: "No Rekening harus diisi",
                    },
                  ]}
                >
                  <Input placeholder="001.2221.XXX" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="nama_bank"
                  label="Nama Bank"
                  rules={[
                    {
                      required: true,
                      message: "Nama Bank harus diisi",
                    },
                  ]}
                >
                  <Input placeholder="BPD-SLEMAN" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jenis_kelamin"
                  label="Jenis Kelamin"
                  rules={[
                    {
                      required: true,
                      message: "Jenis Kelamin harus diisi",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="laki-laki">Laki-laki</Radio>
                    <Radio value="perempuan">Perempuan</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="no_hp"
                  label="No HP"
                  required={true}
                  rules={[
                    {
                      validator: (rule, value, cb) => {
                        let values = value || null;
                        if (!values) {
                          return cb("No HP harus diisi");
                        }
                        if (!Number(values)) {
                          return cb("No HP harus berupa angka");
                        }
                        return cb();
                      },
                    },
                  ]}
                >
                  <Input placeholder="08222398XXXX" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tgl_masuk_kerja"
                  label="Tgl Masuk Kerja"
                  rules={[
                    {
                      required: true,
                      message: "Tgl Masuk Kerja harus diisi",
                    },
                  ]}
                >
                  <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="tgl_lahir"
                  label="Tanggal Lahir"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal Lahir harus diisi",
                    },
                  ]}
                >
                  <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  name="jumlah_istri"
                  label="Jumlah Istri"
                  required={true}
                  rules={[
                    {
                      validator: (rule, value, cb) => {
                        let values = value || null
                        if (!values) {
                          return cb('Jumlah Istri tidak boleh kosong')
                        }
                        if (!Number(values)) {
                          return cb('Jumlah Istri harus angka')
                        }
                        return cb()
                      },
                    },
                  ]}
                >
                  <Input placeholder="Jumlah Istri" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jumlah_anak"
                  label="Jumlah Anak"
                  required={true}
                  rules={[
                    {
                      validator: (rule, value, cb) => {
                        let values = value || null
                        if (!values) {
                          return cb('Jumlah Anak tidak boleh kosong')
                        }
                        if (!Number(values)) {
                          return cb('Jumlah Anak harus angka')
                        }
                        return cb()
                      },
                    },
                  ]}
                >
                  <Input placeholder="Jumlah Anak" />
                </Form.Item>
              </Col> */}
              <Col span={23}>
                <Form.Item
                  name="alamat"
                  label="Alamat Lengkap"
                  rules={[
                    {
                      required: true,
                      message: "Alamat Lengkap harus diisi",
                    },
                  ]}
                >
                  <Input.TextArea rows={3} placeholder="Jl.Magelang No.Km.4,5, Rogoyudan, Sinduadi, Kec. Mlati Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284" />
                </Form.Item>
              </Col>
              <Col span={23}>
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Upload.Dragger
                    fileList={state.fileList}
                    showUploadList={false}
                    onChange={(info) => {
                      let fileReader = new FileReader();
                      fileReader.readAsDataURL(info.file.originFileObj);
                      fileReader.onloadend = () => {
                        state.setBaseUrl({
                          FileList: info.fileList,
                          status: true,
                          url: fileReader.result,
                        });
                      };
                    }}
                  >
                    {state.baseUrl.status ? (
                      <>
                        <Image src={state.baseUrl.url} />
                      </>
                    ) : (
                      <>
                        <p className="ant-upload-drag-icon">
                          <IconUpload style={{ width: 50 }} set="curved" />
                        </p>
                        <p className="ant-upload-text">
                          klik atau seret foto pada bidang ini 
                        </p>
                        <p className="ant-upload-hint">
                          uploud foto maksimal 10MB/file (png,jpg&jpeg)
                        </p>
                      </>
                    )}
                  </Upload.Dragger>
                  {state.baseUrl.status ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        cursor: "pointer",
                        right: 10,
                      }}
                      onClick={() => {
                        state.setBaseUrl({
                          FileList: [],
                          status: false,
                          url: "",
                        });
                      }}
                    >
                      <Delete set="curved" primaryColor="#f50" />
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
