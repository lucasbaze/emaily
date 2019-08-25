import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

const Header = props => {
    const renderContent = () => {
        switch (props.auth) {
            case null:
                return;
            case false:
                return (
                    <Menu.Item
                        name="login"
                        content="Login with Google"
                        href="/auth/google"
                    />
                );
            default:
                return [
                    <Menu.Item key="1">
                        <Payments />
                    </Menu.Item>,
                    <Menu.Item
                        key="3"
                        name="credits"
                        content={`Credits: ${props.auth.credits}`}
                    />,
                    <Menu.Item
                        key="2"
                        name="logout"
                        content="Logout"
                        href="/api/logout"
                    />,
                ];
        }
    };

    return (
        <Menu size="huge">
            <Menu.Item>
                <Link to={props.auth ? '/surveys' : '/'}>Emaily</Link>
            </Menu.Item>

            <Menu.Menu position="right">{renderContent()}</Menu.Menu>
        </Menu>
    );
};

function mapStateToProps({ auth }) {
    return { auth: auth };
}

export default connect(mapStateToProps)(Header);
