import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {Icon, RSelect} from "@/components";
import {store as storeProgram, update as updateProgram} from "@/common/api/institution/program";
import {get as getBoarding} from "@/common/api/master/boarding";
import type {InstitutionProgramFormType, InstitutionProgramType, OptionsType} from "@/types";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useParams} from "react-router-dom";

interface PartialProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    program: InstitutionProgramType
    setProgram: (program: InstitutionProgramType) => void;
    setLoadData: (loadData: boolean) => void;
}

const Partial = ({modal, setModal, program, setProgram, setLoadData}: PartialProps) => {
    const [loading, setLoading] = useState(false);
    const [boardingOptions, setBoardingOptions] = useState<OptionsType[]>()
    const year = useYearContext()
    const {id} = useParams();
    const {
        control,
        reset,
        handleSubmit,
        register,
        formState: {errors},
        setValue
    } = useForm<InstitutionProgramFormType>();

    const onSubmit = (value: InstitutionProgramFormType) => {
        const formData: InstitutionProgramType = {
            id: value.id,
            yearId: year?.id,
            institutionId: id,
            name: value.name,
            alias: value.alias,
            description: value.description,
            boarding: JSON.stringify(value.boarding),
        }
        if (program.id === undefined) onStore(formData)
        else onUpdate(formData);
    }
    const onStore = async (formData: InstitutionProgramType) => {
        setLoading(true);
        await storeProgram(formData).then((resp) => {
            if (resp) {
                toggle()
                setLoadData(true)
            } else {
                return
            }
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (formData: InstitutionProgramType) => {
        setLoading(true)
        await updateProgram(formData).then((resp) => {
            if (resp) {
                toggle()
                setLoadData(true)
            } else {
                return
            }
        }).finally(() => setLoading(false));
    }
    const handleReset = () => {
        setProgram({
            id: undefined,
            yearId: undefined,
            institutionId: undefined,
            name: '',
            alias: '',
            description: '',
            boarding: ''
        });
        reset();
    }
    const toggle = () => {
        setModal(false);
        handleReset();
    };
    useEffect(() => {
        setValue('id', program.id);
        setValue('yearId', program.yearId);
        setValue('institutionId', program.institutionId);
        setValue('name', program.name);
        setValue('alias', program.alias);
        setValue('description', program.description);
        setValue('boarding', program?.boarding !== '' ? JSON.parse(program.boarding) : []);
    }, [program, setValue]);

    useEffect(() => {
        getBoarding<OptionsType>({type: 'select'}).then((resp) => {
            if (resp) setBoardingOptions(resp)
        })
    }, []);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {program.id === undefined ? 'TAMBAH' : 'UBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Program</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Unggulan Tahfidz"
                                {...register("name", {required: 'Kolom tidak boleh kosong'})}
                            />
                            {errors.name && <span className="invalid">{errors.name.message}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="alias">Alias</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="alias"
                                placeholder="Ex. TFZ"
                                {...register("alias", {required: 'Kolom tidak boleh kosong'})}
                            />
                            {errors.alias && <span className="invalid">{errors.alias.message}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Diskripsi</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Ex. Program Unggulan Tahfidz"
                                {...register("description", {required: false})}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="boarding">Pilih Boarding</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                name="boarding"
                                rules={{required: "Boarding tidak boleh kosong"}}
                                render={({field}) => (
                                    <React.Fragment>
                                        <RSelect
                                            options={boardingOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                            placeholder="Pilih Boarding"
                                            isMulti
                                        />
                                        <input type="hidden" id="boarding" className="form-control"/>
                                        {errors.boarding && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </React.Fragment>
                                )
                                }/>
                        </div>
                    </div>
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

export default Partial;
