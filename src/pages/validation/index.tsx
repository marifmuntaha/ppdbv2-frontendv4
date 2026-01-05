import React, {useEffect, useState} from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {Block, BlockBetween, BlockDes, BlockHead, BlockHeadContent, BlockTitle, Col, Row} from "@/components";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import type {StudentAddressType, StudentParentType, StudentPersonalType, StudentProgramType} from "@/types";
import {get as getPersonal} from "@/common/api/student/personal";
import {get as getParent} from "@/common/api/student/parent";
import {get as getProgram} from "@/common/api/student/program";
import {get as getAddress} from "@/common/api/student/address"
import moment from "moment/moment";
import {Card} from "reactstrap";
import {getGender} from "@/helpers";
import {GUARD_STATUS, PARENT_JOB_OPTIONS, PARENT_STATUS, PARENT_STUDY_OPTIONS} from "@/common/constants";

type ValidationType = {
    personal?: StudentPersonalType,
    parent? : StudentParentType,
    address? : StudentAddressType,
    program?: StudentProgramType
}
const Validation = () => {
    const {user} = useAuthContext();
    const [student, setStudent] = useState<ValidationType>()

    useEffect(() => {
        getPersonal({userId: user?.id}).then((resp) => {
            if (resp.length > 0) {
                setStudent(student => ({...student, personal: resp[0]}))
            }
        })
        getParent({userId: user?.id}).then((resp) => {
            if (resp.length > 0) {
                setStudent(student => ({...student, parent: resp[0]}))
            }
        })
        getAddress(({userId: user?.id})).then((resp) => {
            if (resp.length > 0) {
                setStudent(student => ({...student, address: resp[0]}))
            }
        })
        getProgram({userId: user?.id, with: ['institution', 'period', 'program', 'boarding']}).then((resp) => {
            if (resp.length > 0) {
                setStudent(student => ({...student, program: resp[0]}))
            }
        })
    }, []);
    useEffect(() => {
        console.log(student)
    }, [student]);
    return (
        <React.Fragment>
            <Head title="Validasi Pendaftaran"/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween className="g-3">
                        <BlockHeadContent>
                            <BlockTitle page>
                                Validasi / <strong className="text-primary small">{student?.personal?.name}</strong>
                            </BlockTitle>
                            <BlockDes className="text-soft">
                                <ul className="list-inline">
                                    <li>NIK: <span className="text-base">{student?.personal?.nik}</span></li>
                                    <li>
                                        Tanggal Pendaftaran:{" "}
                                        <span className="text-base">{moment(student?.program?.created_at).format('DD MMM YYYY')}</span>
                                    </li>
                                </ul>
                            </BlockDes>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Row className="gy-5">
                        <Col lg={6}>
                            <BlockHead>
                                <BlockHeadContent>
                                    <BlockTitle tag="h5">Informasi Pribadi</BlockTitle>
                                    <p>Informasi dasar pendaftar</p>
                                </BlockHeadContent>
                            </BlockHead>
                            <Card>
                                <ul className="data-list is-compact">
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nama Lengkap</div>
                                            <div className="data-value">{student?.personal?.name}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nomor Induk Kependudukan (NIK)</div>
                                            <div className="data-value">{student?.personal?.nik}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nomor Induk Siswa Nasional (NISN)</div>
                                            <div className="data-value">{student?.personal?.nisn}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Jenis Kelamin</div>
                                            <div className="data-value">{getGender(student?.personal?.gender)}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Tempat, Tanggal Lahir</div>
                                            <div className="data-value">{student?.personal?.birthPlace}, {moment(student?.personal?.birthDate).format('DD MMMM YYYY')}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nomor HP</div>
                                            <div className="data-value">{student?.personal?.phone}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Anak Ke-</div>
                                            <div className="data-value">{student?.personal?.birthNumber}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Jumlah Saudara</div>
                                            <div className="data-value">{student?.personal?.sibling}</div>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                            <BlockHead>
                                <BlockHeadContent>
                                    <BlockTitle tag="h5">Informasi Orangtua</BlockTitle>
                                    <p>Informasi Orangtua dan wali pendaftar</p>
                                </BlockHeadContent>
                            </BlockHead>
                            <Card>
                                <ul className="data-list is-compact">
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nomor Kartu Keluarga</div>
                                            <div className="data-value">{student?.parent?.numberKk}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nama Kepala Keluarga</div>
                                            <div className="data-value">{student?.parent?.headFamily}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Status Ayah Kandung</div>
                                            <div className="data-value">{PARENT_STATUS.find((item) => item.value === student?.parent?.fatherStatus)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nama Ayah Kandung</div>
                                            <div className="data-value">{student?.parent?.fatherName}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">NIK Ayah Kandung</div>
                                            <div className="data-value">{student?.parent?.fatherNik}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Tempat, Tanggal Lahir Ayah Kandung</div>
                                            <div className="data-value">{student?.parent?.fatherBirthPlace}, {moment(student?.parent?.fatherBirthDate).format('DD MMMM YYYY')}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Pendidikan Ayah Kandung</div>
                                            <div className="data-value">{PARENT_STUDY_OPTIONS.find((item) => item.value === student?.parent?.fatherStudy)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Pekerjaan Ayah Kandung</div>
                                            <div className="data-value">{PARENT_JOB_OPTIONS.find((item) => item.value === student?.parent?.fatherJob)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nomor HP Ayah Kandung</div>
                                            <div className="data-value">{student?.parent?.fatherPhone}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Status Ibu Kandung</div>
                                            <div className="data-value">{PARENT_STATUS.find((item) => item.value === student?.parent?.motherStatus)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nama Ibu Kandung</div>
                                            <div className="data-value">{student?.parent?.motherName}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">NIK Ibu Kandung</div>
                                            <div className="data-value">{student?.parent?.motherNik}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Tempat, Tanggal Lahir Ibu Kandung</div>
                                            <div className="data-value">{student?.parent?.motherBirthPlace}, {moment(student?.parent?.motherBirthDate).format('DD MMMM YYYY')}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Pendidikan Ibu Kandung</div>
                                            <div className="data-value">{PARENT_STUDY_OPTIONS.find((item) => item.value === student?.parent?.motherStudy)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Pekerjaan Ibu Kandung</div>
                                            <div className="data-value">{PARENT_JOB_OPTIONS.find((item) => item.value === student?.parent?.motherJob)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nomor HP Ibu Kandung</div>
                                            <div className="data-value">{student?.parent?.motherPhone}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Status Wali Siswa</div>
                                            <div className="data-value">{GUARD_STATUS.find((item) => item.value === student?.parent?.guardStatus)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nama Wali Siswa</div>
                                            <div className="data-value">{student?.parent?.guardName}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">NIK Wali Siswa</div>
                                            <div className="data-value">{student?.parent?.guardNik}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Tempat, Tanggal Lahir Wali Siswa</div>
                                            <div className="data-value">{student?.parent?.guardBirthPlace}, {moment(student?.parent?.guardBirthDate).format('DD MMMM YYYY')}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Pendidikan Wali Siswa</div>
                                            <div className="data-value">{PARENT_STUDY_OPTIONS.find((item) => item.value === student?.parent?.guardStudy)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Pekerjaan Wali Siswa</div>
                                            <div className="data-value">{PARENT_JOB_OPTIONS.find((item) => item.value === student?.parent?.guardJob)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Nomor HP Wali Siswa</div>
                                            <div className="data-value">{student?.parent?.guardPhone}</div>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                        <Col size={6}>
                            <BlockHead>
                                <BlockHeadContent>
                                    <BlockTitle tag="h5">Informasi Tempat Tinggal</BlockTitle>
                                    <p>Informasi Tempat Tinggal Pendaftar</p>
                                </BlockHeadContent>
                            </BlockHead>
                            <Card>
                                <ul className="data-list is-compact">
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Provinsi</div>
                                            <div className="data-value">{student?.address && JSON.parse(student.address?.province)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Kota/Kabupaten</div>
                                            <div className="data-value">{student?.address && JSON.parse(student.address?.city)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Kecamatan</div>
                                            <div className="data-value">{student?.address && JSON.parse(student.address?.district)?.label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Kelurahan/Desa</div>
                                            <div className="data-value">{student?.address && JSON.parse(student.address?.village).label}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Jalan/Gedung/Rumah</div>
                                            <div className="data-value">{student?.address?.street}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Kodepos</div>
                                            <div className="data-value">{student?.address?.postal}</div>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                            <BlockHead>
                                <BlockHeadContent>
                                    <BlockTitle tag="h5">Informasi Program Pilihan</BlockTitle>
                                    <p>Informasi Tempat Tinggal Pendaftar</p>
                                </BlockHeadContent>
                            </BlockHead>
                            <Card>
                                <ul className="data-list is-compact">
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Lembaga</div>
                                            <div className="data-value">{student?.program?.institution?.surname}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Gelombang</div>
                                            <div className="data-value">{student?.program?.period?.name}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Program Madrasah</div>
                                            <div className="data-value">{student?.program?.program?.name}</div>
                                        </div>
                                    </li>
                                    <li className="data-item">
                                        <div className="data-col">
                                            <div className="data-label">Program Boarding</div>
                                            <div className="data-value">{student?.program?.boarding?.name}</div>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                    </Row>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Validation;