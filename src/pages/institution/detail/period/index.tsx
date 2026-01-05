import {
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard,
    ReactDataTable
} from "@/components";
import React, {useEffect, useState} from "react";
import type {ColumnType, InstitutionPeriodType} from "@/types";
import {ButtonGroup, Spinner} from "reactstrap";
import {get as getPeriod, destroy as destroyPeriod} from "@/common/api/institution/period";
import {useParams} from "react-router-dom";
import {useYearContext} from "@/common/hooks/useYearContext";
import Partial from "./partial";
import moment from "moment/moment";
import "moment/locale/id"

const Program: React.FC = () => {
    const year = useYearContext()
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean | number | string | undefined>(false)
    const [loadData, setLoadData] = useState<boolean>(true)
    const [modal, setModal] = useState<boolean>(false);
    const [periods, setPeriods] = useState<InstitutionPeriodType[]>([])
    const [period, setPeriod] = useState<InstitutionPeriodType>({
        id: undefined,
        yearId: year?.id,
        institutionId: id,
        name: '',
        description: '',
        start: '',
        end: '',
    })
    const Column: ColumnType<InstitutionPeriodType>[] = [
        {
            name: "Nama Program",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
        },
        {
            name: "Mulai",
            selector: (row) => moment(row?.start).locale('id').format('DD MMMM YYYY'),
            sortable: false,
        },
        {
            name: "Selesai",
            selector: (row) => moment(row?.end).locale('id').format('DD MMMM YYYY'),
            sortable: false,
        },
        {
            name: "Aksi",
            selector: (row) => row?.id,
            sortable: false,
            width: "150px",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setPeriod(row);
                        setModal(true);
                    }}>
                        <Icon name="pen"/>
                    </Button>
                    <Button outline color="danger" onClick={async () => {
                        setLoading(row?.id);
                        await destroyPeriod(row?.id)
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
        getPeriod({list: 'table', yearId: year?.id, institutionId: id}).then((resp) => {
            if (resp) setPeriods(resp)
        }).finally(() => setLoadData(false))
    }, [id, year, loadData]);

    return (
        <React.Fragment>
            <BlockHead>
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">Periode Pendaftaran</BlockTitle>
                        <p>
                            Textual form controls—like <code className="code-tag">&lt;input&gt;</code>s,{" "}
                            <code className="code-tag">&lt;select&gt;</code>s, and{" "}
                        </p>
                    </BlockHeadContent>
                    <BlockHeadContent>
                        <div className="toggle-wrap nk-block-tools-toggle">
                            <div className="toggle-expand-content" style={{display: "none"}}>
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
            <PreviewCard>
                <ReactDataTable data={periods} columns={Column} pagination progressPending={loadData}/>
            </PreviewCard>
            <Partial modal={modal} setModal={setModal} period={period} setPeriod={setPeriod} setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default Program