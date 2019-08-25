import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Payments = props => {
    return (
        <Button compact color="red">
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 survey credits"
                amount={500}
                token={token => props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            >
                Add Credits
            </StripeCheckout>
        </Button>
    );
};

export default connect(
    null,
    actions
)(Payments);
