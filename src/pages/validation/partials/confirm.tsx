import React, {useEffect, useState} from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {Col, Icon, Row, RSelect} from "@/components";
import type {
    InstitutionType,
    OptionsType,
    StudentAchievementType,
    StudentAddressType, StudentFileType,
    StudentOriginType,
    StudentParentType,
    StudentPersonalType,
    StudentProgramType
} from "@/types";
import {show as showInstitution} from "@/common/api/institution"
import {Controller, useForm} from "react-hook-form";

type ValidationType = {
    personal?: StudentPersonalType,
    parent?: StudentParentType,
    address?: StudentAddressType,
    program?: StudentProgramType,
    origin?: StudentOriginType,
    achievements?: StudentAchievementType[],
    file?: StudentFileType
}

type ConfirmProps = {
    modal: boolean;
    setModal: (modal: boolean) => void;
    student: ValidationType | undefined
}

const Confirm = ({modal, setModal, student}: ConfirmProps) => {
    const {handleSubmit, register, control, formState: {errors}} = useForm()
    const [institution, setInstitution] = useState<InstitutionType>()
    const selectOption: OptionsType[] = [
        {value: '1', label: 'Ya'},
        {value: '2', label: 'Tidak'}
    ]
    const onSubmit = (values: any) => {
        console.log(values)
    }
    const toggle = () => {
        setModal(false);
    };

    useEffect(() => {
        const institutionId = student?.program?.institutionId !== undefined ? parseInt(student.program.institutionId) - 1 : null;
        if (institutionId !== null) showInstitution({id: institutionId}).then((resp) => {
            if (resp) {
                setInstitution(resp)
            }
        });
    }, [student])
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                SURVEI DATA PENDAFTAR
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="align-center g-3 mb-2">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah mempunyai saudara Kandung yang bersekolah di {student?.program?.institution?.surname}</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        name="active"
                                        rules={{required: "Status tidak boleh kosong"}}
                                        render={({field: {value, onChange}}) => (
                                            <React.Fragment>
                                                <RSelect
                                                    options={selectOption}
                                                    value={selectOption.find((item) => item.value === value)}
                                                    onChange={(selectedOption) => onChange(selectedOption)}
                                                    placeholder="Pilih Status"
                                                />
                                                <input type="hidden" id="active" className="form-control"/>
                                                {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </React.Fragment>
                                        )
                                        }/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-center g-3 mb-2">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Siapakah nama Saudara Kandung anda?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        id="description"
                                        placeholder="Ex. Tahun Pelajaran 2024/2025"
                                        {...register("description", {required: false})}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-center g-3 mb-2">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah anda alumni dari {institution?.surname}?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                        <div className="form-group">
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="active"
                                    rules={{required: "Status tahun tidak boleh kosong"}}
                                    render={({field}) => (
                                        <React.Fragment>
                                            <RSelect
                                                options={selectOption}
                                                value={field.value}
                                                onChange={(selectedOption) => field.onChange(selectedOption)}
                                                placeholder="Pilih Status"
                                            />
                                            <input type="hidden" id="active" className="form-control"/>
                                            {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                        </React.Fragment>
                                    )
                                    }/>
                            </div>
                        </div>
                        </Col>
                    </Row>
                    <Row className="align-center g-3 mb-2">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah anda putra/putri dari guru/karyawan Yayasan Darul Hikmah?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        name="active"
                                        rules={{required: "Status tahun tidak boleh kosong"}}
                                        render={({field}) => (
                                            <React.Fragment>
                                                <RSelect
                                                    options={selectOption}
                                                    value={field.value}
                                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                                    placeholder="Pilih Status"
                                                />
                                                <input type="hidden" id="active" className="form-control"/>
                                                {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </React.Fragment>
                                        )
                                        }/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-center g-3 mb-2">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah anda berdomisili di menganti?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        name="active"
                                        rules={{required: "Status tahun tidak boleh kosong"}}
                                        render={({field}) => (
                                            <React.Fragment>
                                                <RSelect
                                                    options={selectOption}
                                                    value={field.value}
                                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                                    placeholder="Pilih Status"
                                                />
                                                <input type="hidden" id="active" className="form-control"/>
                                                {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </React.Fragment>
                                        )
                                        }/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Confirm