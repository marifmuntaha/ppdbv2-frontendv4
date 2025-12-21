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
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import {get as getActivity, destroy as destroyActivity} from "@/common/api/institution/activity";
import {useParams} from "react-router-dom";
import {useYearContext} from "@/common/hooks/useYearContext";

const Activity: React.FC = () => {
    const year = useYearContext()
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean|number|string|undefined>(false)
    const [loadData, setLoadData] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false);
    const [activities, setActivities] = useState<InstitutionActivityType[]>([])
    const [activity, setActivity] = useState<InstitutionActivityType>()
    const Column: ColumnType<InstitutionActivityType>[] = [
        {
            name: "Tahun Pelajaran",
            selector: (row) => row.year?.name,
            sortable: false,
        },
        {
            name: "Kapasitas",
            selector: (row) => row.capacity,
            sortable: false,
        },
        {
            name: "Brosur",
            selector: (row) => row.brochure,
            sortable: false,
            cell: (row) => (
                <Badge pill color={row.brochure === '1' ? 'success' : 'danger'}>
                    {row.brochure === '1' ? 'Ya' : 'Tidak'}
                </Badge>
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
        getActivity({yearId: year?.id, institutionId: id}).then((resp) => {
            if (resp) setActivities(resp)
        })
    }, [id, year]);

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
                    </BlockHeadContent>                    <BlockHeadContent>
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
        </React.Fragment>
    )
}

export default Activity