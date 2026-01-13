import React, {useState} from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon, PreviewCard, ReactDataTable,
} from "@/components";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useInstitutionContext} from "@/common/hooks/useInstitutionContext";
import type {ColumnType, ModalInvoiceType, OptionsType, ProductType, StudentInvoiceType} from "@/types";
import {Badge, ButtonGroup} from "reactstrap";
import {numberFormat} from "@/helpers";
import Generate from "./generate";
import {get as getProduct} from "@/common/api/master/product";

const Invoice = () => {
    const year = useYearContext()
    const institution = useInstitutionContext()
    const [sm, updateSm] = useState(false)
    const [loadData, setLoadData] = useState(false)
    const [modal, setModal] = useState<ModalInvoiceType>({
        generate: false,
        edit: false,
        show: false,
    })
    const [invoices, setInvoices] = useState<StudentInvoiceType[]>([
        {
            userId: 2,
            name: 'Muhammad Wishakawardhana',
            guardName: "Muhammad Arif Muntaha",
            address: 'Menganti',
            invoice: undefined
        },
        {
            userId: 1,
            name: 'Achmad Wikramawardhana',
            guardName: "Muhammad Arif Muntaha",
            address: 'Menganti',
            invoice: {
                reference: 'INV-MTS0001',
                product: 'string',
                amount: '3800000',
                dueDate: '2026-01-14 09:42:00',
                status: 'UNPAID'
            }
        },
    ])
    const [invoiceProduct, setInvoiceProduct] = useState([])
    const Column: ColumnType<StudentInvoiceType>[] = [
        {
            name: "Nomor",
            selector: (row) => row?.invoice?.reference,
            sortable: false,
        },
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Wali",
            selector: (row) => row.guardName,
            sortable: false,
        },
        {
            name: "Alamat",
            selector: (row) => row.address,
            sortable: false,
        },
        {
            name: "Amount",
            selector: (row) => row.invoice?.amount && numberFormat(row.invoice.amount),
            sortable: false,
        },
        {
            name: "Status",
            selector: (row) => row.invoice?.status,
            sortable: false,
        },
        {
            name: "Aksi",
            selector: (row) => row?.userId,
            sortable: false,
            width: "150px",
            cell: (row) => (
                <ButtonGroup size="sm">
                    {row.invoice ? (
                        <Button outline color="warning" onClick={() => {
                            alert('testing')
                        }}>
                            <Icon name="pen"/>
                        </Button>
                    ) : (
                        <Button outline color="danger" onClick={() => {
                            handleGenerate(row.userId)
                        }}>
                            <Icon name="reload"/>
                        </Button>
                    )}
                    <Button outline color="info" onClick={() => {
                        alert('testing')
                    }}>
                        <Icon name="eye"/>
                    </Button>
                </ButtonGroup>
            ),
        },
    ];
    const handleGenerate = (userId: number|undefined) => {
        getProduct<ProductType>({yearId: year?.id, institutionId: institution?.id, gender: '0'})
            .then((resp) => {
            console.log(resp);
        });
    }
    return (
        <React.Fragment>
            <Head title="Data Tagihan"/>
            <Content>
                <Block size="lg">
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">Data Tagihan</BlockTitle>
                                <p>
                                    Data Tagihan Pendaftaran {institution?.surname} Tahun Ajaran {year?.name}
                                </p>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <Button
                                        className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                        onClick={() => updateSm(!sm)}
                                    >
                                        <Icon name="menu-alt-r"/>
                                    </Button>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <PreviewCard>
                        <ReactDataTable data={invoices} columns={Column} pagination progressPending={loadData}/>
                    </PreviewCard>
                </Block>
                <Generate modal={modal} setModal={setModal}/>
            </Content>
        </React.Fragment>
    )
}

export default Invoice