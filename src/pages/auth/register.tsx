import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/images/logo2x.png";
import LogoDark from "@/images/logo-dark2x.png";
import Head from "@/layout/head";
import AuthFooter from "@/layout/footer/auth";
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button,
    Icon,
    PreviewCard,
} from "@/components";
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type {RegisterFormType} from "@/types";
import {register as registerUser} from "@/common/api/auth"

const Register = () => {
    const [passState, setPassState] = useState(false);
    const [confmState, setConfmState] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>();
    const navigate = useNavigate();
    const onSubmit = async (value: RegisterFormType) => {
        setLoading(true);
        await registerUser(value).then((resp) => {
            if(resp !== undefined) navigate('/auth/verifikasi')
        }).finally(() => setLoading(false));
    };
    return (
        <React.Fragment>
            <Head title="Register" />
            <Block className="nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                    <Link to={`/`} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                    </Link>
                </div>
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h4">Buat Akun</BlockTitle>
                            <BlockDes>
                                <p>Buat Akun Sistem PMB Yayasan Darul Hikmah</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Nama Lengkap</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', { required: 'Kolom ini wajib diisi' })}
                                    placeholder="Masukkan nama Anda"
                                    className="form-control-lg form-control" />
                                {errors.name && <p className="invalid">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="phone">Nomor WA</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="phone"
                                    {...register('phone', { required: 'Kolom ini wajib diisi' })}
                                    placeholder="Masukkan nomor Whatsapp"
                                    className="form-control-lg form-control" />
                                {errors.phone && <p className="invalid">{errors.phone.message}</p>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="email">Alamat Email</label>
                            </div>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="email"
                                    {...register('email', { required: 'Kolom ini wajib diisi' })}
                                    className="form-control-lg form-control"
                                    placeholder="Masukkan alamat email Anda" />
                                {errors.email && <p className="invalid">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="password">Kata Sandi</label>
                            </div>
                            <div className="form-control-wrap">
                                <a
                                    href={"#password"}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setPassState(!passState);
                                    }}
                                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                                >
                                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                                </a>
                                <input
                                    type={passState ? "text" : "password"}
                                    id="password"
                                    {...register('password', { required: "Kolom ini wajib diisi" })}
                                    placeholder="Masukkan kata sandi Anda"
                                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                                {errors.password && <span className="invalid">{errors.password.message}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="password_confirmation">Kata Sandi</label>
                            </div>
                            <div className="form-control-wrap">
                                <a
                                    href={"#password"}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setConfmState(!confmState);
                                    }}
                                    className={`form-icon lg form-icon-right passcode-switch ${confmState ? "is-hidden" : "is-shown"}`}
                                >
                                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                                </a>
                                <input
                                    type={confmState ? "text" : "password"}
                                    id="password_confirmation"
                                    {...register('password_confirmation', { required: "Kolom ini wajib diisi" })}
                                    placeholder="Masukkan kata sandi Anda"
                                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                                {errors.password_confirmation && <span className="invalid">{errors.password_confirmation.message}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary" size="lg" className="btn-block">
                                {loading ? <Spinner size="sm" color="light" /> : "Buat Akun"}
                            </Button>
                        </div>
                    </form>
                    <div className="form-note-s2 text-center pt-4">
                        {" "}
                        Sudah punya akun?{" "}
                        <Link to={`/auth/masuk`}>
                            <strong>Masuk saja</strong>
                        </Link>
                    </div>
                </PreviewCard>
            </Block>
            <AuthFooter />
        </React.Fragment>
    )
};
export default Register;
