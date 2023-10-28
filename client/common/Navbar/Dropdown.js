import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//Actions: 
import { signedInSwitch } from "../../store/homeSlice";

function Dropdown() {
    const {signedIn} = useSelector((state) => state.home);
    const [dropdown, setDropdown] = useState(true);

    if (dropdown) {
        if (signedIn) {
            return (
                <>
                    <ProfileSubmenu className="profile-subme" >
                            <SubmenuText>
                                <SubmenuLink to='/profile' className="profile" onClick={() => setDropdown(false)}>Edit Profile</SubmenuLink>
                                <br></br>
                                <SubmenuLink to='/logout' className="logout" onClick={() => setDropdown(false)}>Sign Out</SubmenuLink>
                            </SubmenuText>                           
                    </ProfileSubmenu> 
                </>
            );
        }
        else {
            return (
                <>
                    <ProfileSubmenu className="profile-subme" >
                            <SubmenuText>
                                Please sign in here: 
                                <SubmenuLink to='/login' className="sign-in" onClick={() => setDropdown(false)}> Sign In</SubmenuLink>
                            </SubmenuText>
                    </ProfileSubmenu> 
                </>
            );
        }
    }
    else {
        return;
    }
};

const ProfileSubmenu = styled.div`
width: 100px;
// max-height: 100px
position: absolute;
list-style: none;
text-align: start;

top: 56px;

`;

const SubmenuText = styled.p`
display: block;
min-height: 50px;
min-width: 150px;
text-position: none;

color: white;
background: #3c3c3c;
border-radius: 5px;
font-size: 1.2em;
padding: 7px;
`;

const SubmenuLink = styled(NavLink)`
text-position: none;

color: white;
background: #3c3c3c;
cursor: pointer;

// &:hover {
//     background: #787878
// }
`;

export default Dropdown;