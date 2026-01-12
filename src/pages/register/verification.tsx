import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Icon, Row, RSelect} from "@/components";
import {Controller, useForm, useWatch} from "react-hook-form";
import React, {useEffect, useState} from "react";
import type {
    InstitutionType,
    OptionsType,
    StudentProgramType,
    StudentVerificationFormType,
    StudentVerificationType
} from "@/types";
import {get as getProgram} from "@/common/api/student/program";
import {get as getInstitution} from "@/common/api/institution";
import {useAuthContext} from "@/common/hooks/useAuthContext";

type VerificationPropsType = {
    modal: boolean
    setModal: (modal: boolean) => void
}
const Verification = ({modal, setModal}: VerificationPropsType) => {
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [institution, setInstitution] = useState<InstitutionType>()
    const [institutionBefore, setInstitutionBefore] = useState<InstitutionType>()
    const [institutionOptions, setInstitutionOptions] = useState<OptionsType[]>()
    const statusOptions: OptionsType[] = [
        {value: 1, label: 'Ya'},
        {value: 2, label: 'Tidak'},
    ]
    const toggle = () => {
        setModal(false)
    }
    const onSubmit = (values: StudentVerificationFormType) => {
        const formData: StudentVerificationType = {
            ...values,
            userId: user?.id,
            twins: values.twins.value,
            graduate: values.graduate.value,
            student: values.student.value,
            teacherSon: values.teacherSon.value,
            sibling: values.sibling.value,
            siblingInstitution: values.siblingInstitution?.value
        }
        console.log(formData)
    }
    const {handleSubmit, register, formState: {errors}, control} = useForm<StudentVerificationFormType>();

    const twinsSelected = useWatch({control, name: 'twins'})
    const siblingSelected: OptionsType = useWatch({control, name: 'sibling'})
    const siblingRules = siblingSelected?.value === 1 ? {required: 'Kolom tidak boleh kosong'} : {required: false}

    useEffect(() => {
        getInstitution<InstitutionType>().then((respInstitutions) => {
            getProgram({userId: user?.id}).then((respProgram) => {
                if (respProgram.length > 0) {
                    const result: StudentProgramType = respProgram[0]
                    const idBefore = result.institutionId ? result.institutionId - 1 : null
                    setInstitution(respInstitutions.find((item) => item.id === result.institutionId))
                    setInstitutionBefore(respInstitutions.find((item) => item.id === idBefore))
                }
            })
            if (respInstitutions.length > 0) {
                const institutionOptions: OptionsType[] = respInstitutions.map((item) : OptionsType => {
                    return {value: item.id ? item.id : 0, label: item.surname}
                })
                setInstitutionOptions(institutionOptions)
            }
        })
    }, []);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                Verifikasi Pendaftaran
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="g-3 align-center mb-2">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah anda mempunyai kembaran yang bersekolah di {institution?.surname}?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        name="twins"
                                        rules={{required: "Kolom tidak boleh kosong"}}
                                        render={({field: {value, onChange}}) => (
                                            <React.Fragment>
                                                <RSelect
                                                    options={statusOptions}
                                                    value={value}
                                                    onChange={(val) => onChange(val)}
                                                    placeholder="Pilih Status"
                                                />
                                                <input type="hidden" id="twins" className="form-control"/>
                                                {errors.twins && <span className="invalid">{errors.twins.message}</span>}
                                            </React.Fragment>
                                        )
                                        }/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {twinsSelected?.value === 1 && (
                        <Row className="g-3 align-center mb-2">
                            <Col lg={6}>
                                <div className="form-group">
                                    <span className="form-note">Siapakah Nama Kembaran Anda?</span>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="twinsName"
                                            placeholder="Ex. Muhammad Arif Muntaha"
                                            {...register("twinsName", {required: true})}
                                        />
                                        {errors.twinsName && <span className="invalid">Kolom tidak boleh kosong</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                    <Row className="g-3 align-center mb-1">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah anda alumni dari {institutionBefore?.surname}?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        name="graduate"
                                        rules={{required: "Kolom tidak boleh kosong"}}
                                        render={({field: {value, onChange}}) => (
                                            <React.Fragment>
                                                <RSelect
                                                    options={statusOptions}
                                                    value={value}
                                                    onChange={(selectedOption) => onChange(selectedOption)}
                                                    placeholder="Pilih Status"
                                                />
                                                <input type="hidden" id="graduate" className="form-control"/>
                                                {errors.graduate && <span className="invalid">{errors.graduate.message}</span>}
                                            </React.Fragment>
                                        )
                                        }/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-3 align-center mb-1">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah anda Santri Dari Ponpes Darul Hikmah Menganti?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        name="student"
                                        rules={{required: "Kolom tidak boleh kosong"}}
                                        render={({field: {value, onChange}}) => (
                                            <React.Fragment>
                                                <RSelect
                                                    options={statusOptions}
                                                    value={value}
                                                    onChange={(selectedOption) => onChange(selectedOption)}
                                                    placeholder="Pilih Status"
                                                />
                                                <input type="hidden" id="student" className="form-control"/>
                                                {errors.student && <span className="invalid">{errors.student.message}</span>}
                                            </React.Fragment>
                                        )
                                        }/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-3 align-center mb-1">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah anda putra/putri dari Guru/Karyawan Yayasan Darul Hikmah Menganti?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        name="teacherSon"
                                        rules={{required: "Kolom tidak boleh kosong"}}
                                        render={({field: {value, onChange}}) => (
                                            <React.Fragment>
                                                <RSelect
                                                    options={statusOptions}
                                                    value={value}
                                                    onChange={(selectedOption) => onChange(selectedOption)}
                                                    placeholder="Pilih Status"
                                                />
                                                <input type="hidden" id="teacherSon" className="form-control"/>
                                                {errors.teacherSon && <span className="invalid">{errors.teacherSon.message}</span>}
                                            </React.Fragment>
                                        )
                                        }/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-3 align-center mb-1">
                        <Col lg={8}>
                            <div className="form-group">
                                <span className="form-note">Apakah anda mempunyai saudara yang mondok di PONPES Darul Hikmah?</span>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        name="sibling"
                                        rules={{required: "Kolom tidak boleh kosong"}}
                                        render={({field}) => (
                                            <React.Fragment>
                                                <RSelect
                                                    options={statusOptions}
                                                    value={field.value}
                                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                                    placeholder="Pilih Status"
                                                />
                                                <input type="hidden" id="sibling" className="form-control"/>
                                                {errors.sibling && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </React.Fragment>
                                        )
                                        }/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {siblingSelected?.value === 1 && (
                        <React.Fragment>
                            <Row className="g-3 align-center mb-1">
                                <Col lg={6}>
                                    <div className="form-group">
                                        <span className="form-note">Jenjang apakah saudara kandung anda?</span>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <Controller
                                                control={control}
                                                name="siblingInstitution"
                                                rules={siblingRules}
                                                render={({field: {value, onChange}}) => (
                                                    <React.Fragment>
                                                        <RSelect
                                                            options={institutionOptions}
                                                            value={value}
                                                            onChange={(val) => onChange(val)}
                                                            placeholder="Pilih Lembaga"
                                                        />
                                                        <input type="hidden" id="sibling" className="form-control"/>
                                                        {errors.siblingInstitution && <span className="invalid">{errors.siblingInstitution.message}</span>}
                                                    </React.Fragment>
                                                )
                                                }/>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="g-3 align-center mb-1">
                                <Col lg={6}>
                                    <div className="form-group">
                                        <span className="form-note">Siapakah nama saudara kandung anda?</span>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="siblingName"
                                                placeholder="Ex. Muhammad Arif Muntaha"
                                                {...register("siblingName", siblingRules)}
                                            />
                                            {errors.siblingName && <span className="invalid">{errors.siblingName.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                    )}
                    <div className="form-group">
                        <Button color="primary" type="submit" size="md">
                            {loading ? <Spinner size="sm"/> : 'SIMPAN'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Verification;