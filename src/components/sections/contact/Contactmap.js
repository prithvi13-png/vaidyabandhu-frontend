import React, { Component } from 'react';

class Contactmap extends Component {
    render() {
        return (
            <div className="sigma_contact-map">
                <iframe
                    title="Vaidya Bandhu Location"
                    src="https://www.google.com/maps?q=No.+93,+3rd+Floor,+1st+Cross,+Wilson+Garden+Housing+Society,+Kothnur+Main+Road,+J.P.+Nagar+7th+Phase,+Bangalore+-+560078,+Karnataka,+India&output=embed"
                    height={600}
                    style={{ border: 0, width: '100%' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        );
    }
}

export default Contactmap;
