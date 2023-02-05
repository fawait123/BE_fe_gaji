import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/layout/components/content/breadcrumbs";
import PageTitle from "@/layout/components/content/page-title";
import { Button, Card, Col, Form, Input, Row, Table } from "antd";
import { Delete, Edit } from "react-iconly";
import ModalAttendance from "./modal";
import ModalDelete from "@/view/components/delete-modal";
import httpRequest from "@/utils/axios";
import moment from "moment";

const endpoint = "api/absen";
const endpointKaryawan = "api/karyawan";

export default function Attendance() {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [antLoading, setAntLoading] = useState(false);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [form] = Form.useForm();
  const [meta, setMeta] = useState({
    dir: "desc",
    offset: 0,
    order: "created_at",
    page: 1,
    perPage: 12,
    search: "",
    total: 1,
    totalPage: 1,
  });
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const state = {
    dataEmployee,
  };

  const getData = async (payload) => {
    setAntLoading(true);
    console.log("pagi", meta);
    await httpRequest({
      url: endpoint,
      method: "get",
      params: payload,
    })
      .then((response) => {
        console.log("response", response);
        setTotal(response?.data?.meta?.total);
        setData(response?.data?.results);
      })
      .finally(() => {
        setAntLoading(false);
      });
  };

  const getEmployee = async () => {
    // setLoadingAdd(true)
    await httpRequest({
      url: endpointKaryawan,
      method: "get",
      params: {
        ...meta,
        perPage: 100000,
      },
    })
      .then((response) => {
        setDataEmployee(response?.data?.results);
        // setVisible(true)
      })
      .finally(() => {
        // setLoadingAdd(false)
      });
  };

  useEffect(() => {
    // getEmployee();
    getData(meta);
  }, []);

  const onOk = () => {
    form.validateFields().then(async (res) => {
      setLoading(true);
      await httpRequest({
        url: endpoint,
        method: record ? "put" : "post",
        data: {
          ...res,
          jam_masuk: moment(res.jam_masuk).format("HH:mm:ss"),
          jam_pulang: moment(res.jam_pulang).format("HH:mm:ss"),
          tgl_absen: moment(res.tgl_absen).format("YYYY-MM-DD"),
        },
        params: {
          id: record ? record.id : undefined,
        },
      })
        .then((response) => {
          setVisible(false);
          form.resetFields();
          setRecord(null);
          getData(meta);
        })
        .catch((error) => {
          form.resetFields();
        })
        .finally(() => {
          setLoading(false);
          setLoadingAdd(false);
        });
    });
  };

  const onCancel = () => {
    setVisible(false);
    setRecord(null);
    setLoadingAdd(false);
    form.resetFields();
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    await httpRequest({
      url: endpoint,
      method: "delete",
      params: {
        id: record?.id,
      },
    })
      .then((res) => {
        getData(meta);
        setVisibleDelete(false);
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const fieldColumns = [
    {
      title: "No",
      render: (_, record, index) =>
        meta?.page > 1 ? index + 1 + meta?.perPage : index + 1,
    },
    {
      title: "Tanggal Absen",
      dataIndex: "tgl_absen",
      key: "tgl_absen",
      render: (_record, _) => {
        return <span>{moment(_record).format("DD MMMM yyyy")}</span>;
      },
    },
    {
      title: "Nama Karyawan",
      dataIndex: ["karyawan", "nama"],
      key: "name",
    },
    {
      title: "Jabatan",
      dataIndex: ["karyawan", "jabatan", "nama"],
      key: "name_jabatan",
    },
    {
      title: "Jam Masuk",
      dataIndex: "jam_masuk",
      key: "in",
    },
    {
      title: "Jam Keluar",
      dataIndex: "jam_pulang",
      key: "out",
    },
    {
      title: "Status Kehadiran",
      dataIndex: "status_kehadiran",
      key: "remarks",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
    },
  ];
  const columns = [
    ...fieldColumns,
    {
      title: "Aksi",
      width: 100,
      render: (_, record, index) => {
        return (
          <>
            <Edit
              set="outlined"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setVisible(true);
                setRecord(record);
                form.setFieldsValue({
                  ...record,
                  karyawan_id: parseInt(record.karyawan_id),
                  jam_masuk: moment("2022-10-21T" + record.jam_masuk),
                  jam_pulang: moment("2022-10-21T" + record.jam_pulang),
                  tgl_absen: moment(record.tgl_absen),
                });
              }}
            />
            <Delete
              set="outlined"
              style={{ marginLeft: 5, cursor: "pointer" }}
              onClick={() => {
                setRecord(record);
                setVisibleDelete(true);
              }}
              primaryColor="#f50"
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <ModalAttendance
        visible={visible}
        record={record}
        form={form}
        loading={loading}
        onCancel={onCancel}
        state={state}
        onOk={onOk}
      />
      <ModalDelete
        visible={visibleDelete}
        loading={loadingDelete}
        onCancel={() => {
          setVisibleDelete(false);
          setRecord(null);
        }}
        onOk={handleDelete}
      />
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <Breadcrumbs
              breadCrumbParent="Pages"
              breadCrumbActive="Data Absensi"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Data Absensi" />
        <Card style={{ marginTop: 20, width: "100%", padding: 10 }}>
          <Row justify="space-between" style={{ marginBottom: 20 }}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  setRecord(null);
                  setVisible(true);
                }}
                loading={loadingAdd}
              >
                Tambah Absensi
              </Button>
            </Col>
            <Col>
              <Input
                onKeyUp={(e) => {
                  setMeta({
                    ...meta,
                    search: e.target.value,
                  });
                  let data = {
                    ...meta,
                  };
                  getData(data);
                }}
                placeholder="Cari Nama Karyawan"
              />
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            onChange={(pagination, filters, sorter) => {
              console.log("pagination", pagination);
              setMeta({
                ...meta,
                page: pagination.current,
                perPage: pagination.pageSize,
              });
              const data = {
                ...meta,
                page: pagination.current,
                perPage: pagination.pageSize,
              };
              getData(data);
            }}
            pagination={{
              current: meta.page,
              pageSize: meta.perPage,
              total,
            }}
            loading={antLoading}
            scroll={{
              x: 1000,
            }}
          />
        </Card>
      </Row>
    </>
  );
}
