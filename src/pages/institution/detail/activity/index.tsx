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
import type {ColumnType, InstitutionActivityType} from "@/types";
import {ButtonGroup, Spinner} from "reactstrap";
import {get as getActivity, destroy as destroyActivity} from "@/common/api/institution/activity";
import {Link, useParams} from "react-router-dom";
import {useYearContext} from "@/common/hooks/useYearContext";
import Partial from "./partial";

const Activity: React.FC = () => {
    const year = useYearContext()
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean | number | string | undefined>(false)
    const [loadData, setLoadData] = useState<boolean>(true)
    const [modal, setModal] = useState<boolean>(false);
    const [activities, setActivities] = useState<InstitutionActivityType[]>([])
    const [activity, setActivity] = useState<InstitutionActivityType>({
        id: undefined,
        yearId: year?.id,
        institutionId: id,
        capacity: '',
        brochure: ''
    })
    const Column: ColumnType<InstitutionActivityType>[] = [
        {
            name: "Tahun Pelajaran",
            selector: (row) => row.year?.name,
            sortable: false,
        },
        {
            name: "Kapasitas",
            selector: (row) => row.capacity + ' Siswa',
            sortable: false,
        },
        {
            name: "Brosur",
            selector: (row) => row.brochure,
            sortable: false,
            cell: (row) => (
               <Link to={String(row.brochure)}>
                   <Button outline color="info" size="sm">
                       <Icon name="eye"/>
                   </Button>
               </Link>
            ),
        },
        {
            name: "Aksi",
            selector: (row) => row?.id,
            sortable: false,
            width: "150px",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setActivity(row);
                        setModal(true);
                    }}>
                        <Icon name="pen"/>
                    </Button>
                    <Button outline color="danger" onClick={async () => {
                        setLoading(row?.id);
                        await destroyActivity(row?.id)
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
        getActivity({list: 'table', institutionId: id}).then((resp) => {
            if (resp) setActivities(resp)
        }).finally(() => setLoadData(false))
    }, [id, year, loadData]);

    return (
        <React.Fragment>
            <BlockHead>
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">Aktifitas</BlockTitle>
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
                <ReactDataTable data={activities} columns={Column} pagination progressPending={loadData}/>
            </PreviewCard>
            <Partial modal={modal} setModal={setModal} activity={activity} setActivity={setActivity} setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default Activity