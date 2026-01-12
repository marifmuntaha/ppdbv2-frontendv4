import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {Icon, Row, RSelect} from "@/components";
import {store as storeUser, update as updateUser} from "@/common/api/user";
import {get as getInstitution} from "@/common/api/institution";
import type {OptionsType, UserType} from "@/types";
import {ROLE_OPTIONS} from "@/common/constants";

interface PartialProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    user: UserType
    setUser: (user: UserType) => void;
    setLoadData: (loadData: boolean) => void;
}

const Partial = ({modal, setModal, user, setUser, setLoadData}: PartialProps) => {
    const [loading, setLoading] = useState(false);
    const [institutionOptions, setInstitutionOptions] = useState<OptionsType[]>()
    const {
        control,
        reset,
        handleSubmit,
        register,
        formState: {errors},
        setValue
    } = useForm<UserType>();

    const onSubmit = (formData: UserType) => {
        if (user.id === undefined) onStore(formData)
        else onUpdate(formData);
    }
    const onStore = async (formData: UserType) => {
        setLoading(true);
        await storeUser(formData).then((resp) => {
            if (resp) {
                toggle()
                setLoadData(true)
            }
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (formData: UserType) => {
        setLoading(true)
        await updateUser(formData).then(() => {
            toggle()
            setLoadData(true)
        }).finally(() => setLoading(false));
    }
    const handleReset = () => {
        setUser({
            id: undefined,
            institutionId: undefined,
            name: '',
            email: '',
            role: 0,
            phone: '',
            phone_verified_at: undefined
        });
        reset();
    }
    const toggle = () => {
        setModal(false);
        handleReset();
    };
    useEffect(() => {
        setValue('id', user.id);
        setValue('institutionId', user.institutionId)
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('phone', user.phone);
        setValue('role', user.role);
    }, [user, setValue]);

    useEffect(() => {
        getInstitution<OptionsType>({type: 'select'}).then((resp) => {
            if (resp.length > 0) {
                setInstitutionOptions(resp);
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
                {user.id === undefined ? 'TAMBAH' : 'UBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="gy-0">
                    <div className="form-group">
                        <label className="form-label" htmlFor="institutionId">Lembaga</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                name="institutionId"
                                rules={{required: "Lembaga tidak boleh kosong."}}
                                render={({field: {value, onChange}}) => (
                                    <React.Fragment>
                                        <RSelect
                                            options={institutionOptions}
                                            value={institutionOptions?.find((item) => item.value === value)}
                                            onChange={(val) => onChange(val?.value)}
                                            placeholder="Pilih Lembaga"
                                        />
                                        <input type="hidden" id="institutionId" className="form-control"/>
                                        {errors.institutionId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </React.Fragment>
                                )
                                }/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Pengguna</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Muhammad Arif Muntaha"
                                {...register("name", {required: true})}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Alamat Email</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Ex. marifmuntaha@gmail.com"
                                {...register("email", {required: true})}
                            />
                            {errors.email && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label" htmlFor="password">Kata Sandi</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                placeholder="Ex. *************"
                                {...register("password", {required: user.id === undefined})}
                            />
                            {errors.password && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label" htmlFor="password_confirmation">Ulangi Sandi</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="password_confirmation"
                                placeholder="Ex. *************"
                                {...register("password_confirmation", {required: user.id === undefined})}
                            />
                            {errors.password_confirmation && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="phone">No. Telepon</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="082229366506"
                                    {...register("phone", {required: true})}
                                />
                                {errors.password && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    <div className="form-group col-md-6">
                        <label className="form-label" htmlFor="role">Hak Akses</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                name="role"
                                rules={{required: "Pilih Hak Akses"}}
                                render={({field: {value, onChange}}) => (
                                    <React.Fragment>
                                        <RSelect
                                            options={ROLE_OPTIONS}
                                            value={ROLE_OPTIONS.find((item) => item.value === value)}
                                            onChange={(val) => onChange(val?.value)}
                                            placeholder="Pilih Hak Akses"
                                        />
                                        <input type="hidden" id="role" className="form-control"/>
                                        {errors.role && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Partial;
