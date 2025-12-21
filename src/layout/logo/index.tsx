import React from "react";
import { Link } from "react-router-dom";

import LogoLight2x from "../../images/logo2x.png";
import LogoDark2x from "../../images/logo-dark2x.png";
import LogoSmall from "../../images/logo-small.png";

const Logo: React.FC = () => {
    return (
        <Link to={`/`} className="logo-link">
            <img className="logo-light logo-img" src={LogoLight2x} alt="logo" />
            <img className="logo-dark logo-img" src={LogoDark2x} alt="logo" />
            <img className="logo-small logo-img logo-img-small" src={LogoSmall} alt="logo" />
        </Link>
    );
};

export default Logo;
