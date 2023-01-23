import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/layout/components/content/breadcrumbs";
import httpRequest from "@/utils/axios";
import PageTitle from "@/layout/components/content/page-title";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
} from "antd";
import { Link, useHistory } from "react-router-dom";

const endpointKomponen = "api/komponen";
const endpointJabatan = "api/jabatan";
const endpointGaji = "api/kelola-gaji";

export default function SetupComponent() {
  const { push } = useHistory();
  const [form] = Form.useForm();
  const [showComponent, setShowComponent] = useState(false);
  const [antLoading, setAntLoading] = useState(false);
  const [changeValue, setChangeValue] = useState([]);
  const [dataJabatan, setDataJabatan] = useState([]);
  const [dataForm, setDataForm] = useState(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [dataFilter, setDataFilter] = useState(null);
  const [loadingView, setLoadingView] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [jabatan, setJabatan] = useState(0);

  const fieldColumns = [
    {
      title: "Name",
      width: 300,
      dataIndex: "nama",
      key: "name",
    },
  ];

  const getDataKomponen = async (valueComponent) => {
    setAntLoading(true);
    await httpRequest({
      url: endpointKomponen,
      method: "get",
    })
      .then((res) => {
        let arr = res?.data?.results.map((el) => {
          return { ...el, nominal: null };
        });
        let data = arr.map((el) => {
          if (valueComponent.find((els) => els.id === el.id)) {
            return {
              ...valueComponent.find((els) => els.id === el.id),
              id_table: valueComponent.find((els) => els.id === el.id).id_table,
            };
          } else {
            return { ...el, id_table: null };
          }
        });
        setChangeValue(data);
      })
      .finally(() => {
        setAntLoading(false);
      });
  };
  const getDataPosition = async () => {
    // setAntLoading(true)
    await httpRequest({
      url: endpointJabatan,
      method: "get",
      params: {
        perPage: 1000000,
      },
    })
      .then((res) => {
        setDataJabatan(res?.data?.results);
      })
      .finally(() => {
        // setAntLoading(false)
      });
  };

  const getData = async (id) => {
    setLoadingView(true);
    await httpRequest({
      url: endpointJabatan,
      method: "get",
      params: {
        filterID: id,
      },
    })
      .then(async (response) => {
        let valueComponent = response?.data?.results.map((el) => {
          let allowance = el.tunjangans.map((els) => {
            return {
              ...els.komponen,
              nominal: els.jumlah,
              id_table: el.id,
            };
          });
          let deduction = el.potongans.map((els) => {
            return {
              ...els.komponen,
              nominal: els.jumlah,
              id_table: el.id,
            };
          });
          return [...allowance, ...deduction];
        });
        await getDataKomponen(
          valueComponent.length > 0 ? valueComponent[0] : {}
        );
        setDataFilter(response?.data?.results);
      })
      .finally(() => {
        setLoadingView(false);
      });
  };

  useEffect(() => {
    // getDataKomponen()
    getDataPosition();
  }, []);

  const columns = [
    ...fieldColumns,
    {
      title: "Nominal",
      dataIndex: "nominal",
      key: "nominal",
      render: (_, record, index) => {
        return (
          <>
            <Input
              style={{ width: "100%" }}
              status={Number(record.nominal) ? null : "error"}
              value={record.nominal}
              disabled={
                record?.nama?.toLowerCase().includes("kinerja") ||
                record?.nama?.toLowerCase().includes("pph 21 tunj jabatan") ||
                record?.nama?.toLowerCase().includes("tunj jabatan") ||
                record?.nama?.toLowerCase().includes("anak")
                  ? true
                  : false
              }
              placeholder="Nominal"
              onChange={(e) => {
                let arr = [...changeValue];
                let indexData = changeValue.findIndex(
                  (i) => i.id === record.id
                );
                arr[indexData].nominal = e.target.value;
                // perhitungan otomatis gaji tunjangan kinerja dan pph 21 kinerja
                if (arr[indexData].nama.toLowerCase().includes("pokok")) {
                  let findIndexKinerja = changeValue.findIndex((el) => {
                    return el?.nama?.toLowerCase().includes("kinerja");
                  });
                  let findIndexPphKinerja = changeValue.findIndex((el) => {
                    return el?.nama
                      ?.toLowerCase()
                      .includes("pph 21 tunj kinerja");
                  });
                  arr[findIndexKinerja].nominal =
                    (parseInt(e.target.value) * 30) / 100;
                  let total_kinerja = (parseInt(e.target.value) * 30) / 100;
                  arr[findIndexPphKinerja].nominal = (total_kinerja * 1) / 100;
                  // cari input tunjangan jabatan
                  let findIndexJabatan = changeValue.findIndex((el) => {
                    return el?.nama?.toLowerCase().includes("tunj jabatan");
                  });

                  arr[findIndexJabatan].nominal =
                    (parseInt(e.target.value) * 21) / 100;

                  let findIndexPphJabatan = changeValue.findIndex((el) => {
                    return el?.nama
                      ?.toLowerCase()
                      .includes("pph 21 tunj jabatan");
                  });
                  let total_jabatan = (parseInt(e.target.value) * 21) / 100;
                  arr[findIndexPphJabatan].nominal =
                    (parseInt(total_jabatan) * 4) / 100;

                  let findIndexAnak = changeValue.findIndex((el) => {
                    return el?.nama?.toLowerCase().includes("anak");
                  });
                  arr[findIndexAnak].nominal =
                    (parseInt(e.target.value) * 2) / 100;
                }
                // perhitungan otomatis tunjangan pph 21 jabatan
                setChangeValue(arr);
              }}
            />
          </>
        );
      },
    },
  ];

  const handleView = () => {
    form.validateFields().then((res) => {
      setShowComponent(true);
      getData(res.position);
      setDataForm({
        jabatan_id: res.position,
      });
    });
  };

  const handleSubmit = async () => {
    setLoadingButton(true);
    let payload = {
      ...dataForm,
      jabatan_id: jabatan,
      penambahan: changeValue
        .filter((el) => el.tipe === "Penambahan")
        .map((el) => {
          return {
            id: el.id_table,
            komponen_id: el.id,
            jumlah: parseInt(el.nominal),
          };
        }),
      pengurangan: changeValue
        .filter((el) => el.tipe === "Pengurangan")
        .map((el) => {
          return {
            id: el.id_table,
            komponen_id: el.id,
            jumlah: parseInt(el.nominal),
          };
        }),
    };
    setLoadingAdd(true);
    await httpRequest({
      url: endpointGaji,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    })
      .then((response) => {
        push("/pages/position");
      })
      .finally(() => {
        setLoadingButton(false);
        setLoadingAdd(false);
      });
  };

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <Breadcrumbs
              breadCrumbParent="Pages"
              breadCrumbActive="Kelola Gaji"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Kelola Gaji" />
        <Card
          style={{
            width: "100%",
          }}
        >
          <div style={{ marginTop: 20, width: "100%", padding: 10 }}>
            <Form form={form} layout="horizontal">
              <Row gutter={[20, 20]}>
                <Col span={12}>
                  <Form.Item
                    name="position"
                    label="Jabatan"
                    rules={[
                      {
                        required: true,
                        message: "Jabatan tidak boleh kosong",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Pilih Jabatan"
                      onChange={(value) => setJabatan(value)}
                    >
                      {dataJabatan.map((el) => {
                        return (
                          <Select.Option value={el.id}>{el.nama}</Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Row justify="start">
                    <Col>
                      <Button
                        type="primary"
                        loading={loadingView}
                        onClick={handleView}
                      >
                        View
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
            {showComponent ? (
              <>
                <div
                  style={{
                    fontSize: 20,
                    marginTop: 30,
                  }}
                >
                  Penambahan
                </div>
                <Divider />
                <Row
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Col span={24}>
                    <Table
                      columns={columns}
                      loading={antLoading}
                      dataSource={changeValue.filter(
                        (el) => el.tipe === "Penambahan"
                      )}
                      pagination={false}
                    />
                  </Col>
                </Row>
                <div
                  style={{
                    fontSize: 20,
                    marginTop: 50,
                  }}
                >
                  Pengurangan
                </div>
                <Divider />
                <Row
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Col span={24}>
                    <Table
                      columns={columns}
                      loading={antLoading}
                      dataSource={changeValue.filter(
                        (el) => el.tipe === "Pengurangan"
                      )}
                      pagination={false}
                    />
                  </Col>
                </Row>
                <Row
                  justify="end"
                  style={{
                    marginTop: 30,
                  }}
                >
                  <Col>
                    <Link to={"/pages/position"}>
                      <Button>Kembali</Button>
                    </Link>
                  </Col>
                  <Col
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={handleSubmit}
                      loading={loadingButton}
                    >
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </>
            ) : null}
          </div>
        </Card>
      </Row>
    </>
  );
}
