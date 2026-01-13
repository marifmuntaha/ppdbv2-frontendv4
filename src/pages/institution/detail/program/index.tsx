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
import type {ColumnType, InstitutionProgramType, OptionsType} from "@/types";
import {Badge, ButtonGroup, Spinner} from "reactstrap";
import {get as getProgram, destroy as destroyProgram} from "@/common/api/institution/program";
import {useParams} from "react-router-dom";
import {useYearContext} from "@/common/hooks/useYearContext";
import Partial from "./partial";
import {getRandomColor} from "@/helpers";

const Program: React.FC = () => {
    const year = useYearContext()
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean | number | string | undefined>(false)
    const [loadData, setLoadData] = useState<boolean>(true)
    const [modal, setModal] = useState<boolean>(false);
    const [programs, setPrograms] = useState<InstitutionProgramType[]>([])
    const [program, setProgram] = useState<InstitutionProgramType>({
        id: undefined,
        yearId: year?.id,
        institutionId: id as unknown as number,
        name: '',
        alias: '',
        description: '',
        boarding: '',
    })
    const Column: ColumnType<InstitutionProgramType>[] = [
        {
            name: "Nama Program",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Singkatan",
            selector: (row) => row.alias,
            sortable: false,
        },
        {
            name: "Boarding",
            selector: (row) => row.boarding,
            sortable: false,
            cell: (row) => {
                const boarding: OptionsType[] = row?.boarding !== '' ? JSON.parse(row.boarding) : []
                return <div>
                    {boarding.map((item) => (
                        <Badge key={item.value} pill color={getRandomColor(item.value)} className="me-1">{item.label}</Badge>
                    ))}
                </div>
            }
        },
        {
            name: "Aksi",
            selector: (row) => row?.id,
            sortable: false,
            width: "150px",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="warning" onClick={() => {
                        setProgram(row);
                        setModal(true);
                    }}>
                        <Icon name="pen"/>
                    </Button>
                    <Button outline color="danger" onClick={async () => {
                        setLoading(row?.id);
                        await destroyProgram(row?.id)
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
        getProgram<InstitutionProgramType>({list: 'table', yearId: year?.id, institutionId: id}).then((resp) => {
            if (resp) setPrograms(resp)
        }).finally(() => setLoadData(false))
    }, [id, year, loadData]);

    return (
        <React.Fragment>
            <BlockHead>
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">Program Madrasah</BlockTitle>
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
                <ReactDataTable data={programs} columns={Column} pagination progressPending={loadData}/>
            </PreviewCard>
            <Partial modal={modal} setModal={setModal} program={program} setProgram={setProgram}
                     setLoadData={setLoadData}/>
        </React.Fragment>
    )
}

export default Program