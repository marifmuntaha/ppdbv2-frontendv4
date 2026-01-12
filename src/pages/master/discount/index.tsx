import React, {useEffect, useState} from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard,
    ReactDataTable
} from "@/components";
import {useYearContext} from "@/common/hooks/useYearContext";
import Partial from "./partial";
import type {ColumnType, DiscountType} from "@/types";
import {get as getDiscount, destroy as destroyDiscount} from "@/common/api/master/discount";
import {useInstitutionContext} from "@/common/hooks/useInstitutionContext";
import {ButtonGroup, Spinner} from "reactstrap";
import {fetchUnit, formatIDR} from "@/helpers";

const Discount = () => {
    const year = useYearContext()
    const institution = useInstitutionContext()
    const [sm, updateSm] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState<boolean|string|number|undefined>(false)
    const [loadData, setLoadData] = useState(true)
    const [discounts, setDiscounts] = useState<DiscountType[]>([])
    const [discount, setDiscount] = useState<DiscountType>({
        id: undefined,
        name: '',
        description: '',
        price: '',
        unit: 0,
    })

    const Column: ColumnType<DiscountType>[] = [
        {
            name: "Item",
            selector: (row) => row.product?.name,
            sortable: false,
        },
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
        },
        {
            name: "Harga",
            selector: (row) => formatIDR(row.price),
            sortable: false,
        },
        {
            name: "Satuan",
            selector: (row) => row.unit,
            sortable: false,
            cell: (row) => fetchUnit(row.unit)
        },
        {
            name: "Aksi",
            selector: (row) => row?.id,
            sortable: false,
            width: "150px",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setDiscount(row);
                        setModal(true);
                    }}>
                        <Icon name="pen"/>
                    </Button>
                    <Button outline color="danger" onClick={async () => {
                        setLoading(row?.id);
                        await destroyDiscount(row?.id)
                            .then(() => setLoadData(true))
                            .finally(() => setLoading(false));
                    }}>
                        {loading === row.id ? <Spinner size="sm"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            ),
        },
    ];

    useEffect(() => {
        if (loadData) getDiscount<DiscountType>({yearId: year?.id, institutionId: institution?.id})
            .then((resp) => setDiscounts(resp))
            .finally(() => setLoadData(false));
    }, [loadData])

    return (
        <React.Fragment>
            <Head title="Item Pembayaran"/>
            <Content>
                <Block size="lg">
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">Item Potongan</BlockTitle>
                                <p>
                                    Item Potongan tahun ajaran {year?.name}
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
                                    <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                        <ul className="nk-block-tools g-3">
                                            <li>
                                                <Button color="primary" size="sm" outline className="btn-white"
                                                        onClick={() => setModal(true)}>
                                                    <Icon name="plus"/>
                                                    <span>TAMBAH</span>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                </Block>
                <PreviewCard>
                    <ReactDataTable data={discounts} columns={Column} pagination progressPending={loadData}/>
                </PreviewCard>
                <Partial modal={modal} setModal={setModal} discount={discount} setDiscount={setDiscount} setLoadData={setLoadData}/>
            </Content>
        </React.Fragment>
    )
}

export default Discount;